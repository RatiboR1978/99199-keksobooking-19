'use strict';
/*
 Модуль вспомогательных функций и переменных
*/

(function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');

  var createAvatarNumber = function (arr) {
    while (arr.length < 8) {
      var result = Math.floor(1 + Math.random() * 8);
      if (arr.indexOf(result) === -1) {
        arr.push(result);
        return '0' + result;
      }
    }
    return null;
  };

  var getRandomX = function (max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
  };

  var getRandomY = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandom = function (arr) {
    var max = Math.floor(arr.length - 1);
    return Math.floor(Math.random() * (max + 1));
  };

  var getRandomArr = function (arr) {
    var length = getRandom(arr);
    var result = [];
    for (var i = 0; i <= length; i++) {
      result.push(arr[i]);
    }
    return result;
  };

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
    createAvatarNumber: createAvatarNumber,
    getRandomX: getRandomX,
    getRandomY: getRandomY,
    getRandom: getRandom,
    getRandomArr: getRandomArr,
    addClass: addClass,
    removeClass: removeClass,
    adForm: adForm,
    pinMain: pinMain,
    inputAddress: inputAddress,
    map: map
  };
})();
