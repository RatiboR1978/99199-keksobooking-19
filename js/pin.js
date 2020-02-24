'use strict';

/*
 Модуль создания пинов
*/

(function () {
  // Функция создания метки
  var pin = function (adverts) {
    var similarAdvertLabelTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var labeltElement = similarAdvertLabelTemplate.cloneNode(true);

    labeltElement.style = 'left: ' + (adverts.location.x - 25) + 'px; top: ' + (adverts.location.y - 70) + 'px;';
    labeltElement.children[0].src = adverts.author.avatar;
    labeltElement.children[0].alt = adverts.offer.title;
    return labeltElement;
  };

  // Экспорт
  window.pin = pin;
})();
