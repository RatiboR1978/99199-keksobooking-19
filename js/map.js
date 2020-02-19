'use strict';

/*
 Модуль активации карты и действий на карте
*/

(function () {

  var mapPins = window.utils.map.querySelector('.map__pins');
  var filtersContainer = window.utils.map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelector('.map__filters');
  var adForm = window.utils.adForm;
  var inputsForm = adForm.querySelectorAll('input');
  var selectsForm = adForm.querySelectorAll('select');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var pinMain = window.utils.pinMain;
  var pinWidth = 62;
  var pinHeight = 84;
  var PIN_MAIN_X = parseInt(pinMain.style.left, 10) + pinWidth / 2;
  var PIN_MAIN_Y = parseInt(pinMain.style.top, 10) + pinHeight;
  var typeBuilding = adForm.querySelector('#type');

  // функция активации элементов формы
  var behaviorElemForm = function (arr, bool) {
    for (var k = 0; k < arr.length; k++) {
      arr[k].disabled = bool;
    }
  };

  //  Функция активации карты
  var onActivationMap = function (fragmentLabelAdverts, fragmentAdverts) {
    window.utils.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
    behaviorElemForm(inputsForm, false);
    behaviorElemForm(selectsForm, false);
    mapPins.appendChild(fragmentLabelAdverts);
    filtersContainer.before(fragmentAdverts);
  };

  var onError = function (message) {
    return message;
    // console.error(message);
  };

  //  Функция обработки данных с сервера
  var onSuccess = function (data) {
    var adverts = data;
    var fragmentAdverts = document.createDocumentFragment();
    var fragmentLabelAdverts = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragmentLabelAdverts.appendChild(window.pin(adverts[i]));
      fragmentAdverts.appendChild(window.modal.renderAdvert(adverts[i]));
    }

    // Функция сброса страницы
    var resetPage = function () {
      var mapPinsAll = document.querySelectorAll('.map__pin');
      var mapCards = document.querySelectorAll('.map__card');

      for (var k = 0; k < mapPinsAll.length; k++) {
        if (k < mapPinsAll.length - 1) {
          mapCards[k].remove();
        }
        if (!mapPinsAll[k].classList.contains('map__pin--main')) {
          mapPinsAll[k].remove();
        } else {
          mapPinsAll[k].style.top = (PIN_MAIN_Y - pinHeight) + 'px';
          mapPinsAll[k].style.left = (PIN_MAIN_X - pinWidth / 2) + 'px';
        }
      }

      inputsForm.forEach(function (item) {
        item.value = '';
      });
      window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
      document.querySelector('#address').value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;
      window.utils.map.classList.add('map--faded');
      window.utils.adForm.classList.add('ad-form--disabled');
      window.map.filters.classList.remove('ad-form--disabled');
      window.map.behaviorElemForm(window.map.inputsForm, true);
      window.map.behaviorElemForm(window.map.selectsForm, true);
    };

    var adFormReset = document.querySelector('.ad-form__reset');
    var form = window.utils.adForm;

    adFormReset.addEventListener('click', function () {
      resetPage();
    });

    form.addEventListener('submit', function (evt) {
      window.upload.formUpLoad('https://js.dump.academy/keksobooking', new FormData(form), function () {
        window.upload.onModalSuccess();
        resetPage();
      }, window.upload.onModalError);
      evt.preventDefault();
    });

    pinMain.addEventListener('mousedown', function (evt) {
      window.moainPin.onMouseDownPin(evt, fragmentLabelAdverts, fragmentAdverts);
    });

  };

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

  behaviorElemForm(inputsForm, true);
  behaviorElemForm(selectsForm, true);

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

  // Экспорт
  window.map = {
    onActivationMap: onActivationMap,
    behaviorElemForm: behaviorElemForm,
    inputsForm: inputsForm,
    filters: filters,
    selectsForm: selectsForm,
    mapPins: window.utils.map.querySelector('.map__pins'),
  };
})();
