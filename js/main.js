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

// Функция генерации объекта "Author"
const createAuthor = (index) => {
  let avatar = `img/avatars/user0${index}.png`;
  if (index === 10) {
    avatar = `img/avatars/user${index}.png`;
  }
  return avatar;
};

createAuthor();

// Массивы значений ключей объектов "Offer"
const TITLE = ['Удобное жилье', 'Лучшее расположение', 'Отличное место', 'Красивый вид', 'Спокойное проживание', 'Близко до метро'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const DESCRIPTION = ['Отличный вариант за минимальную цену','Разумный минимум за хорошую цену',
  'Отличный выбор за минимальную цену','Идеальный выбор за эту цену','Отличный вариант за эту цену',
  'Хороший максимум за минимальную цену','Лучший минимум за хорошую цену','Отличный набор опций за минимальную цену',
  'Хороший вариант за лучшую цену','Лучший максимум за минимальную цену'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// Константы координат и число разрядов после запятой объектов "Location"
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DECIMAL = 5;

// Функция-прототип для поиска случайного элемента в массиве
Array.prototype.sample = function() {
  return this[Math.floor(Math.random()*this.length)];
};

// Функция генерации массива случайной длины с уникальными эелементами из исходного массива
const createRandomLengthArray = (initialArray) => {
  const randomArrayLength = getRandomIntInclusive(1, initialArray.length);
  const randomLengthArray = [];
  for (let index = 0; index < randomArrayLength; index++) {
    const randomLengthArrayElement = initialArray.sample();
    randomLengthArray.push(randomLengthArrayElement);
  }
  const uniqueАrray = [...new Set(randomLengthArray)];
  return uniqueАrray;
};

createRandomLengthArray (FEATURES);

// Функция генерации объекта "Offer"
const createOffer = (lat, lng) => {
  const randomTitleIndex = getRandomIntInclusive(0, TITLE.length - 1);
  const randomTypeIndex = getRandomIntInclusive(0, TYPE.length - 1);
  const randomCheckinIndex = getRandomIntInclusive(0, CHECKIN.length - 1);
  const randomCheckoutIndex = getRandomIntInclusive(0, CHECKOUT.length - 1);
  const randomDescriptionIndex = getRandomIntInclusive(0, CHECKOUT.length - 1);

  return {
    title: TITLE[randomTitleIndex],
    address: {lat, lng},
    price: getRandomIntInclusive(1, 1000),
    type: TYPE[randomTypeIndex],
    rooms: getRandomIntInclusive(1, 7),
    guests: getRandomIntInclusive(1, 7),
    checkin: CHECKIN[randomCheckinIndex],
    checkout: CHECKOUT[randomCheckoutIndex],
    features: createRandomLengthArray(FEATURES),
    description: DESCRIPTION[randomDescriptionIndex],
    photos: createRandomLengthArray(PHOTOS),
  };
};

createOffer();

const createAd = (index) => {
  const lat = getRandomFloatInclusive(MIN_LAT, MAX_LAT, DECIMAL);
  const lng = getRandomFloatInclusive(MIN_LNG, MAX_LNG, DECIMAL);
  const ad = {
    author: createAuthor(index),
    offer: createOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
};

createAd();

const createAdsArray = () => {
  const adsArray = [];
  for (let index = 1; index <= 10; index++) {
    adsArray.push(createAd(index));
  }
  return adsArray;
};

createAdsArray();
