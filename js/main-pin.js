'use strict';

/*
 Модуль отвечает за движение основной метки
*/

(function () {
  var pinMain = window.utils.pinMain;
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var PIN_HEIGHT = 62;
  var PIN_HEIGHT_OFFSET = 22;
  var MAP_HEIGHT_MIN = 130 - PIN_HEIGHT - PIN_HEIGHT_OFFSET;
  var MAP_HEIGHT_MAX = 630 - PIN_HEIGHT - PIN_HEIGHT_OFFSET;
  var PIN_WIDTH = 62;

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    // Функция движения метки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newY = pinMain.offsetTop - shift.y;
      var newX = pinMain.offsetLeft - shift.x;

      if (newY <= MAP_HEIGHT_MAX && newY >= MAP_HEIGHT_MIN) {
        pinMain.style.top = newY + 'px';
      }
      if (newX <= MAP_WIDTH - PIN_WIDTH / 2 && newX >= -PIN_WIDTH / 2) {
        pinMain.style.left = newX + 'px';
      }

      window.utils.inputAddress.value = pinMain.offsetLeft - shift.x + PIN_WIDTH / 2 + ', ' + (pinMain.offsetTop - shift.y + PIN_HEIGHT + PIN_HEIGHT_OFFSET);
    };

    // Функция прекращения движения метки
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.onActivationMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var pins = window.map.mapPins.querySelectorAll('.map__pin');
      var cards = window.utils.map.querySelectorAll('.map__card');

      window.modal.openAdvert(pins, '.map__card');
      window.modal.closeAdvert(cards);
    };
    if (evt.button === 0) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
