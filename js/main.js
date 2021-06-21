import {createAdsArray} from './data.js';
import {showCard} from './card.js';
import './form.js';

window.createAdsArray = createAdsArray;

const ADS_NUMBER = 10;

const adsList = createAdsArray(ADS_NUMBER);

showCard(adsList[0]);
