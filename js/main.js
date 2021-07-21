import {enableForms} from './form.js';
import './images.js';
import {getData} from './api.js';
import {setAdsToMap, enableMapFilters} from './map.js';

let data = [];

const pageActivate = () => {
  getData((adsList) => {
    data = adsList;
    setAdsToMap(adsList);
  });
  enableMapFilters();
  enableForms();
};

// getData((adsList) => {
//   data = adsList;
//   enableMapFilters();
//   setAdsToMap(adsList);
// });

const getAdsArray = () => data;

export {getAdsArray, pageActivate};
