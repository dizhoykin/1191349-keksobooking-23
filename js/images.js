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

uploadImages(inputAvatarElement, previewAvatarElement);

const inputPhotoElement = document.querySelector('.ad-form__upload input[type = file]');
const previewPhotoElement = document.querySelector('.ad-form__photo img');

uploadImages(inputPhotoElement, previewPhotoElement);
