'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var avatarNumbers = [];
var typePremises = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var similarAdvertTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var similarAdvertLabelTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var createAvatarNumber = function () {
  while (true) {
    var result = Math.floor(1 + Math.random() * 8);
    if (avatarNumbers.indexOf(result) === -1) {
      avatarNumbers.push(result);
      return '0' + result;
    }
  }
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

var creationArrayAdverts = function () {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    var indexType = getRandom(typePremises);
    var indexCheckinTimes = getRandom(checkinTimes);
    var positionX = getRandomX(1200);
    var positionY = getRandomY(130, 630);
    arr.push({
      'author': {
        'avatar': 'img/avatars/user' + createAvatarNumber() + '.png'
      },
      'offer': {
        'title': 'Уютное гнездышко для всех',
        'address': '' + positionX + ', ' + positionY,
        'price': 1000000,
        'type': typePremises[indexType],
        'rooms': 3,
        'guests': 2,
        'checkin': checkinTimes[indexCheckinTimes],
        'checkout': checkinTimes[indexCheckinTimes],
        'features': getRandomArr(features),
        'description': 'Описание всего на свете',
        'photos': getRandomArr(photos)
      },
      'location': {
        'x': positionX,
        'y': positionY
      }
    });
  }
  return arr;
};

var renderAdvert = function (advert) {
  var advertElement = similarAdvertTemplate.cloneNode(true);

  advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
  advertElement.querySelector('.popup__title').textContent = advert.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = advert.offer.price;
  advertElement.querySelector('.popup__type').textContent = advert.offer.type;
  advertElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд' +
    ' до ' + advert.offer.checkout;
  for (var i = 0; i < advert.offer.features.length; i++) {
    advertElement.querySelector('.popup__feature--' + advert.offer.features[i]).textContent = advert.offer.features[i];
  }
  advertElement.querySelector('.popup__description').textContent = advert.offer.description;
  for (var j = 0; j < advert.offer.features.length; j++) {
    advertElement.querySelector('.popup__feature--' + advert.offer.features[j]).textContent = advert.offer.features[i];
  }

  return advertElement;
};

var renderAdvertLabel = function (adverts) {
  var labeltElement = similarAdvertLabelTemplate.cloneNode(true);
  labeltElement.style = 'left: ' + (adverts.location.x - 25) + 'px; top: ' + (adverts.location.y - 70) + 'px;';
  labeltElement.children[0].src = adverts.author.avatar;
  labeltElement.children[0].alt = adverts.offer.title;
  return labeltElement;
};

var adverts = creationArrayAdverts();
var fragmentAdverts = document.createDocumentFragment();
var fragmentLabelAdverts = document.createDocumentFragment();

for (var i = 0; i < adverts.length; i++) {
  fragmentAdverts.appendChild(renderAdvert(adverts[i]));
  fragmentLabelAdverts.appendChild(renderAdvertLabel(adverts[i]));
}

mapPins.appendChild(fragmentLabelAdverts);
map.classList.remove('map--faded');
