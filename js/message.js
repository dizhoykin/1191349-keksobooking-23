import {isEscEvent} from './utils.js';

// Вывод сообщений при отправке данных на сервер

const bodyTag = document.querySelector('body');

const errorButton = document.querySelector('#error')
  .content
  .querySelector('.error__button');

let message = null;

const onclick = () => {
  closeMessage();
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};
const closeMessage = () => {
  bodyTag.removeChild(message);
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onclick);
};

const sendMessage = (messageStatus) => {
  message = messageStatus.cloneNode(true);
  bodyTag.appendChild(message);

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onclick);
  errorButton.addEventListener('click', onclick);
};

export {sendMessage};
