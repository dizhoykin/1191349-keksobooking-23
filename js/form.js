
const disableForms = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  const adFormInputs = adForm.querySelectorAll('input');
  for (const adFormInput of adFormInputs) {
    adFormInput.setAttribute('disabled','');
  }

  const adFormSelects = adForm.querySelectorAll('select');
  for (const adFormSelect of adFormSelects) {
    adFormSelect.setAttribute('disabled','');
  }

  const adFormTextareas = adForm.querySelectorAll('textarea');
  for (const adFormTextarea of adFormTextareas) {
    adFormTextarea.setAttribute('disabled','');
  }

  const adFormButtons = adForm.querySelectorAll('button');
  for (const adFormButton of adFormButtons) {
    adFormButton.setAttribute('disabled','');
  }
};

disableForms();

const enableForms = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const disabledElements = adForm.querySelectorAll('[disabled]');
  for (const disabledElement of disabledElements) {
    disabledElement.removeAttribute('disabled');
  }
};

enableForms();
