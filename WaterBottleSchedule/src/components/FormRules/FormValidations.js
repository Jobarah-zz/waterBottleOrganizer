//@flow
//
// Validations Rules for forms
// - `true` means it pass the rule
// ==============================================

// Deps =========================================
import React from 'react';
import valid from 'card-validator';

// Local scope ==================================
//== Regular Expresions
const regex = {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    numeric: /^[-+]?(?:\d*[.])?\d+$/,
    alpha: /^[A-Za-z]+$/i,
    alphaNumeric: /^[0-9A-Z]+$/i,
    name: /^[a-z\u00C0-\u02AB'´`]+\.?\s?([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i
};

// Internals ====================================
const internals = {
    required: {
        rule: (value: string) => value.toString().trim(),
        hint: () => (<span className="form-error is-visible">Required field.</span>)
    },
    email: {
        rule: (value: string) => regex.email.test(value),
        hint: (value: string) => (<span className="form-error is-visible"><b>{value}</b> isnt an Email.</span>)
    },
    ccNumber: {
        rule: (value: string) => valid.number(value).isValid,
        hint: () => (<span className="form-error is-visible">Please provide a valid card number.</span>)
    },
    ccExp: {
        rule: (value: string) => valid.expirationDate(value).isValid,
        hint: () => (<span className="form-error is-visible">Invalid <b>Date</b>.</span>)
    },
    name: {
        rule: (value: string) => regex.name.test(value),
        hint: () => (<span className="form-error is-visible">Please provide a valid name.</span>)
    },
    cvc: {
        rule: (value: string, components: Object) => {

            const numValidation = valid.number(components.ccNumber.state.value);
            const trimVal = value.replace(/\D/g, '');
            let size = 3;

            if (numValidation.card) {
                size = numValidation.card.code.size;
            }

            return trimVal.length === size;
        },
        hint: (value: string, components: Object) => {

            const numValidation = valid.number(components.ccNumber.state.value);
            let messageJSX = (<small className="form-error is-visible small">Invalid <b>CVC</b> code.</small>);

            if (numValidation.card) {
                messageJSX = (<small className="form-error is-visible small"><b>{ numValidation.card.code.name }</b> code should be { numValidation.card.code.size } numbers.</small>);
            }

            return messageJSX;
        }
    }
};

// Export Validations ===========================
export default internals;
