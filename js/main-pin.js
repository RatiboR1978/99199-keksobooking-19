'use strict';

/*
 Модуль отвечает за движение основной метки
*/

(function () {
  var pinMain = window.utils.pinMain;

  // Функция дактивации метки
  var onMouseUp = function () {

  };
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

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    };
    if (evt.button === 0) {
      pinMain.addEventListener('mousemove', onMouseMove);
      pinMain.addEventListener('mousemove', onMouseUp);
    }
  });
})();
