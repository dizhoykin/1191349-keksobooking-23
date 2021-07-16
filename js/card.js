import {addOfferFeatureValue, changeWordForm} from './utils.js';

const TYPE = {'palace': 'Дворец', 'flat':'Квартира', 'house':'Дом', 'bungalow':'Бунгало', 'hotel':'Отель'};
const ROOMS_WORD_FORM = ['комната','комнаты','комнат'];
const GUESTS_WORD_FORM = ['гостя','гостей','гостей'];

const adsListElementTemplate =  document.querySelector('#card')
  .content
  .querySelector('.popup');

const showCard = (adsObject) => {
  const adsListElement = adsListElementTemplate.cloneNode(true);

  addOfferFeatureValue(adsListElement, '.popup__title', adsObject.offer.title);
  addOfferFeatureValue(adsListElement, '.popup__text--address', adsObject.offer.address);
  addOfferFeatureValue(adsListElement, '.popup__type', TYPE[adsObject.offer.type]);
  addOfferFeatureValue(adsListElement, '.popup__description', adsObject.offer.description);

  addOfferFeatureValue(adsListElement, '.popup__text--price', adsObject.offer.price ?
    `${adsObject.offer.price} ₽/ночь` : adsListElement.querySelector('.popup__text--price').classList.add('hidden'));

  addOfferFeatureValue(adsListElement, '.popup__text--capacity', (adsObject.offer.rooms && adsObject.offer.guests) ?
    `${adsObject.offer.rooms} ${changeWordForm(adsObject.offer.rooms, ROOMS_WORD_FORM)} для ${adsObject.offer.guests} ${changeWordForm(adsObject.offer.guests, GUESTS_WORD_FORM)}` : adsListElement.querySelector('.popup__text--capacity').classList.add('hidden'));

  addOfferFeatureValue(adsListElement, '.popup__text--time', (adsObject.offer.checkin && adsObject.offer.checkout) ?
    `Заезд после ${adsObject.offer.checkin}, выезд до ${adsObject.offer.checkout}` : adsListElement.querySelector('.popup__text--time').classList.add('hidden'));

  const featuresList = adsListElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  if (adsObject.offer.features) {
    for (const feature of adsObject.offer.features) {
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
  if (adsObject.offer.photos) {
    for (let index = 0; index < adsObject.offer.photos.length; index++) {
      photoListElementTemplate = photoListElementTemplate.cloneNode(true);
      photoListElementTemplate.src = adsObject.offer.photos[index];
      photoList.appendChild(photoListElementTemplate);
    }
  }
  else {
    photoList.classList.add('hidden');
  }

  const adsAvatar = adsListElement.querySelector('.popup__avatar');
  if (adsObject.author.avatar) {
    adsAvatar.src = adsObject.author.avatar;
  }
  else {
    adsAvatar.classList.add('hidden');
  }
  return adsListElement;
};

export {showCard};
