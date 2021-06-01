// Скопировано с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  if (min < 0 || max < 0 || max < min) {
    throw new Error('Введен неверный диапазон чисел');
  }
  min = Math.ceil(min); // Округление левого интервала вверх, если введено число с плавающей точкой
  max = Math.floor(max); // Округление правого интервала вниз, если введено число с плавающей точкой
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(0, 1);

function getRandomFloatInclusive(min, max, decimal) {
  if (min < 0 || max < 0 || max < min) {
    throw new Error('Введен неверный диапазон чисел');
  } else if (decimal < 0 || !Number.isInteger(decimal)) {
    throw new Error('Введено неверное число знаков после запятой');
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
}

getRandomFloatInclusive(0, 1, 3);
