import {enableForms, setCoordinates} from './form.js';
import {showCard} from './card.js';
import {getInitialCoordinates} from './data.js';
import {getAdsArray} from './main.js';
import {debounce} from './debounce.js';

const ADS_COUNT = 10;
const LOWER_PRICE_LIMIT = 10000;
const UPPER_PRICE_LIMIT = 50000;

// Установка начального состояния карты

const map = L.map('map-canvas');

const makeInitialization = () => {
  map.on('load', () => {
    enableForms();
    setCoordinates(getInitialCoordinates);
  });
};

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
};

resetMap();

import {disableFormElement} from './utils.js';

const mapFilters = document.querySelector('.map__filters');

// Функция выключения элементов формы с фильтрами

const disableMapFilters = () => {
  disableFormElement('input', mapFilters);
  disableFormElement('select', mapFilters);
};

// Функция включения элементов формы с фильтрами

const enableMapFilters = () => {
  const disabledMapFilters = mapFilters.querySelectorAll('[disabled]');
  for (const disabledMapFilter of disabledMapFilters) {
    disabledMapFilter.removeAttribute('disabled');
  }
};

// Фильтрация меток объявлений на карте

const type = mapFilters.querySelector('#housing-type');
const rooms = mapFilters.querySelector('#housing-rooms');
const guests = mapFilters.querySelector('#housing-guests');
const price = mapFilters.querySelector('#housing-price');

const checkbyType = (adObject) => {
  if (type.value === 'any') {
    return true;
  }
  else {
    return (adObject.offer.type === type.value);
  }
};

const checkbyRooms = (adObject) => {
  if (rooms.value === 'any') {
    return true;
  }
  else {
    return (adObject.offer.rooms === Number(rooms.value));
  }
};

const checkbyGuests = (adObject) => {
  if (guests.value === 'any') {
    return true;
  }
  else {
    return (adObject.offer.guests === Number(guests.value));
  }
};

const checkbyPrice = (adObject) => {
  if (price.value === 'any') {
    return true;
  }
  else if (adObject.offer.price < LOWER_PRICE_LIMIT) {
    const statusValue = 'low';
    return (statusValue === price.value);
  }
  else if (adObject.offer.price > UPPER_PRICE_LIMIT) {
    const statusValue = 'high';
    return (statusValue === price.value);
  }
  else {
    const statusValue = 'middle';
    return (statusValue === price.value);
  }
};

const wifi = mapFilters.querySelector('#filter-wifi');
const dishwasher = mapFilters.querySelector('#filter-dishwasher');
const parking = mapFilters.querySelector('#filter-parking');
const washer = mapFilters.querySelector('#filter-washer');
const elevator = mapFilters.querySelector('#filter-elevator');
const conditioner = mapFilters.querySelector('#filter-conditioner');

const checkByFeatures = (adObject) => {
  const checkByWifi = () => {
    if (!wifi.checked) {
      return true;
    }
    else
    {
      return (adObject.offer.features.includes(wifi.value));
    }
  };

  const checkByDishwasher = () => {
    if (!dishwasher.checked) {
      return true;
    }
    else
    {
      return (adObject.offer.features.includes(dishwasher.value));
    }
  };

  const checkByParking = () => {
    if (!parking.checked) {
      return true;
    }
    else
    {
      return (adObject.offer.features.includes(parking.value));
    }
  };

  const checkByWasher = () => {
    if (!washer.checked) {
      return true;
    }
    else
    {
      return (adObject.offer.features.includes(washer.value));
    }
  };

  const checkByElevator = () => {
    if (!elevator.checked) {
      return true;
    }
    else
    {
      return (adObject.offer.features.includes(elevator.value));
    }
  };

  const checkByConditioner = () => {
    if (!conditioner.checked) {
      return true;
    }
    else
    {
      return (adObject.offer.features.includes(conditioner.value));
    }
  };

  if (!adObject.offer.features) {
    return false;
  }
  else {
    return (checkByWifi() && checkByDishwasher() && checkByParking() && checkByWasher() && checkByElevator() && checkByConditioner());
  }
};

const checkAllFilters = (adsListElement) => (checkbyType(adsListElement) && checkbyRooms(adsListElement) && checkbyGuests(adsListElement) &&
    checkbyPrice(adsListElement) && checkByFeatures(adsListElement));

// Вывод маркеров объявлений на основе данных сгенерированного массива объявлений

const markers = L.layerGroup();
const setAdsToMap = (adsList) => {
  adsList
    .slice()
    .filter(checkAllFilters)
    .slice(0, ADS_COUNT)
    .forEach((adsListElement) => {
      const icon = L.icon({
        iconUrl: '../img/pin.svg',
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
          showCard(adsListElement),
          {
            keepInView: true,
          },
        );
      markers
        .addLayer(marker)
        .addTo(map);
    });
};

mapFilters.addEventListener('change', debounce(() => {
  markers.clearLayers();
  setAdsToMap(getAdsArray());
}));

export {setAdsToMap, resetMap, makeInitialization, disableMapFilters, enableMapFilters};
