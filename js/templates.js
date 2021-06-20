import {createAdsArray} from './data.js';
import {addFeatureValue} from './utils.js';

const ADS_NUMBER = 1;


const adsListField = document.querySelector('#map-canvas');

const adsListElementTemplate =  document.querySelector('#card')
  .content
  .querySelector('.popup');

const adsList = createAdsArray(ADS_NUMBER);
const adsListFragment = document.createDocumentFragment();

adsList.forEach((adsObject) => {
  const adsListElement = adsListElementTemplate.cloneNode(true);

  addFeatureValue(adsListElement, '.popup__title', adsObject.ad.offer.title);
  addFeatureValue(adsListElement, '.popup__text--address', adsObject.ad.offer.address);
  addFeatureValue(adsListElement, '.popup__text--price', `${adsObject.ad.offer.price} ₽/ночь`);
  addFeatureValue(adsListElement, '.popup__type', Object.values(adsObject.ad.offer.type));
  addFeatureValue(adsListElement, '.popup__text--capacity', `${adsObject.ad.offer.rooms} комнаты для ${adsObject.ad.offer.guests} гостей`);
  addFeatureValue(adsListElement, '.popup__text--time', `Заезд после ${adsObject.ad.offer.checkin}, выезд до ${adsObject.ad.offer.checkout}`);
  addFeatureValue(adsListElement, '.popup__description', adsObject.ad.offer.description);

  const featuresList = adsListElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (const feature of adsObject.ad.offer.features) {
    const featuresListItem = document.createElement('li');
    const featureClass = `popup__feature--${feature}`;
    featuresListItem.classList.add('popup__feature', featureClass);
    featuresList.appendChild(featuresListItem);
  }

  const photoList = adsListElement.querySelector('.popup__photos');
  let photoListElementTemplate = photoList.querySelector('.popup__photo');
  photoList.innerHTML = '';
  for (let index = 0; index < adsObject.ad.offer.photos.length; index++) {
    photoListElementTemplate = photoListElementTemplate.cloneNode(true);
    photoListElementTemplate.src = adsObject.ad.offer.photos[index];
    photoList.appendChild(photoListElementTemplate);
  }

  const adsAvatar = adsListElement.querySelector('.popup__avatar');
  adsAvatar.src = '';
  adsAvatar.src = adsObject.ad.author;

  adsListFragment.appendChild(adsListElement);
});
adsListField.appendChild(adsListFragment);
