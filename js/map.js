'use strict';

/*
 Модуль активации карты и действий на карте
*/

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;
  var AMOUNT_PINS_IN_MAP = 5;
  var INITIAL_VALUE_FORM = {
    type: 'flat',
    time: '12:00',
    amount: 1
  };
  var PIN_MAIN_X = parseInt(window.utils.pinMain.style.left, 10) + PIN_WIDTH / 2;
  var PIN_MAIN_Y = parseInt(window.utils.pinMain.style.top, 10) + PIN_HEIGHT;
  var mapPins = window.utils.map.querySelector('.map__pins');
  var filtersContainer = window.utils.map.querySelector('.map__filters-container');
  var mapFeatures = window.utils.map.querySelector('.map__features');
  var filters = filtersContainer.querySelector('.map__filters');
  var selectsFilter = filters.querySelectorAll('select');
  var adForm = window.utils.adForm;
  var formElements = window.utils.adForm.querySelectorAll('fieldset');
  var inputsForm = adForm.querySelectorAll('input');
  var inputsCheck = document.querySelectorAll('input[type="checkbox"]');
  var formSubmit = document.querySelector('.ad-form__element--submit');
  var selectsForm = adForm.querySelectorAll('select');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var descriptionForm = adForm.querySelector('#description');
  var typeBuilding = adForm.querySelector('#type');
  var pinMain = window.utils.pinMain;
  var adFormPhotoContainer = adForm.querySelector('.ad-form__photo-container');
  var adFormUpload = adForm.querySelector('#images');
  var adFormAvatar = adForm.querySelector('#avatar');
  var adFormPhotos = adForm.querySelectorAll('.ad-form__photo');
  var adFormHeaderPreviewImage = adForm.querySelector('.ad-form-header__preview img');

  //  Функция активации карты
  var onActivationMap = function () {

    window.utils.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
    selectsFilter.forEach(function (item) {
      item.disabled = false;
    });
    mapFeatures.disabled = false;
    formElements.forEach(function (item) {
      item.disabled = false;
    });
  };

  var onError = function (message) {
    return message;
  };

  // Функция появления пинов
  var appearancePin = function (data, amount) {
    var fragmentAdverts = document.createDocumentFragment();
    var fragmentLabelAdverts = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      fragmentLabelAdverts.appendChild(window.generatePin(data[i]));
      fragmentAdverts.appendChild(window.modal.renderAdvert(data[i]));
    }
    mapPins.appendChild(fragmentLabelAdverts);
    filtersContainer.before(fragmentAdverts);

    var pins = window.map.mapPins.querySelectorAll('.map__pin');
    var cards = window.utils.map.querySelectorAll('.map__card');

    window.modal.openAdvert(pins, '.map__card');
    window.modal.closeAdvert(cards);
  };

  // Функция очистки карты от пинов
  var cleaningMap = function () {
    var mapPinsAll = document.querySelectorAll('.map__pin');
    var mapCards = document.querySelectorAll('.map__card');
    for (var k = 0; k < mapPinsAll.length; k++) {
      if (k < mapPinsAll.length - 1) {
        mapCards[k].remove();
      }
      if (!mapPinsAll[k].classList.contains('map__pin--main')) {
        mapPinsAll[k].remove();
      }
    }
  };

  // Функция действия после удачной отправки формы
  var onModalSuccess = function () {
    var main = document.querySelector('main');
    var template = document.querySelector('#success').content.querySelector('div');
    var element = template.cloneNode(true);

    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }

    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }

    main.appendChild(element);
    document.addEventListener('keydown', function (evtBody) {
      var key = evtBody.key;

      if (key === 'Escape') {
        window.utils.onModalSuccessClose('.success');
      }
    });

    main.addEventListener('click', function () {
      window.utils.onModalSuccessClose('.success');
    });
  };

  // Функция действия после неудачной отправки формы
  var onModalError = function () {
    var main = document.querySelector('main');
    var template = document.querySelector('#error').content.querySelector('div');
    var element = template.cloneNode(true);
    var errorButton = document.querySelector('.error__button');

    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }

    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }

    main.appendChild(element);
    main.addEventListener('click', function () {
      window.utils.onModalSuccessClose('.error');
    });

    errorButton.addEventListener('click', function () {
      window.utils.onModalSuccessClose('.error');
    });

    document.addEventListener('keydown', function (evtBody) {
      var key = evtBody.key;

      if (key === 'Escape') {
        window.utils.onModalSuccessClose('.error');
      }
    });
  };

  //  Функция обработки данных с сервера
  var onSuccess = function (data) {
    var adverts = data;
    var form = window.utils.adForm;

    // Функция сброса страницы
    var resetPage = function () {
      var mapPinsAll = document.querySelectorAll('.map__pin');
      var mapCards = document.querySelectorAll('.map__card');
      var housingPictures = adForm.querySelectorAll('.ad-form__photo');

      cleaningMap(mapPinsAll, mapCards);
      window.utils.pinMain.style.top = (PIN_MAIN_Y - PIN_HEIGHT) + 'px';
      window.utils.pinMain.style.left = (PIN_MAIN_X - PIN_WIDTH / 2) + 'px';

      inputsForm.forEach(function (item) {
        if (item.name !== 'address') {
          item.value = '';
        } else {
          item.value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;
        }
      });

      mapFeatures.disabled = true;
      formSubmit.disabled = true;
      descriptionForm.value = '';

      selectsFilter.forEach(function (item) {
        item.value = 'any';
        item.disabled = true;
      });

      formElements.forEach(function (item) {
        item.disabled = true;
      });

      inputsCheck.forEach(function (item) {
        item.checked = false;
      });

      selectsForm.forEach(function (item) {
        if (item.name === 'type') {
          item.value = INITIAL_VALUE_FORM.type;
          window.form.selectionPrise();
        }
        if (item.name === 'timein' || item.name === 'timeout') {
          item.value = INITIAL_VALUE_FORM.time;
        }
        if (item.name === 'rooms' || item.name === 'capacity') {
          item.value = INITIAL_VALUE_FORM.amount;
        }
      });

      descriptionForm.value = '';
      window.preview.settingInitialStateImages(housingPictures);
      window.preview.settingInitialStateAvatar(adFormHeaderPreviewImage, window.preview.lingImageAvatar);
      pinMain.addEventListener('mouseup', onData);
      window.utils.map.classList.add('map--faded');
      window.utils.adForm.classList.add('ad-form--disabled');
      window.map.filters.classList.remove('ad-form--disabled');
    };

    appearancePin(data, AMOUNT_PINS_IN_MAP);

    window.filters.filterForm.addEventListener('change', function () {
      window.filters.onChangeFilterForm(adverts);
    });

    form.addEventListener('reset', function (evt) {
      resetPage();
      evt.preventDefault();
    });

    form.addEventListener('submit', function (evt) {
      window.xhr.upload(new FormData(form), function () {
        onModalSuccess();
        resetPage();
      }, function () {
        onModalError();
        resetPage();
      });
      evt.preventDefault();
    });
  };

  // Функция приема данных с сервера страницы
  var onData = function () {
    window.xhr.load(onSuccess, onError);
    var pins = window.map.mapPins.querySelectorAll('.map__pin');
    var cards = window.utils.map.querySelectorAll('.map__card');

    pinMain.removeEventListener('mouseup', onData);
    window.modal.openAdvert(pins, '.map__card');
    window.modal.closeAdvert(cards);
  };

  adFormAvatar.addEventListener('change', function () {
    window.preview.onAvatarChange(adFormAvatar, adFormHeaderPreviewImage, window.preview.fileTypes);
  });
  adFormUpload.addEventListener('change', function () {
    window.preview.onPhotosChange(adFormPhotos, adFormUpload, adFormPhotoContainer, window.preview.fileTypes);
  });

  timeIn.addEventListener('change', function () {
    window.form.setTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    window.form.setTime(timeOut, timeIn);
  });

  window.utils.inputAddress.value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;
  window.form.selectionPrise();
  typeBuilding.addEventListener('click', function () {
    window.form.selectionPrise();
  });

  pinMain.addEventListener('mousedown', function (evt) {
    window.mainPin.onMouseDownPin(evt);
  });

  pinMain.addEventListener('mouseup', onData);

  // Экспорт
  window.map = {
    onActivationMap: onActivationMap,
    cleaningMap: cleaningMap,
    appearancePin: appearancePin,
    amountPinsInMap: AMOUNT_PINS_IN_MAP,
    inputsForm: inputsForm,
    filters: filters,
    selectsForm: selectsForm,
    mapPins: window.utils.map.querySelector('.map__pins'),
  };
})();
