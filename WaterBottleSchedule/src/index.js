import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2017, 2, 1),
    'end': new Date(2017, 2, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 3, 7),
    'end': new Date(2017, 3, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2017, 3, 9, 0, 0, 0),
    'end': new Date(2017, 3, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2017, 3, 11),
    'end': new Date(2017, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2017, 3, 12, 10, 30, 0, 0),
    'end': new Date(2017, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2017, 3, 12, 12, 0, 0, 0),
    'end': new Date(2017, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2017, 3, 12,14, 0, 0, 0),
    'end': new Date(2017, 3, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2017, 3, 12, 17, 0, 0, 0),
    'end': new Date(2017, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2017, 3, 12, 20, 0, 0, 0),
    'end': new Date(2017, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2017, 3, 13, 7, 0, 0),
    'end': new Date(2017, 3, 13, 10, 30, 0)
  }
]

let Basic = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={myEventsList}
        defaultDate={new Date(2017, 3, 1)}
      />
    )
  }
})


const MyCalendar = props => (
  <div>
    <BigCalendar
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
      view='week'
      views={['week']}
    />
  </div>
);

ReactDOM.render(
<Basic />,
  document.getElementById('root')
);
