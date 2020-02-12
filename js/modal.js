'use strict';

/*
 Модуль создания модального окна объявления
*/

(function () {
  var map = window.utils.map;
  var similarAdvertTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

  // Функция открытия объявления
  var openAdvert = function (collection, classCollection) {
    collection.forEach(function (item, j) {
      if (!item.classList.contains('map__pin--main')) {
        item.addEventListener('click', function () {
          var cards = map.querySelectorAll(classCollection);
          window.utils.addClass(cards, 'hidden');
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

  // Экспорт
  window.modal = {
    renderAdvert: renderAdvert,
    closeAdvert: closeAdvert,
    openAdvert: openAdvert
  };
})();
