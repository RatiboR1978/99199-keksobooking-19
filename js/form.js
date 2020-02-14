'use strict';

/*
 Модуль действий над формой
*/

(function () {
  var PRISE_ARR = [0, 1000, 5000, 10000];
  var adForm = window.utils.adForm;
  var price = adForm.querySelector('#price');
  var typesBuilding = adForm.querySelectorAll('#type > option');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');

  // Функция выбора цены
  var setPricesForSelectedBuilding = function () {
    typesBuilding.forEach(function (item, i) {
      if (item.selected) {
        price.min = PRISE_ARR[i];
        price.placeholder = '' + PRISE_ARR[i];
      }
    });
  };

  // Функция начальной установки количества комнат
  var setStateRoomsInitial = function () {
    capacityOptions.forEach(function (item) {
      if (item.value === roomNumber.value) {
        item.selected = true;
      } else {
        item.disabled = true;
      }
    });
  };

  // Функция валидации количества комнат
  var onSelectRooms = function () {
    capacityOptions.forEach(function (item) {
      item.disabled = true;
    });

    for (var i = 0; i < capacityOptions.length; i++) {
      if (roomNumber.value === '100' && capacityOptions[i].value === '0') {
        capacityOptions[i].disabled = false;
        capacityOptions[i].selected = true;
        break;
      }

      if (capacityOptions[i].value <= roomNumber.value && capacityOptions[i].value !== '0' && roomNumber.value !== '100') {
        capacityOptions[i].disabled = false;
        capacityOptions[i].selected = true;
      }
    }
  };

  // Функция для времени заезда и выезда
  var setTime = function (elem1, elem2) {
    elem2.value = elem1.value;
  };

  setStateRoomsInitial();
  roomNumber.addEventListener('change', onSelectRooms);

  // Экспорт
  window.form = {
    selectionPrise: setPricesForSelectedBuilding,
    setTime: setTime
  };
})();
