
import {disableFormElement} from './utils.js';
import {getInitialCoordinates} from './data.js';
import {sendMessage} from './message.js';
import {resetMap, makeInitialization} from './map.js';
import {sendData} from './api.js';
import {resetImages} from './images.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const RoomsCapacityRatio = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
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
    disabledElement.disabled = false;
  }
};

makeInitialization(enableForms);

// Вспомогательная функция для записи координат по движению главной метки

const addressInputElement = document.querySelector('#address');
addressInputElement.readOnly = true;

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

const priceInputInitialPlaceholderElement = priceInputElement.placeholder;

typeInputElement.addEventListener('change', () => {
  priceInputElement.placeholder = MinPrice[typeInputElement.value];
  priceInputElement.min = MinPrice[typeInputElement.value];
});

priceInputElement.addEventListener('input', () => {
  priceInputElement.min = MinPrice[typeInputElement.value];
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

const roomsInputElement = document.querySelector('#room_number');
const capacityInputElement = document.querySelector('#capacity');
const capacityOptionsList = capacityInputElement.querySelectorAll('option');

const validateRoomsAndGuests = () => {
  const roomsValue = roomsInputElement.value;
  capacityOptionsList.forEach((capacityOptionsElement) => {
    capacityOptionsElement.disabled = (RoomsCapacityRatio[roomsValue].indexOf(capacityOptionsElement.value) === -1);
  });
  const enabledCapacityOptionsElement = capacityInputElement.querySelector('option:not([disabled])');
  enabledCapacityOptionsElement.selected = true;
};

roomsInputElement.addEventListener('change', () => {
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

const sendFormData = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        sendMessage(successElement);
        resetMap();
        adFormElement.reset();
        resetImages();
        setCoordinates(getInitialCoordinates);
        priceInputElement.placeholder = priceInputInitialPlaceholderElement;
        validateRoomsAndGuests();
      },
      () => sendMessage(errorElement),
      new FormData(evt.target),
    );
  });
};

// Обрабочик кнопки cброса данных формы и карты

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  adFormElement.reset();
  resetImages();
  setCoordinates(getInitialCoordinates);
  priceInputElement.placeholder = priceInputInitialPlaceholderElement;
});

export {enableForms, setCoordinates, sendFormData};
