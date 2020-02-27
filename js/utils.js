'use strict';

/*
 Модуль вспомогательных функций и переменных
*/

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');

  // Функция добавления класса
  var addClass = function (collection, className) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].classList.add(className);
    }
  };

  // Функция удаления класса
  var removeClass = function (collection, className) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].classList.remove(className);
    }
  };

  // Экспорт
  window.utils = {
    addClass: addClass,
    removeClass: removeClass,
    adForm: adForm,
    pinMain: pinMain,
    inputAddress: inputAddress,
    map: map
  };
})();
