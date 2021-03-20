const PluralWords = {
  ROOM: [
    'комната',
    'комнаты',
    'комнат',
  ],
  GUEST: [
    'гостя',
    'гостей',
    'гостей',
  ],
};

const pluralizeWord = (key, count = 1) => {
  const array = PluralWords[key];
  let element = array[2];

  if (count === 1) {
    element = array[0];
  } else if (count > 1 && count < 5) {
    element = array[1];
  }

  return `${count} ${element}`;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const debounce = (cb, timeout) => {
  let lastTimeout;

  return (...args) => {
    clearTimeout(lastTimeout);

    lastTimeout = setTimeout(cb, timeout, ...args);
  };
};

export {
  pluralizeWord,
  isEscEvent,
  debounce
};
