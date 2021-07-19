import './form.js';
import {setAdsToMap} from './map.js';
import {getData} from './api.js';
import {disableMapFilters, enableMapFilters} from './map.js';

disableMapFilters();

let data = [];

getData((adsList) => {
  data = adsList;
  enableMapFilters();
  setAdsToMap(adsList);
});

const getAdsArray = () => data;

export {getAdsArray};
