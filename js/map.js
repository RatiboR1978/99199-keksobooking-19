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

  var adverts = window.card.getCards();
  var fragmentAdverts = document.createDocumentFragment();
  var fragmentLabelAdverts = document.createDocumentFragment();

  //  Функция активации карты
  var onActivationMap = function () {

    window.utils.map.classList.remove('map--faded');
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


  window.utils.inputAddress.value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;
  window.form.selectionPrise();
  typeBuilding.addEventListener('click', function () {
    window.form.selectionPrise();
  });

  behaviorElemForm(inputsForm, true);
  behaviorElemForm(selectsForm, true);


  // Экспорт
  window.map = {
    onActivationMap: onActivationMap,
    mapPins: window.utils.map.querySelector('.map__pins'),
  };
})();
