
import {disableFormElement, validateRoomsAndGuests} from './utils.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

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

const adForm = document.querySelector('.ad-form');

// Валидация поля ввода заголовка объявления

  const titleInput = document.querySelector('#title');

  titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    }
    else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
    }
    else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Это обязательное поле');
    }
    else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', () => {
    const titleValueLength = titleInput.value.length;
    if (titleValueLength < TITLE_MIN_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${  TITLE_MIN_LENGTH - titleValueLength } симв.`);
    }
    else if (titleValueLength > TITLE_MAX_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${  titleValueLength - TITLE_MAX_LENGTH } симв.`);
    }
    else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  // Валидация поля ввода цены

  const priceInput = document.querySelector('#price');

  priceInput.addEventListener('invalid', () => {
    if (priceInput.validity.tooLong) {
      priceInput.setCustomValidity('Цена не должна превышать 1000000');
    }
    else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Это обязательное поле');
    }
    else {
      priceInput.setCustomValidity('');
    }
  });

  // Валидация полей ввода количества комнат и количества гостей

  const roomNumberInput = document.querySelector('#room_number');
  const capacityInput = document.querySelector('#capacity');

  roomNumberInput.addEventListener('change', () => {
    validateRoomsAndGuests(adForm, roomNumberInput, capacityInput);
  });

  capacityInput.addEventListener('change', () => {
    validateRoomsAndGuests(adForm, roomNumberInput, capacityInput);
  });
