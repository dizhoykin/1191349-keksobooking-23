import {isEscEvent} from './utils.js';

// Вывод сообщений при отправке данных на сервер

const bodyElement = document.querySelector('body');

const errorButton = document.querySelector('#error')
  .content
  .querySelector('.error__button');

let message = null;
let closeMessage = {};

const onclick = () => {
  closeMessage();
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

closeMessage = () => {
  bodyElement.removeChild(message);
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onclick);
};

const sendMessage = (messageStatus) => {
  message = messageStatus.cloneNode(true);
  bodyElement.appendChild(message);

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onclick);
  errorButton.addEventListener('click', onclick);
};

export {sendMessage};
