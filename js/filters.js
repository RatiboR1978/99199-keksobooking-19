'use strict';

/*
 Модуль отвечает за фильтрацию пинов на карте
*/

(function () {
  var DELAY = 500;
  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrices = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterCheck = filterForm.querySelector('#housing-features');
  var price = {
    'low': {
      MIN: 0,
      MAX: 10000
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50000,
      MAX: 9999999
    },
  };

  // Фильтрация селектов кроме цены
  var filterSelect = function (field, item, prop) {
    if (field.value !== 'any') {
      return (item['offer'][prop].toString() === field.value);
    } else {
      return true;
    }
  };

  // Фильтрация селкта цены
  var filterPrice = function (field, item) {
    if (field.value !== 'any') {
      return item['offer']['price'] >= price[field.value].MIN && item.offer.price < price[field.value].MAX;
    } else {
      return true;
    }
  };

  // Фильтрация чекбоксов удобств
  var filterFeatures = function (item) {
    var checkedCheckbox = Array.from(filterCheck.querySelectorAll('input[type="checkbox"]:checked'));
    return checkedCheckbox.every(function (feature) {
      return item['offer']['features'].includes(feature.value);
    });
  };

  var onChangefilterForm = function (data) {
    var filteredData = data.slice();

    // Фильтрация типа жилья
    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterType, item, 'type');
    });

    // Фильтрация количества комнат
    filteredData = filteredData.filter(function (item) {
      return filterPrice(filterPrices, item);
    });

    // Фильтрация количества комнат
    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterRooms, item, 'rooms');
    });

    // Фильтрация количества гостей
    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterGuests, item, 'guests');
    });

    // Фильтрация удобства
    filteredData = filteredData.filter(function (item) {
      return filterFeatures(item);
    });

    window.map.cleaningMap();
    filteredData.length = (filteredData.length <= window.map.amountPinsInMap) ? filteredData.length : window.map.amountPinsInMap;
    setTimeout(function () {
      window.map.appearancePin(filteredData, filteredData.length);
    }, DELAY);
  };

  // Экспорт
  window.filters = {
    filterForm: filterForm,
    onChangefilterForm: onChangefilterForm
  };
})();
