import './form.js';
import './images.js';
import {getData} from './api.js';
import {setAdsToMap, disableMapFilters, enableMapFilters} from './map.js';

disableMapFilters();

let data = [];

getData((adsList) => {
  data = adsList;
  enableMapFilters();
  setAdsToMap(adsList);
});

const getAdsArray = () => data;

export {getAdsArray};
