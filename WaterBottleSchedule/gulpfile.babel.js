// Dependencies =================================
    import gulp from 'gulp';
    import sourcemaps from 'gulp-sourcemaps';
    import gutil from 'gulp-util';
    import connect from 'gulp-connect';

    //== css
    import concatCss from 'gulp-concat-css';

    //== JS
    import browserify from 'browserify';
    import watchify from 'watchify';
    import babelify from 'babelify';
    import uglify from 'gulp-uglify';
    import eslint from 'gulp-eslint';
    import source from 'vinyl-source-stream';
    import buffer from 'vinyl-buffer';
    import glob from 'glob';
    import path from 'path';
    import notify from'gulp-notify';
    import prettyTime from 'pretty-hrtime';

// Setting internals ============================
    const internals = {
        isWatchify: false,
        deps: [] // Here would go global modules. E.G.: ['react', 'react-dom']
    };
    internals.static = __dirname;
    internals.src = internals.static + '/src';

// css Task ================================
    gulp.task('css', function () {
      return gulp.src(internals.src + '/css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('dist/'));
    });

// JS Tasks =====================================
    //== Create each bundle
    const createBundle = (options, callback) => {

        options = Object.assign({ min: true }, options);
        let min = true;
        const opts = Object.assign({}, watchify.args, {
            entries: options.entries,
            debug: true
        });

        let b = browserify(opts);
        b.transform(babelify.configure({
            compact: false
        }));

        if (path.basename(options.entries) === 'index.js') {
            min = false;
            b.require(internals.deps)
        } else {
            b.external(internals.deps);
        }

        const rebundle = () => {

            return b.bundle()
                // log errors if they happen
                .on('error', (e) => {
                    console.log(e);
                    gulp.src('').pipe(notify({
                        title: "SYNTAX ERROR",
                        message: e.filename,
                        sound: 'Funk',
                        icon: path.join(__dirname, '/public/error.png')
                    }));
                })
                .pipe(source(options.output))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(sourcemaps.write('./maps'))
                .pipe(gulp.dest(options.destination))
                .pipe(connect.reload());
        };

        if (internals.isWatchify) {
            b = watchify(b);
            b.on('update', (id) => {

                lint(callback, id);
                rebundle();
            });
            b.on('log', gutil.log);
        }

        return rebundle();
    };

    //== Lint JavaScript
    const lint = (callback, src) => {

        return gulp
            .src(src)
            .pipe(eslint({ useEslintrc: true }))
            .pipe(eslint.format());
    };

    //== Gulp JS task
    gulp.task('scripts', (callback) => {

        const mainFiles = [`${internals.src}/components/index.js`];
        // const configFiles =  [`${internals.src}/config/*.js`]
        glob(`${internals.src}/components/*.js`, (err, files) => {

            if (err) {
                done(err);
            }

            files = [...files, ...mainFiles];
            const tasks = files.map(function (entry, index) {
                entry = path.normalize(entry);
                const origin = path.normalize(`${ internals.src }/components`);
                const dest = path.normalize(`${ internals.static }/dist`);
                const destMapping = entry.replace(origin, dest);
                const destination = path.dirname(destMapping);

                createBundle({
                    entries: entry,
                    output: path.basename(entry),
                    destination: destination
                });
            });
        });
        return callback();
    });


    //== Gulp Connect::Server task
    gulp.task('connect', () => {
        
        connect.server({
        port: 4000,
        root: './',
        livereload: true
      });
    });

    gulp.on('task_stop', (e) => {
        let time = prettyTime(e.hrDuration);
        gulp.src('').pipe(notify({
            title: "Finished: "+ e.task.toUpperCase(),
            message: "after " + time
        }));
    });


// Watch Tasks ==================================
    gulp.task('watch', () => {

        internals.isWatchify = true;
        gulp.watch(internals.src + '/css/**/*.css',['css']);
    });

// Main Tasks ===================================
    gulp.task('default', ['connect', 'css','scripts', 'watch']);