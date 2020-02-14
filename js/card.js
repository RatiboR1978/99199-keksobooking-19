'use strict';

/*
 Модуль создания массива объявлений
*/

(function () {
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var avatarNumbers = [];
  var premisesType = [
    {
      'type': 'palace',
      'name': 'Дворец'
    },
    {
      'type': 'flat',
      'name': 'Квартира'
    },
    {
      'type': 'house',
      'name': 'Дом'
    },
    {
      'type': 'bungalo',
      'name': 'Бунгало'
    }
  ];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // функция создания массиба объявлений
  var getCards = function () {
    var arr = [];

    for (var i = 0; i < 8; i++) {
      var MAX_Y = 630;
      var MIN_Y = 130;
      var MAX_X = 1200;
      var indexCheckinTimes = window.utils.getRandom(CHECKIN_TIMES);
      var positionX = window.utils.getRandomX(MAX_X);
      var positionY = window.utils.getRandomY(MIN_Y, MAX_Y);
      var createType = function (arrTypes) {
        var j = window.utils.getRandom(arrTypes);
        return arrTypes[j].name;
      };

      arr.push({
        'author': {
          'avatar': 'img/avatars/user' + window.utils.createAvatarNumber(avatarNumbers) + '.png'
        },
        'offer': {
          'title': 'Уютное гнездышко для всех',
          'address': '' + positionX + ', ' + positionY,
          'price': 1000000,
          'type': createType(premisesType),
          'rooms': 3,
          'guests': 2,
          'checkin': CHECKIN_TIMES[indexCheckinTimes],
          'checkout': CHECKIN_TIMES[indexCheckinTimes],
          'features': window.utils.getRandomArr(FEATURES),
          'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
          'photos': window.utils.getRandomArr(PHOTOS)
        },
        'location': {
          'x': positionX,
          'y': positionY
        }
      });
    }

    return arr;
  };

  // Экспорт
  window.card = {
    getCards: getCards
  };
})();
