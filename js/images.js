const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadImages = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if(matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const inputAvatar = document.querySelector('.ad-form__field input[type = file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

uploadImages(inputAvatar, previewAvatar);

const inputPhoto = document.querySelector('.ad-form__upload input[type = file]');
const previewPhoto = document.querySelector('.ad-form__photo img');

uploadImages(inputPhoto, previewPhoto);
