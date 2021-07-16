const ALERT_SHOW_TIME = 5000;

// Функция генерации случайного целого числа из заданного диапазона
const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0 || max < min) {
    throw new Error('Введен неверный диапазон чисел');
  }
  min = Math.ceil(min); // Округление левого интервала вверх, если введено число с плавающей точкой
  max = Math.floor(max); // Округление правого интервала вниз, если введено число с плавающей точкой
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция генерации случайного числа с плавающей точной из заданного диапазона с указанием числа знаков десятичной части
const getRandomFloatInclusive = (min, max, decimal) => {
  if (min < 0 || max < 0 || max < min) {
    throw new Error('Введен неверный диапазон чисел');
  } else if (decimal < 0 || !Number.isInteger(decimal)) {
    throw new Error('Введено неверное число знаков после запятой');
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
};

// Функция поиска случайного элемента в массиве
const getRandomArrayElement = (array) => array[Math.floor(Math.random()*array.length)];

// Функция генерации массива случайной длины с уникальными эелементами из исходного массива
const createRandomLengthArray = (initialArray) => {
  const randomArrayLength = getRandomIntInclusive(1, initialArray.length);
  const randomLengthArray = [];
  for (let index = 0; index < randomArrayLength; index++) {
    const randomLengthArrayElement = getRandomArrayElement(initialArray);
    randomLengthArray.push(randomLengthArrayElement);
  }
  const uniqueАrray = [...new Set(randomLengthArray)];
  return uniqueАrray;
};

// Функция добавления значений в параметры объявления
const addOfferFeatureValue = (element, className, value) => {
  const featureValue = element.querySelector(className);
  if (value) {
    featureValue.textContent = value;
  }
  else {
    featureValue.classList.add('hidden');
  }
};

// Функция выключения элемента DOM
const disableFormElement = (tagName, parentForm) => {
  const allTagsByName = parentForm.querySelectorAll(tagName);
  for (tagName of allTagsByName) {
    tagName.setAttribute('disabled','');
  }
};

// Функция склонения слов в зависимости от числительного -- скачано отсюда: https://realadmin.ru/coding/sklonenie-na-javascript.html

const changeWordForm = (value, textForms) => {
  value = Math.abs(value) % 100;
  const nextValue = value % 10;
  if (value > 10 && value < 20) {
    return textForms[2];
  }
  if (nextValue > 1 && nextValue < 5) {
    return textForms[1];
  }
  if (nextValue === 1) {
    return textForms[0];
  }
  return textForms[2];
};

// Функция вызова сообщения в случае ошибки fetch()

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Обработчик нажатия ESC
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, createRandomLengthArray, addOfferFeatureValue, disableFormElement, changeWordForm, showAlert, isEscEvent};
