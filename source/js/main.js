import {debounce} from './utils.js';
import {getAdsData} from './api.js';
import {disableAdForm} from './form.js';

import {
  disableFilterForm,
  enableFilterForm,
  filterAds
} from './filter.js';

import {
  Templates,
  showMessage
} from './message.js';

import {
  initializeMap,
  addMapMainMarker,
  addMapMarkers,
  removeMapMarkers
} from './map.js';

const AD_COUNT = 10;
const RERENDER_DELAY = 500;

disableAdForm();
disableFilterForm();

initializeMap();
addMapMainMarker();

getAdsData(
  (data) => {
    const refreshFilterForm = () => {
      removeMapMarkers();

      addMapMarkers(filterAds(data).slice(0, AD_COUNT));
    };
    const debouncedRefreshFilterForm = debounce(refreshFilterForm, RERENDER_DELAY);

    addMapMarkers(data.slice(0, AD_COUNT));
    enableFilterForm(debouncedRefreshFilterForm, debouncedRefreshFilterForm);
  },
  () => showMessage(Templates.FAILED),
);
