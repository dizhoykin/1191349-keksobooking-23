import {setInitialMapState} from './map.js';
import {setInitialFormState} from './form.js';
import {showAlert} from './utils.js';

const setInitialState = () => {
  setInitialFormState();
  setInitialMapState();
};

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

// const sendData = (onSuccess, onFail, body) => {
//   fetch(
//     'https://23.javascript.pages.academy/keksobooking',
//     {
//       method: 'POST',
//       body,
//     },
//   )
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//       }
//       else {
//         onFail();
//       }
//     })
//     .catch(() => {
//       onFail();
//     });
// };

// // Обрабочик cброса данных формы и карты
//
// const resetButton = document.querySelector('.ad-form__reset');
// resetButton.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   setInitialState();
// });

export {getData};
// export {sendData};
export {setInitialState};
