'use strict';

/*
 Модуль создания пинов
*/

(function () {
  // Функция создания метки
  window.generatePin = function (adverts) {
    var similarAdvertLabelTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var mapPin = similarAdvertLabelTemplate.cloneNode(true);

    mapPin.style = 'left: ' + (adverts.location.x - 25) + 'px; top: ' + (adverts.location.y - 70) + 'px;';
    mapPin.children[0].src = adverts.author.avatar;
    mapPin.children[0].alt = adverts.offer.title;
    return mapPin;
  };
})();
