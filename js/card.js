import {addOfferFeatureValue} from './utils.js';

const adsListField = document.querySelector('#map-canvas');
const adsListElementTemplate =  document.querySelector('#card')
  .content
  .querySelector('.popup');

const showCard = (adsObject) => {
  const adsListElement = adsListElementTemplate.cloneNode(true);

  addOfferFeatureValue(adsListElement, '.popup__title', adsObject.ad.offer.title);
  addOfferFeatureValue(adsListElement, '.popup__text--address', adsObject.ad.offer.address);
  addOfferFeatureValue(adsListElement, '.popup__type', Object.values(adsObject.ad.offer.type));
  addOfferFeatureValue(adsListElement, '.popup__description', adsObject.ad.offer.description);

  addOfferFeatureValue(adsListElement, '.popup__text--price', adsObject.ad.offer.price ?
    `${adsObject.ad.offer.price} ₽/ночь` : adsListElement.querySelector('.popup__text--price').classList.add('hidden'));

  addOfferFeatureValue(adsListElement, '.popup__text--capacity', (adsObject.ad.offer.rooms && adsObject.ad.offer.guests) ?
    `${adsObject.ad.offer.rooms} комнаты для ${adsObject.ad.offer.guests} гостей` : adsListElement.querySelector('.popup__text--capacity').classList.add('hidden'));

  addOfferFeatureValue(adsListElement, '.popup__text--time', (adsObject.ad.offer.checkin && adsObject.ad.offer.checkout) ?
    `Заезд после ${adsObject.ad.offer.checkin}, выезд до ${adsObject.ad.offer.checkout}` : adsListElement.querySelector('.popup__text--time').classList.add('hidden'));

  const featuresList = adsListElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  if (adsObject.ad.offer.features) {
    for (const feature of adsObject.ad.offer.features) {
      const featuresListItem = document.createElement('li');
      const featureClass = `popup__feature--${feature}`;
      featuresListItem.classList.add('popup__feature', featureClass);
      featuresList.appendChild(featuresListItem);
    }
  }
  else {
    featuresList.classList.add('hidden');
  }

  const photoList = adsListElement.querySelector('.popup__photos');
  let photoListElementTemplate = photoList.querySelector('.popup__photo');
  photoList.innerHTML = '';
  if (adsObject.ad.offer.photos) {
    for (let index = 0; index < adsObject.ad.offer.photos.length; index++) {
      photoListElementTemplate = photoListElementTemplate.cloneNode(true);
      photoListElementTemplate.src = adsObject.ad.offer.photos[index];
      photoList.appendChild(photoListElementTemplate);
    }
  }
  else {
    photoList.classList.add('hidden');
  }

  const adsAvatar = adsListElement.querySelector('.popup__avatar');
  if (adsObject.ad.author) {
    adsAvatar.src = adsObject.ad.author;
  }
  else {
    adsAvatar.classList.add('hidden');
  }
  adsListField.appendChild(adsListElement);
};

export {showCard};
