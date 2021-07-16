import './form.js';
import {submitForm} from './form.js';
import './map.js';
import {setAdsToMap} from './map.js';
import {setInitialState, getData} from './api.js';

const ADS_COUNT = 10;

getData((adsList) => {
  setAdsToMap(adsList.slice(0, ADS_COUNT));
});

submitForm(setInitialState);
