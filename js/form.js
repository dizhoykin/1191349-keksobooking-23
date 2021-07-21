
import {disableFormElement} from './utils.js';
import {getInitialCoordinates} from './data.js';
import {sendMessage} from './message.js';
import {resetMap, makeInitialization} from './map.js';
import {sendData} from './api.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const adFormElement = document.querySelector('.ad-form');

const disableForms = () => {
  adFormElement.classList.add('ad-form--disabled');

  disableFormElement('input', adFormElement);
  disableFormElement('select', adFormElement);
  disableFormElement('textarea', adFormElement);
  disableFormElement('button', adFormElement);
};

disableForms();

const disabledElementList = adFormElement.querySelectorAll('[disabled]');

const enableForms = () => {
  adFormElement.classList.remove('ad-form--disabled');
  for (const disabledElement of disabledElementList) {
    disabledElement.removeAttribute('disabled');
  }
};

makeInitialization(enableForms);

// Вспомогательная функция для записи координат по движению главной метки

const addressInputElement = document.querySelector('#address');
addressInputElement.setAttribute('readonly','');

const setCoordinates = (coordinates) => {
  addressInputElement.value = `${  coordinates().lat.toFixed(5)  }, ${  coordinates().lng.toFixed(5)}`;
};

setCoordinates(getInitialCoordinates);

// Валидация поля ввода заголовка объявления

const titleInputElement = document.querySelector('#title');

titleInputElement.addEventListener('invalid', () => {
  if (titleInputElement.validity.tooShort) {
    titleInputElement.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  }
  else if (titleInputElement.validity.tooLong) {
    titleInputElement.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
  }
  else if (titleInputElement.validity.valueMissing) {
    titleInputElement.setCustomValidity('Это обязательное поле');
  }
  titleInputElement.setCustomValidity('');
});

titleInputElement.addEventListener('input', () => {
  const titleValueLength = titleInputElement.value.length;
  if (titleValueLength < TITLE_MIN_LENGTH) {
    titleInputElement.setCustomValidity(`Ещё ${  TITLE_MIN_LENGTH - titleValueLength } симв.`);
  }
  else if (titleValueLength > TITLE_MAX_LENGTH) {
    titleInputElement.setCustomValidity(`Удалите лишние ${  titleValueLength - TITLE_MAX_LENGTH } симв.`);
  }
  titleInputElement.setCustomValidity('');
  titleInputElement.reportValidity();
});

// Валидация типа жилья и минимальной стоимости

const typeInputElement = document.querySelector('#type');
const priceInputElement = document.querySelector('#price');

typeInputElement.addEventListener('change', () => {
  priceInputElement.placeholder = minPrice[typeInputElement.value];
  priceInputElement.setAttribute('min', minPrice[typeInputElement.value]);
});

priceInputElement.addEventListener('input', () => {
  priceInputElement.setAttribute('min', minPrice[typeInputElement.value]);
});

// Валидация поля ввода цены

priceInputElement.addEventListener('invalid', () => {
  if (priceInputElement.validity.tooLong) {
    priceInputElement.setCustomValidity('Цена не должна превышать 1000000');
  }
  else if (priceInputElement.validity.valueMissing) {
    priceInputElement.setCustomValidity('Это обязательное поле');
  }
  priceInputElement.setCustomValidity('');
});

// Валидация времени заезда-выезда гостей

const timeinInputElement = document.querySelector('#timein');
const timeoutInputElement = document.querySelector('#timeout');

const validateTimeinTimeout = (checkinTime, checkoutTime) => {
  checkoutTime.value = checkinTime.value;
};

timeinInputElement.addEventListener('change', () => {
  validateTimeinTimeout(timeinInputElement, timeoutInputElement);
});

timeoutInputElement.addEventListener('change', () => {
  validateTimeinTimeout(timeoutInputElement, timeinInputElement);
});

// Валидация полей ввода количества комнат и количества гостей

const roomNumberInputElement = document.querySelector('#room_number');
const capacityInputElement = document.querySelector('#capacity');

const validateRoomsAndGuests = () => {
  const typeNumberRoomValue = Number(roomNumberInputElement.value);
  const typeNumberCapacityValue = Number(capacityInputElement.value);

  if ((typeNumberRoomValue === 1 && typeNumberCapacityValue !== 1) ||
    (typeNumberRoomValue === 2 && typeNumberCapacityValue === 3) ||
    (typeNumberRoomValue === 2 && typeNumberCapacityValue === 0) ||
    (typeNumberRoomValue === 3 && typeNumberCapacityValue === 0) ||
    (typeNumberRoomValue === 100 && typeNumberCapacityValue !== 0)) {
    roomNumberInputElement.setCustomValidity('Выбрано ошибочное число комнат или гостей');
    return false;
  }
  roomNumberInputElement.setCustomValidity('');
  capacityInputElement.setCustomValidity('');
};

roomNumberInputElement.addEventListener('change', () => {
  validateRoomsAndGuests();
});

capacityInputElement.addEventListener('change', () => {
  validateRoomsAndGuests();
});

validateRoomsAndGuests();

// Получение шаблоново сообщений для вывода пользователю.

const successElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorElement =  document.querySelector('#error')
  .content
  .querySelector('.error');

// Функция отправки данных формы на сервер

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      sendMessage(successElement);
      resetMap();
      adFormElement.reset();
      setCoordinates(getInitialCoordinates);
    },
    () => sendMessage(errorElement),
    new FormData(evt.target),
  );
});

// Обрабочик кнопки cброса данных формы и карты

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  adFormElement.reset();
  setCoordinates(getInitialCoordinates);
});

export {enableForms, setCoordinates};
