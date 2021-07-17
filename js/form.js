
import {disableFormElement} from './utils.js';
import {getInitialCoordinates} from './data.js';
import {sendMessage} from './message.js';
import {resetMap, makeInitialization} from './map.js';
import {sendData} from './api.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const MINPRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

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

// Вспомогательная функция для записи координат по движению главной метки

const addressInput = document.querySelector('#address');
addressInput.setAttribute('readonly','');

const setCoordinates = (coordinates) => {
  addressInput.value = `${  coordinates().lat.toFixed(5)  }, ${  coordinates().lng.toFixed(5)}`;
};

setCoordinates(getInitialCoordinates);

makeInitialization();

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

typeInput.addEventListener('change', () => {
  priceInput.placeholder = MINPRICE[typeInput.value];
  priceInput.setAttribute('min', MINPRICE[typeInput.value]);
});

priceInput.addEventListener('input', () => {
  priceInput.setAttribute('min', MINPRICE[typeInput.value]);
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
const capacityInput = document.querySelector('#capacity');

const validateRoomsAndGuests = () => {
  const typeNumberRoomValue = Number(roomNumberInput.value);
  const typeNumberCapacityValue = Number(capacityInput.value);

  if ((typeNumberRoomValue === 1 && typeNumberCapacityValue !== 1) ||
    (typeNumberRoomValue === 2 && ((typeNumberCapacityValue !== 1) || (typeNumberCapacityValue !== 2))) ||
    (typeNumberRoomValue === 100 || typeNumberCapacityValue === 0)) {
    roomNumberInput.setCustomValidity('Выбрано ошибочное число комнат или гостей');
    return false;
  }
  roomNumberInput.setCustomValidity('');
  capacityInput.setCustomValidity('');
};

roomNumberInput.addEventListener('change', () => {
  validateRoomsAndGuests();
});

capacityInput.addEventListener('change', () => {
  validateRoomsAndGuests();
});

validateRoomsAndGuests();

// Получение шаблоново сообщений для вывода пользователю.

const success =  document.querySelector('#success')
  .content
  .querySelector('.success');

const error =  document.querySelector('#error')
  .content
  .querySelector('.error');

// Функция отправки данных формы на сервер

const submitForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        sendMessage(success);
        resetMap();
        adForm.reset();
        setCoordinates(getInitialCoordinates);
      },
      () => sendMessage(error),
      new FormData(evt.target),
    );
  });
};

// Обрабочик кнопки cброса данных формы и карты

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  adForm.reset();
  setCoordinates(getInitialCoordinates);
});

export {enableForms, submitForm, setCoordinates};
