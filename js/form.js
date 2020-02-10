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
  var selectionPrise = function () {
    typesBuilding.forEach(function (item, i) {
      if (item.selected) {
        price.min = PRISE_ARR[i];
        price.placeholder = '' + PRISE_ARR[i];
      }
    });
  };

  // Функция валидации количества комнат
  var initialStateRooms = function () {
    capacityOptions.forEach(function (item) {
      if (item.value === roomNumber.value) {
        item.selected = true;
      } else {
        item.disabled = true;
      }
    });
  };

  var onSelectRooms = function () {
    capacityOptions.forEach(function (item) {
      item.disabled = false;
    });
    if (roomNumber.value === '1') {
      capacityOptions.forEach(function (item) {
        if (item.value !== roomNumber.value) {
          item.disabled = true;
        }
      });
    } else if (roomNumber.value === '2') {
      capacityOptions.forEach(function (item) {
        if (item.value !== roomNumber.value && item.value !== '1') {
          item.disabled = true;
        }
      });
    } else if (roomNumber.value === '3') {
      capacityOptions.forEach(function (item) {
        if (item.value !== roomNumber.value && item.value !== '1' && item.value !== '2') {
          item.disabled = true;
        }
      });
    } else {
      capacityOptions.forEach(function (item) {
        if (item.value !== '0') {
          item.disabled = true;
        }
      });
    }
  };

  // Функция для времени заезда и выезда
  var setTime = function (elem1, elem2) {
    elem2.value = elem1.value;
  };


  initialStateRooms();
  roomNumber.addEventListener('change', onSelectRooms);

  // Экспорт
  window.form = {
    selectionPrise: selectionPrise,
    setTime: setTime
  };
})();
