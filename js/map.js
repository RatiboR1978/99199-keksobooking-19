'use strict';

/*
 Модуль активации карты и действий на карте
*/

(function () {
  var mapPins = window.utils.map.querySelector('.map__pins');
  var filtersContainer = window.utils.map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelector('.map__filters');
  var selectsFilter = filters.querySelectorAll('select');
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
  var amountPinsInMap = 5;
  var typeBuilding = adForm.querySelector('#type');

  // функция активации элементов формы
  var behaviorElemForm = function (arr, bool) {
    for (var y = 0; y < arr.length; y++) {
      arr[y].disabled = bool;
    }
  };

  //  Функция активации карты
  var onActivationMap = function () {
    window.utils.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
    behaviorElemForm(inputsForm, false);
    behaviorElemForm(selectsForm, false);
  };

  var onError = function (message) {
    return message;
  };

  // Функция появления пинов
  var appearancePin = function (data, amount) {
    var fragmentAdverts = document.createDocumentFragment();
    var fragmentLabelAdverts = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      fragmentLabelAdverts.appendChild(window.pin(data[i]));
      fragmentAdverts.appendChild(window.modal.renderAdvert(data[i]));
    }
    mapPins.appendChild(fragmentLabelAdverts);
    filtersContainer.before(fragmentAdverts);

    var pins = window.map.mapPins.querySelectorAll('.map__pin');
    var cards = window.utils.map.querySelectorAll('.map__card');

    window.modal.openAdvert(pins, '.map__card');
    window.modal.closeAdvert(cards);
  };

  // Функция ичистки карты от пинов
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

  //  Функция обработки данных с сервера
  var onSuccess = function (data) {
    var adverts = data;

    appearancePin(data, amountPinsInMap);

    window.filters.filterForm.addEventListener('change', function () {
      window.filters.onfilterFormChange(adverts);
    });

    // Функция сброса страницы
    var resetPage = function () {
      var mapPinsAll = document.querySelectorAll('.map__pin');
      var mapCards = document.querySelectorAll('.map__card');

      cleaningMap(mapPinsAll, mapCards);
      window.utils.pinMain.style.top = (PIN_MAIN_Y - pinHeight) + 'px';
      window.utils.pinMain.style.left = (PIN_MAIN_X - pinWidth / 2) + 'px';

      inputsForm.forEach(function (item) {
        if (item.name !== 'address') {
          item.value = '';
        } else {
          item.value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;
        }
      });

      selectsFilter.forEach(function (item) {
        item.value = 'any';
      });

      pinMain.addEventListener('mouseup', onData);
      window.utils.map.classList.add('map--faded');
      window.utils.adForm.classList.add('ad-form--disabled');
      window.map.filters.classList.remove('ad-form--disabled');
      behaviorElemForm(window.map.inputsForm, true);
      behaviorElemForm(window.map.selectsForm, true);
    };

    var form = window.utils.adForm;

    form.addEventListener('reset', function (evt) {
      resetPage();
      evt.preventDefault();
    });

    form.addEventListener('submit', function (evt) {
      window.upload.formUpLoad('https://js.dump.academy/keksobooking', new FormData(form), function () {
        window.upload.onModalSuccess();
        resetPage();
      }, window.upload.onModalError);
      evt.preventDefault();
    });
  };

  // Функция приема данных с сервера страницы
  var onData = function () {
    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    pinMain.removeEventListener('mouseup', onData);
    var pins = window.map.mapPins.querySelectorAll('.map__pin');
    var cards = window.utils.map.querySelectorAll('.map__card');

    window.modal.openAdvert(pins, '.map__card');
    window.modal.closeAdvert(cards);
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

  pinMain.addEventListener('mousedown', function (evt) {
    window.moainPin.onMouseDownPin(evt);
  });

  pinMain.addEventListener('mouseup', onData);

  // Экспорт
  window.map = {
    onActivationMap: onActivationMap,
    cleaningMap: cleaningMap,
    appearancePin: appearancePin,
    amountPinsInMap: amountPinsInMap,
    inputsForm: inputsForm,
    filters: filters,
    selectsForm: selectsForm,
    mapPins: window.utils.map.querySelector('.map__pins'),
  };
})();
