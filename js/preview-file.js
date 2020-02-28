'use strict';

/*
 Модуль, позволяющий отображать загруженные файлы
*/

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var LINK_IMAGE_AVATAR = 'img/muffin-grey.svg';

  //  Функция загрузки картинки
  var onAvatarChange = function (fileChooser, preview, fileTypes) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  //  Функция установки исходного состояния аватара
  var settingInitialStateAvatar = function (preview, link) {
    preview.src = link;
  };

  //  Функция установки исходного состояния для картинок жилья
  var settingInitialStateImages = function (collection) {
    collection.forEach(function (item) {
      if (item.firstChild) {
        item.remove();
      }
    });
  };

  //  Функция загрузки фото жилья
  var onPhotosChange = function (adFormPhotos, fileChooser, adFormPhotoContainer, fileTypes) {
    var currentImage = document.createElement('img');
    currentImage.classList.add('ad-form__img');

    if (adFormPhotos[0].children.length === 0) {
      adFormPhotos[0].appendChild(currentImage);
    } else {
      var adFormPhoto = document.createElement('div');
      adFormPhoto.classList.add('ad-form__photo');
      adFormPhoto.appendChild(currentImage);
      adFormPhotoContainer.appendChild(adFormPhoto);
    }

    onAvatarChange(fileChooser, currentImage, fileTypes);
  };

  // Экспорт
  window.preview = {
    onAvatarChange: onAvatarChange,
    onPhotosChange: onPhotosChange,
    settingInitialStateAvatar: settingInitialStateAvatar,
    settingInitialStateImages: settingInitialStateImages,
    fileTypes: FILE_TYPES,
    lingImageAvatar: LINK_IMAGE_AVATAR
  };
})();
