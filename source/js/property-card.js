import {pluralizeWord} from './utils.js';

const typeList = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const createOfferFeatures = (feature, typeFeatures) => {
  const fragment = document.createDocumentFragment();

  for (let type of typeFeatures) {
    const featureCopy = feature.cloneNode(true);

    featureCopy.classList.add(`popup__feature--${type}`);
    fragment.appendChild(featureCopy);
  }

  return fragment;
};

const createOfferPhotos = (photo, linkPhotos) => {
  const fragment = document.createDocumentFragment();

  for (let link of linkPhotos) {
    const photoCopy = photo.cloneNode(true);

    photoCopy.src = link;
    fragment.appendChild(photoCopy);
  }

  return fragment;
};

const createPropertyCard = ({author, offer}) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup').cloneNode(true);

  const title = template.querySelector('.popup__title');
  const address = template.querySelector('.popup__text--address');
  const price = template.querySelector('.popup__text--price');
  const type = template.querySelector('.popup__type');
  const capacity = template.querySelector('.popup__text--capacity');
  const time = template.querySelector('.popup__text--time');
  const description = template.querySelector('.popup__description');
  const feature = template.querySelector('.popup__feature');
  const photo = template.querySelector('.popup__photo');
  const avatar = template.querySelector('.popup__avatar');

  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  type.textContent = typeList[offer.type];
  capacity.textContent = `${pluralizeWord('ROOM', offer.rooms)} для ${pluralizeWord('GUEST', offer.guests)}`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  description.textContent = offer.description;
  avatar.src = author.avatar;

  feature.replaceWith(createOfferFeatures(feature, offer.features));
  photo.replaceWith(createOfferPhotos(photo, offer.photos));

  return template;
};

export default createPropertyCard;
