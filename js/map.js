import {enableForms, setCoordinates} from './form.js';
import {createAdsArray} from './data.js';
import {showCard} from './card.js';

// Создание массива объявлений со случайными данными

window.createAdsArray = createAdsArray;

const ADS_NUMBER = 10;
const adsList = createAdsArray(ADS_NUMBER);

// Установка начальных координат карты

const initialCoordinates = {
  lat: 35.68950,
  lng: 139.69171,
};

setCoordinates(initialCoordinates);

// Загрузка карты и включение доступа к форме по загрузке

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView({
    lat: initialCoordinates.lat,
    lng: initialCoordinates.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Установка главной метки

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: initialCoordinates.lat,
    lng: initialCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// Получение адреса главной метки от ее перемещения по карте

mainPinMarker.on('moveend', (evt) => {
  const newCoordinates = evt.target.getLatLng();
  setCoordinates(newCoordinates);
});

// Вывод маркеров объявлений на основе данных сгенерированного массива объявлений

adsList.forEach((adsListElement) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: adsListElement.ad.location.lat,
      lng: adsListElement.ad.location.lng,
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
