const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

const uploadImages = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = fileTypes.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const inputAvatarElement = document.querySelector('.ad-form__field input[type = file]');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const initialPreviewSrc = previewAvatarElement.src;

const inputPhotoElement = document.querySelector('.ad-form__upload input[type = file]');
const previewPhotoElement = document.querySelector('.ad-form__photo img');
const initialPhotoSrc = previewAvatarElement.src;

const initUploadImages = () => {
  uploadImages(inputAvatarElement, previewAvatarElement);
  uploadImages(inputPhotoElement, previewPhotoElement);
};

const resetImages = () => {
  previewAvatarElement.src = initialPreviewSrc;
  previewPhotoElement.src = initialPhotoSrc;
};

export {resetImages, initUploadImages};
