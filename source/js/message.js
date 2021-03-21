import {isEscEvent} from './utils.js';

const Templates = {
  OK: 'success',
  ERROR: 'error',
  FAILED: 'request-failed',
};

const createMessage = (name) => {
  const templateFragment = document.querySelector('#' + name).content;
  const template = templateFragment.querySelector('.' + name).cloneNode(true);

  const onMessageEscKeydown = (evt) => isEscEvent(evt) ? closeMessage() : false;

  const closeMessage = () => {
    template.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  };

  const onMessageClick = closeMessage;

  template.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);

  return template;
};

const showMessage = (name) => {
  const template = createMessage(name);

  document.querySelector('main').appendChild(template);
};

export {
  Templates,
  showMessage
};
