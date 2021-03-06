'use strict';

/*
 Модуль отвечает за движение основной метки
*/

(function () {
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var PinData = {
    WIDTH: 62,
    HEIGHT: 62,
    HEIGHT_OFFSET: 22
  };
  var MIN_WIDTH_MAP = -PinData.WIDTH / 2;
  var MAX_WIDTH_MAP = MAP_WIDTH - PinData.WIDTH / 2;
  var MAP_HEIGHT_MIN = 130 - PinData.HEIGHT - PinData.HEIGHT_OFFSET;
  var MAP_HEIGHT_MAX = 630 - PinData.HEIGHT - PinData.HEIGHT_OFFSET;
  var pinMain = window.utils.pinMain;

  var onMouseDownPin = function (evt) {
    evt.preventDefault();
    var dragOffset = {
      x: evt.clientX - pinMain.offsetLeft,
      y: evt.clientY - pinMain.offsetTop
    };

    // Функция движения метки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var newY = moveEvt.clientY - dragOffset.y;
      var newX = moveEvt.clientX - dragOffset.x;

      if (newY <= MAP_HEIGHT_MAX && newY >= MAP_HEIGHT_MIN) {
        pinMain.style.top = newY + 'px';
      }
      if (newX <= MAP_WIDTH - PinData.WIDTH / 2 && newX >= -PinData.WIDTH / 2) {
        pinMain.style.left = newX + 'px';
      }
      if (newX < MIN_WIDTH_MAP) {
        newX = MIN_WIDTH_MAP;
      }
      if (newX > MAX_WIDTH_MAP) {
        newX = MAX_WIDTH_MAP;
      }
      if (newY < MAP_HEIGHT_MIN) {
        newY = MAP_HEIGHT_MIN;
      }
      if (newY > MAP_HEIGHT_MAX) {
        newY = MAP_HEIGHT_MAX;
      }

      window.utils.inputAddress.value = (newX + PinData.WIDTH / 2) + ', ' + (newY + PinData.HEIGHT + PinData.HEIGHT_OFFSET);
    };

    // Функция прекращения движения метки
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.onActivationMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (evt.button === 0) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  // Экспорт
  window.mainPin = {
    onMouseDownPin: onMouseDownPin
  };
})();
