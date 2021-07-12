
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

// enableForms();

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

// Валидация типа жилья и минимальной стоимости

const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');

const checkType = (type, value) => {
  if (typeInput.value === type) {
    priceInput.placeholder = value;
    priceInput.setAttribute('min', value);
  }
};

typeInput.addEventListener('change', () => {
  checkType('bungalow', 0);
  checkType('flat', 1000);
  checkType('hotel', 3000);
  checkType('house', 5000);
  checkType('palace', 10000);

});

// Валидация поля ввода цены

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

// Валидация времени заезда-выезда гостей

const timeinInput = document.querySelector('#timein');
const timeoutInput = document.querySelector('#timeout');

const validateTimeinTimeout = (checkinTime, checkoutTime) => {
  checkoutTime.value = checkinTime.value;
};

timeinInput.addEventListener('change', () => {
  validateTimeinTimeout(timeinInput, timeoutInput);
});

timeoutInput.addEventListener('change', () => {
  validateTimeinTimeout(timeoutInput, timeinInput);
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
  roomNumberInput.addEventListener('change', () => {
    validateRoomsAndGuests();
  });

  capacityInput.addEventListener('change', () => {
    validateRoomsAndGuests();
  });
});

export {enableForms};
