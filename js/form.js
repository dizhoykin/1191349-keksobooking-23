
import {disableFormElement} from './utils.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const adForm = document.querySelector('.ad-form');

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');

  disableFormElement('input', adForm);
  disableFormElement('select', adForm);
  disableFormElement('textarea', adForm);
  disableFormElement('button', adForm);
};

disableForms();

const enableForms = () => {

  adForm.classList.remove('ad-form--disabled');
  const disabledElements = adForm.querySelectorAll('[disabled]');
  for (const disabledElement of disabledElements) {
    disabledElement.removeAttribute('disabled');
  }
};

enableForms();

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
const typeNumberRoomValue = Number(roomNumberInput.value);
const capacityInput = document.querySelector('#capacity');
const typeNumberCapacityValue = Number(capacityInput.value);

const validateRoomsAndGuests = () => {
  if ((typeNumberRoomValue === 1 && typeNumberCapacityValue !== 1) ||
    (typeNumberRoomValue === 2 && ((typeNumberCapacityValue !== 1) || (typeNumberCapacityValue !== 2))) ||
    (typeNumberRoomValue === 100 || typeNumberCapacityValue === 0)) {
    roomNumberInput.setCustomValidity('Выбрано ошибочное число комнат или гостей');
    capacityInput.setCustomValidity('Выбрано ошибочное число комнат или гостей');
    // console.log('Выбрано ошибочное число комнат или гостей');
    return false;
  }
  roomNumberInput.setCustomValidity('');
  capacityInput.setCustomValidity('');
};

adForm.addEventListener('submit', (evt) => {
  if (validateRoomsAndGuests() === false) {
    evt.preventDefault();
  }
  // roomNumberInput.addEventListener('change', () => {
  //   checkRoomsAndGuestsMatching();
  // });
  //
  // capacityInput.addEventListener('change', () => {
  //   checkRoomsAndGuestsMatching();
  // });
});
