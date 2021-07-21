const ALERT_SHOW_TIME = 5000;

// Функция добавления значений в параметры объявления

const addOfferFeatureValue = (element, className, value) => {
  const featureValueElement = element.querySelector(className);
  value ? (featureValueElement.textContent = value) : (featureValueElement.classList.add('hidden'));
};

// Функция выключения элемента DOM
const disableFormElement = (tagName, parentForm) => {
  const tagNameList = parentForm.querySelectorAll(tagName);
  for (tagName of tagNameList) {
    tagName.setAttribute('disabled','');
  }
};

// Функция склонения слов в зависимости от числительного -- скачано отсюда: https://realadmin.ru/coding/sklonenie-na-javascript.html

const changeWordForm = (value, textForms) => {
  value = Math.abs(value) % 100;
  const nextValue = value % 10;
  if (value > 10 && value < 20) {
    return textForms[2];
  }
  if (nextValue > 1 && nextValue < 5) {
    return textForms[1];
  }
  if (nextValue === 1) {
    return textForms[0];
  }
  return textForms[2];
};

// Функция вызова сообщения в случае ошибки fetch()

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Обработчик нажатия ESC

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {addOfferFeatureValue, disableFormElement, changeWordForm, showAlert, isEscEvent};
