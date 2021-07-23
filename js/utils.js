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
    tagName.disabled = true;
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
  const alertContainerElement = document.createElement('div');
  alertContainerElement.style.zIndex = 100;
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = 0;
  alertContainerElement.style.top = 0;
  alertContainerElement.style.right = 0;
  alertContainerElement.style.padding = '10px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';
  alertContainerElement.textContent = message;
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

// Обработчик нажатия ESC

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {addOfferFeatureValue, disableFormElement, changeWordForm, showAlert, isEscEvent};
