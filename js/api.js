import {showAlert} from './utils.js';

// Функция получения данных с сервера

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adsList) => {
      onSuccess(adsList);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера.');
    });
};

// Функция отправки данных на сервер

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
