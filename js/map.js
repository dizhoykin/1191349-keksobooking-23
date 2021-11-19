import {setCoordinates, enableForms} from './form.js';
import {showPopup} from './popup.js';
import {getInitialCoordinates} from './data.js';
import {debounce} from './debounce.js';
import {disableFormElement} from './utils.js';
import {getData} from './api.js';

const ADS_COUNT = 10;
const LOWER_PRICE_LIMIT = 10000;
const UPPER_PRICE_LIMIT = 50000;

let data = [];

// Функция выключения элементов формы с фильтрами

const mapFiltersElement = document.querySelector('.map__filters');

const disableMapFilters = () => {
  mapFiltersElement.classList.add('map__filters--disabled');
  disableFormElement('input', mapFiltersElement);
  disableFormElement('select', mapFiltersElement);
};

disableMapFilters();

// Функция включения элементов формы с фильтрами

const enableMapFilters = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  const disabledMapFiltersList = mapFiltersElement.querySelectorAll('[disabled]');
  for (const disabledMapFilter of disabledMapFiltersList) {
    disabledMapFilter.disabled = false;
  }
};

// Инициализация карты

const map = L.map('map-canvas');

map.setView({
  lat: getInitialCoordinates().lat,
  lng: getInitialCoordinates().lng,
}, 10);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: getInitialCoordinates().lat,
    lng: getInitialCoordinates().lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Получение адреса главной метки от ее перемещения по карте

mainPinMarker.on('moveend', (evt) => {
  const getNewCoordinates = () => evt.target.getLatLng();
  setCoordinates(getNewCoordinates);
});

// Функция возвращения карты в начальное состояние

const resetMap = () => {
  map.setView({
    lat: getInitialCoordinates().lat,
    lng: getInitialCoordinates().lng,
  }, 10);

  mainPinMarker.setLatLng([getInitialCoordinates().lat, getInitialCoordinates().lng]).update();
  map.closePopup();
};

// Фильтрация меток объявлений на карте

const typeElement = mapFiltersElement.querySelector('#housing-type');
const roomsElement = mapFiltersElement.querySelector('#housing-rooms');
const guestsElement = mapFiltersElement.querySelector('#housing-guests');
const priceElement = mapFiltersElement.querySelector('#housing-price');

const checkByType = (adObject) => (typeElement.value === 'any') ? true : (adObject.offer.type === typeElement.value);
const checkByRooms = (adObject) => (roomsElement.value === 'any') ? true : (adObject.offer.rooms === Number(roomsElement.value));
const checkByGuests = (adObject) => (guestsElement.value === 'any') ? true : (adObject.offer.guests <= Number(guestsElement.value));

const checkByPrice = (adObject) => {
  if (priceElement.value === 'any') {
    return true;
  }
  if (priceElement.value === 'low') {
    return adObject.offer.price < LOWER_PRICE_LIMIT;
  }
  if (priceElement.value === 'high') {
    return adObject.offer.price > UPPER_PRICE_LIMIT;
  }
  return (adObject.offer.price > LOWER_PRICE_LIMIT) && (adObject.offer.price < UPPER_PRICE_LIMIT);
};

const wifiElement = mapFiltersElement.querySelector('#filter-wifi');
const dishwasherElement = mapFiltersElement.querySelector('#filter-dishwasher');
const parkingElement = mapFiltersElement.querySelector('#filter-parking');
const washerElement = mapFiltersElement.querySelector('#filter-washer');
const elevatorElement = mapFiltersElement.querySelector('#filter-elevator');
const conditionerElement = mapFiltersElement.querySelector('#filter-conditioner');

const checkByWifi = (adObject) => (!wifiElement.checked) ? true : (adObject.offer.features.includes(wifiElement.value));
const checkByDishwasher = (adObject) => (!dishwasherElement.checked) ? true : (adObject.offer.features.includes(dishwasherElement.value));
const checkByParking = (adObject) => (!parkingElement.checked) ? true : (adObject.offer.features.includes(parkingElement.value));
const checkByWasher = (adObject) => (!washerElement.checked) ? true : (adObject.offer.features.includes(washerElement.value));
const checkByElevator = (adObject) => (!elevatorElement.checked) ? true : (adObject.offer.features.includes(elevatorElement.value));
const checkByConditioner = (adObject) => (!conditionerElement.checked) ? true : (adObject.offer.features.includes(conditionerElement.value));

const checkByFeatures = (adObject) => {
  if (!adObject.offer.features) {
    adObject.offer.features = [];
    return true;
  }
  return (checkByWifi(adObject) && checkByDishwasher(adObject) && checkByParking(adObject) && checkByWasher(adObject) && checkByElevator(adObject) && checkByConditioner(adObject));
};

const checkAllFilters = (adsListElement) => (checkByType(adsListElement) && checkByRooms(adsListElement) && checkByGuests(adsListElement) &&
    checkByPrice(adsListElement) && checkByFeatures(adsListElement));

// Вывод маркеров объявлений на основе данных сгенерированного массива объявлений

const markers = L.layerGroup();

const setAdsToMap = () => {
  data
    .filter(checkAllFilters)
    .slice(0, ADS_COUNT)
    .forEach((adsListElement) => {
      const icon = L.icon({
        iconUrl: '../img/pin.jpg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(
        {
          lat: adsListElement.location.lat,
          lng: adsListElement.location.lng,
        },
        {
          icon,
        },
      );
      marker
        .bindPopup(
          showPopup(adsListElement),
          {
            keepInView: true,
          },
        );
      markers
        .addLayer(marker)
        .addTo(map);
    });
};

// Включение форм и получение данных после инициализации

const makeInitialization = () => {
  map.whenReady(() => {
    enableForms();
    enableMapFilters();

    getData((adsList) => {
      data = adsList;
      setAdsToMap();
    });
  });
};

mapFiltersElement.addEventListener('change', debounce(() => {
  markers.clearLayers();
  setAdsToMap();
}));

export {setAdsToMap, resetMap, disableMapFilters, enableMapFilters, makeInitialization};
