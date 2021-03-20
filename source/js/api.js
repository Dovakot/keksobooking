const SERVER_URL = 'https://22.javascript.pages.academy/keksobooking/';

const throwError = ({status, statusText}) => {
  throw new Error(`${status} ${statusText}`);
};

const getAdsData = (onSuccess, onFail) => fetch(SERVER_URL + 'data')
  .then((response) => (response.ok) ? response.json() : throwError(response))
  .then(onSuccess)
  .catch(onFail);

const sendAdFormData = (onSuccess, onFail, body) => fetch(SERVER_URL, {
  method: 'POST',
  body,
}).then((response) => (response.ok) ? onSuccess() : throwError(response))
  .catch(onFail);

export {
  getAdsData,
  sendAdFormData
};
