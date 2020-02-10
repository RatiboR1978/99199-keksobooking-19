'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var avatarNumbers = [];
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var adForm = document.querySelector('.ad-form');
var adFormSubmit = adForm.querySelector('.ad-form__submit');
var inputsForm = adForm.querySelectorAll('input');
var selectsForm = adForm.querySelectorAll('select');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var typeBuilding = adForm.querySelector('#type');
var typesBuilding = adForm.querySelectorAll('#type > option');
var price = adForm.querySelector('#price');
var filtersContainer = map.querySelector('.map__filters-container');
var filters = filtersContainer.querySelector('.map__filters');
var PRISE_ARR = [0, 1000, 5000, 10000];
var pinMain = mapPins.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');
var PIN_MAIN_X = parseInt(pinMain.style.left, 10) + 62 / 2;
var PIN_MAIN_Y = parseInt(pinMain.style.top, 10) + 62 + 22;
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var similarAdvertTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var similarAdvertLabelTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var typePremises = [
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

// Функция создания массива объявлений
var creationArrayAdverts = function () {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    var createType = function (arrTypes) {
      var j = getRandom(arrTypes);
      return arrTypes[j].name;
    };
    var indexCheckinTimes = getRandom(CHECKIN_TIMES);
    var positionX = getRandomX(1200);
    var positionY = getRandomY(130, 630);
    arr.push({
      'author': {
        'avatar': 'img/avatars/user' + createAvatarNumber(avatarNumbers) + '.png'
      },
      'offer': {
        'title': 'Уютное гнездышко для всех',
        'address': '' + positionX + ', ' + positionY,
        'price': 1000000,
        'type': createType(typePremises),
        'rooms': 3,
        'guests': 2,
        'checkin': CHECKIN_TIMES[indexCheckinTimes],
        'checkout': CHECKIN_TIMES[indexCheckinTimes],
        'features': getRandomArr(FEATURES),
        'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        'photos': getRandomArr(PHOTOS)
      },
      'location': {
        'x': positionX,
        'y': positionY
      }
    });
  }

  return arr;
};

// Функция создания объявления
var renderAdvert = function (advert) {
  var advertElement = similarAdvertTemplate.cloneNode(true);
  var avatarAdvert = advertElement.querySelector('.popup__avatar');
  var titleAdvert = advertElement.querySelector('.popup__title');
  var addressAdvert = advertElement.querySelector('.popup__text--address');
  var priceAdvert = advertElement.querySelector('.popup__text--price');
  var typeAdvert = advertElement.querySelector('.popup__type');
  var capacityAdvert = advertElement.querySelector('.popup__text--capacity');
  var timeAdvert = advertElement.querySelector('.popup__text--time');
  var descriptionAdvert = advertElement.querySelector('.popup__description');
  var photosAdvert = advertElement.querySelector('.popup__photos');
  var featuresAdvert = advertElement.querySelector('.popup__features');
  var propertiesAdvert = [titleAdvert, addressAdvert, typeAdvert];
  var propertiesObject = [advert.offer.title, advert.offer.address, advert.offer.type];
  if (advert.author.avatar === null) {
    avatarAdvert.style.cssText = 'display: none;';
  } else {
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
  }

  propertiesAdvert.forEach(function (item, i) {
    if (propertiesObject[i] === null) {
      item.style.cssText = 'display: none;';
    } else {
      item.textContent = propertiesObject[i];
    }
  });

  if (advert.offer.price === null) {
    priceAdvert.style.cssText = 'display: none;';
  } else {
    priceAdvert.textContent = advert.offer.price + '₽/ночь';
  }

  if (advert.offer.rooms === null && advert.offer.guests === null) {
    capacityAdvert.style.cssText = 'display: none;';
  } else if (advert.offer.rooms !== null && advert.offer.guests === null) {
    capacityAdvert.textContent = advert.offer.rooms + ' комнаты';
  } else {
    capacityAdvert.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  }

  if (advert.offer.checkin === null && advert.offer.checkout === null) {
    timeAdvert.style.cssText = 'display: none;';
  } else if (advert.offer.checkin !== null && advert.offer.checkout === null) {
    timeAdvert.textContent = 'Заезд после ' + advert.offer.checkin;
  } else if (advert.offer.checkin === null && advert.offer.checkout !== null) {
    timeAdvert.textContent = 'Выезд' + ' до ' + advert.offer.checkout;
  } else {
    timeAdvert.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд' +
      ' до ' + advert.offer.checkout;
  }
  featuresAdvert.innerHTML = '';
  if (advert.offer.features === null) {
    featuresAdvert.style.cssText = 'display: none;';
  } else {
    for (var i = 0; i < advert.offer.features.length; i++) {
      var newfeature = document.createElement('li');
      newfeature.classList.add('popup__feature', 'popup__feature--' + advert.offer.features[i]);
      featuresAdvert.appendChild(newfeature);
    }
  }

  if (advert.offer.description === null) {
    descriptionAdvert.style.cssText = 'display: none;';
  } else {
    descriptionAdvert.textContent = advert.offer.description;
  }
  photosAdvert.innerHTML = '';
  if (advert.offer.description === null) {
    photosAdvert.style.cssText = 'display: none;';
  } else {
    for (var j = 0; j < advert.offer.photos.length; j++) {
      var newPhoto = document.createElement('img');
      newPhoto.src = advert.offer.photos[j];
      newPhoto.classList.add('popup__photo');
      newPhoto.width = '45';
      newPhoto.height = '40';
      newPhoto.alt = 'Фотография жилья';
      photosAdvert.appendChild(newPhoto);
    }
  }

  advertElement.classList.add('hidden');
  return advertElement;
};

// Функция создания метки
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

var behaviorElemForm = function (arr, bool) {
  for (var k = 0; k < arr.length; k++) {
    arr[k].disabled = bool;
  }
};

// Функция активации карты
var onActivationMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  filters.classList.remove('ad-form--disabled');
  behaviorElemForm(inputsForm, false);
  behaviorElemForm(selectsForm, false);
};

// Функция выбора цены
var selectionPrise = function () {
  typesBuilding.forEach(function (item, i) {
    if (item.selected) {
      price.min = PRISE_ARR[i];
      price.placeholder = '' + PRISE_ARR[i];
    }
  });
};

// Функция валидации количества комнат
var validatesFormRooms = function () {
  var rooms = Number(roomNumber.value);
  var guests = Number(capacity.value);
  if (rooms === 1 && (guests > 1 || guests === 0)) {
    roomNumber.setCustomValidity('Выберите большее количество комнат');
  } else if (rooms === 2 && (guests > 2 || guests === 0)) {
    roomNumber.setCustomValidity('Выберите большее количество комнат');
  } else if (rooms === 3 && guests === 0) {
    roomNumber.setCustomValidity('Выберите большее количество комнат');
  } else if (rooms === 100 && guests > 0) {
    roomNumber.setCustomValidity('Выберите меньшее количество комнат');
  } else {
    roomNumber.setCustomValidity('');
  }
};

// Функция добавления класса
var addClass = function (collection, className) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].classList.add(className);
  }
};

// Функция открытия объявления
var openAdvert = function (collection, classCollection) {
  collection.forEach(function (item, j) {
    if (!item.classList.contains('map__pin--main')) {
      item.addEventListener('click', function () {
        var cards = map.querySelectorAll(classCollection);
        addClass(cards, 'hidden');
        cards[j - 1].classList.remove('hidden');
      });
    }
  });
};

// Функция закрытия объявления
var closeAdvert = function (collAdvert) {
  document.addEventListener('keydown', function (evt) {
    var key = evt.key;
    if (key === 'Escape') {
      collAdvert.forEach(function (item) {
        item.classList.add('hidden');
      });
    }
  });
  collAdvert.forEach(function (item, i) {
    var closeBtn = item.querySelector('.popup__close');
    closeBtn.addEventListener('click', function () {
      collAdvert[i].classList.add('hidden');
    });
  });
};

// Функция валидации формы
var validatesForm = function () {
  validatesFormRooms();
};

// Функция для времени заезда и выезда
var setTime = function (elem1, elem2) {
  elem2.value = elem1.value;
};

timeIn.addEventListener('change', function () {
  setTime(timeIn, timeOut);
});

timeOut.addEventListener('change', function () {
  setTime(timeOut, timeIn);
});

for (var i = 0; i < adverts.length; i++) {
  fragmentLabelAdverts.appendChild(renderAdvertLabel(adverts[i]));
  fragmentAdverts.appendChild(renderAdvert(adverts[i]));
}

inputAddress.value = PIN_MAIN_X + ', ' + PIN_MAIN_Y;

selectionPrise();
typeBuilding.addEventListener('click', function () {
  selectionPrise();
});

behaviorElemForm(inputsForm, true);
behaviorElemForm(selectsForm, true);

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    onActivationMap();
  }
  mapPins.appendChild(fragmentLabelAdverts);
  filtersContainer.before(fragmentAdverts);
  var pins = mapPins.querySelectorAll('.map__pin');
  var cards = map.querySelectorAll('.map__card');

  openAdvert(pins, '.map__card');
  closeAdvert(cards);
});

adFormSubmit.addEventListener('click', validatesForm);
