import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, createRandomLengthArray} from './utils.js';

// Функция генерации объекта "Author"
const createAuthor = (index) => {
  const avatar = `img/avatars/user${  String(index).padStart(2,'0')  }.png`;
  return avatar;
};

// Массивы значений ключей объектов "Offer"
const TITLE = ['Удобное жилье', 'Лучшее расположение', 'Отличное место', 'Красивый вид', 'Спокойное проживание', 'Близко до метро'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
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

// Функция генерации объекта "Offer"
const createOffer = (lat, lng) => ({
  title: getRandomArrayElement(TITLE),
  address: {lat, lng},
  price: getRandomIntInclusive(1, 1000),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomIntInclusive(1, 7),
  guests: getRandomIntInclusive(1, 7),
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: createRandomLengthArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: createRandomLengthArray(PHOTOS),
});

// Функция генерации объявления
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

// Функция генерации массива объявлений
const createAdsArray = (adsNumber) => {
  const adsArray = [];
  for (let index = 1; index <= adsNumber; index++) {
    adsArray.push(createAd(index));
  }
  return adsArray;
};

export {createAdsArray};
