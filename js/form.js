
import {disableFormElement} from './utils.js';

const disableForms = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  disableFormElement('input', adForm);
  disableFormElement('select', adForm);
  disableFormElement('textarea', adForm);
  disableFormElement('button', adForm);
};

disableForms();

const enableForms = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const disabledElements = adForm.querySelectorAll('[disabled]');
  for (const disabledElement of disabledElements) {
    disabledElement.removeAttribute('disabled');
  }
};

enableForms();
