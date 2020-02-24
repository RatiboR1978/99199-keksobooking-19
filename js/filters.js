'use strict';

/*
 Модуль отвечает за фильтрацию пинов на карте
*/
(function () {
  // Функция фильтрации по типу жилья
  var filtrationHousingType = function (elem, data) {
    var mapPinsAll = document.querySelectorAll('.map__pin');
    var mapCards = document.querySelectorAll('.map__card');
    var resultArr = [];

    window.map.cleaningMap(mapPinsAll, mapCards);
    data.forEach(function (item) {
      if (item.offer.type === elem.value || elem.value === 'any') {
        resultArr.push(item);
      }
    });
    resultArr.length = (resultArr.length <= 5) ? resultArr.length : 5;
    window.map.appearancePin(resultArr, resultArr.length);
  };

  // Экспорт
  window.filters = {
    filtrationHousingType: filtrationHousingType
  };
})();
