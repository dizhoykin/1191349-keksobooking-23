import {enableForms} from './form.js';
import {showCard} from './card.js';
import {setCoordinates} from './form.js';
import {getInitialCoordinates} from './data.js';

// Установка начального состояния карты

const map = L.map('map-canvas');

// Установка главной метки

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

// Получение адреса главной метки от ее перемещения по карте

mainPinMarker.on('moveend', (evt) => {
  const getNewCoordinates = () => evt.target.getLatLng();
  setCoordinates(getNewCoordinates);
});

// Функция возвращения карты в начальное состояние, в том числе после отправки формы

const setInitialMapState = () => {
  setCoordinates(getInitialCoordinates);
  const mapInitial = map;
  mapInitial.on('load', () => {
    enableForms();
  })
    .setView({
      lat: getInitialCoordinates().lat,
      lng: getInitialCoordinates().lng,
    }, 10);

  mainPinMarker.setLatLng([getInitialCoordinates().lat, getInitialCoordinates().lng]).update();
};

setInitialMapState();

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Вывод маркеров объявлений на основе данных сгенерированного массива объявлений

const setAdsToMap = (adsList) => {
  adsList.forEach((adsListElement) => {
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
      .addTo(map)
      .bindPopup(
        showCard(adsListElement),
        {
          keepInView: true,
        },
      );
  });
};

export {setAdsToMap, setInitialMapState};
