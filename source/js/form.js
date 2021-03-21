import {pluralizeWord} from './utils.js';
import {sendAdFormData} from './api.js';
import {resetFilterForm} from './filter.js';

import {
  INITIAL_COORDS,
  resetCoordsMainMarker,
  disableMapMainMarker,
  enableMapMainMarker
} from './map.js';

import {
  Templates,
  showMessage
} from './message.js';

const ADDRESS_DIGITS = 5;

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const FILE_FORMATS = [
  'image/png',
  'image/jpeg',
];

const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const DEFAULT_PHOTO_COLOR = '#e4e4de';

const priceList = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const fieldsetChildren = adForm.children;
const fieldAddress = adForm.querySelector('#address');
const fieldPrice = adForm.querySelector('#price');
const fieldType = adForm.querySelector('#type');
const fieldTimein = adForm.querySelector('#timein');
const fieldTimeout = adForm.querySelector('#timeout');
const fieldRoomNumber = adForm.querySelector('#room_number');
const fieldCapacity = adForm.querySelector('#capacity');
const fieldAvatar = adForm.querySelector('#avatar');
const fieldPhoto = adForm.querySelector('#images');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const previewPhoto = adForm.querySelector('.ad-form__photo');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  for (let fieldset of fieldsetChildren) {
    fieldset.disabled = true;
  }
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  for (let fieldset of fieldsetChildren) {
    fieldset.disabled = false;
  }

  const onAdFormReset = resetAdForm;
  const onRoomNumberChange = checkCapacityRooms;
  const onCapacityChange = checkCapacityRooms;
  const onTypeChange = setPrice;
  const onAvatarChange = (evt) => imageLoad(evt, setAvatarPreview);
  const onPhotoChange = (evt) => imageLoad(evt, setPhotoPreview);

  fieldRoomNumber.addEventListener('change', onRoomNumberChange);
  fieldCapacity.addEventListener('change', onCapacityChange);
  fieldAvatar.addEventListener('change', onAvatarChange);
  fieldPhoto.addEventListener('change', onPhotoChange);
  fieldType.addEventListener('change', onTypeChange);

  fieldTimein.addEventListener('change', () => {
    fieldTimeout.value = fieldTimein.value;
  });

  fieldTimeout.addEventListener('change', () => {
    fieldTimein.value = fieldTimeout.value;
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    disableMapMainMarker();

    adForm.classList.add('ad-form--load');

    sendAdFormData(
      () => {
        submitAd(Templates.OK);
        resetAdForm();
      },
      () => submitAd(Templates.ERROR),
      new FormData(evt.target),
    );
  });

  adForm.addEventListener('reset', onAdFormReset);
};

const setAddress = ({lat, lng}) => {
  fieldAddress.value = `${lat.toFixed(ADDRESS_DIGITS)}, ${lng.toFixed(ADDRESS_DIGITS)}`;
};

const setPrice = () => {
  const price = priceList[fieldType.value];

  fieldPrice.min = price;
  fieldPrice.placeholder = price;
};

const submitAd = (name) => {
  showMessage(name);
  enableMapMainMarker();

  adForm.classList.remove('ad-form--load');
};

const resetAdForm = () => {
  adForm.reset();

  resetFilterForm();
  resetCoordsMainMarker();
  setAvatarPreview();
  setPhotoPreview();

  setTimeout(() => {
    setAddress(INITIAL_COORDS);
    setPrice();
  });
};

const checkCapacityRooms = () => {
  const roomNumber = fieldRoomNumber.value;
  const capacity = fieldCapacity.value;

  const guests = ROOMS_CAPACITY[roomNumber];
  const maxGuests = guests[guests.length - 1];
  const flagCapacity = guests.includes(capacity);

  if (flagCapacity) {
    fieldRoomNumber.setCustomValidity('');
  } else {
    const textError = `Вариант размещения ${(roomNumber === '100') ? 'не для гостей' : 'вместимостью до ' + pluralizeWord('GUEST', maxGuests)}`;

    fieldRoomNumber.setCustomValidity(textError);
  }

  fieldRoomNumber.reportValidity();
};

const imageLoad = ({target}, onLoad) => {
  const file = target.files[0];
  const flagType = FILE_FORMATS.includes(file.type);

  if (flagType) {
    const reader = new FileReader();

    reader.addEventListener('load', () => onLoad(reader.result));

    reader.readAsDataURL(file);
  }
};

const setAvatarPreview = (src = DEFAULT_AVATAR_URL) => {
  previewAvatar.src = src;
};

const setPhotoPreview = (src) => {
  if (src) {
    previewPhoto.style.background = `${DEFAULT_PHOTO_COLOR} url('${src}') no-repeat center / cover`;

    return;
  }

  previewPhoto.style.background = `${DEFAULT_PHOTO_COLOR}`;
};

export {
  enableAdForm,
  disableAdForm,
  setAddress
};
