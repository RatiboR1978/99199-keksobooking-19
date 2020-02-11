'use strict';

/*
 Модуль активации карты и действий на карте
*/

(function () {
  var map = window.utils.map;
  var mapPins = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelector('.map__filters');
  var adForm = window.utils.adForm;
  var inputsForm = adForm.querySelectorAll('input');
  var selectsForm = adForm.querySelectorAll('select');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var inputAddress = adForm.querySelector('#address');
  var pinMain = window.utils.pinMain;
  var PIN_MAIN_X = parseInt(pinMain.style.left, 10) + 62 / 2;
  var PIN_MAIN_Y = parseInt(pinMain.style.top, 10) + 62 + 22;
  var typeBuilding = adForm.querySelector('#type');

  // функция активации элементов формы
  var behaviorElemForm = function (arr, bool) {
    for (var k = 0; k < arr.length; k++) {
      arr[k].disabled = bool;
    }
  };
  var adverts = window.card();
  var fragmentAdverts = document.createDocumentFragment();
  var fragmentLabelAdverts = document.createDocumentFragment();

  //  Функция активации карты
  var onActivationMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
    behaviorElemForm(inputsForm, false);
    behaviorElemForm(selectsForm, false);
    mapPins.appendChild(fragmentLabelAdverts);
    filtersContainer.before(fragmentAdverts);
  };

  timeIn.addEventListener('change', function () {
    window.form.setTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    window.form.setTime(timeOut, timeIn);
  });

  for (var i = 0; i < adverts.length; i++) {
    fragmentLabelAdverts.appendChild(window.pin(adverts[i]));
    fragmentAdverts.appendChild(window.modal.renderAdvert(adverts[i]));
  }

  inputAddress.value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;

  window.form.selectionPrise();
  typeBuilding.addEventListener('click', function () {
    window.form.selectionPrise();
  });

  behaviorElemForm(inputsForm, true);
  behaviorElemForm(selectsForm, true);

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      onActivationMap();
    }
    var pins = mapPins.querySelectorAll('.map__pin');
    var cards = map.querySelectorAll('.map__card');

    window.modal.openAdvert(pins, '.map__card');
    window.modal.closeAdvert(cards);
  });
})();
