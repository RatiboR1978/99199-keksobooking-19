'use strict';
/*
 Модуль работы с отправкой на сервер
*/

(function () {
  // Функция закрытия успешной отпарвки
  var onModalSuccessClose = function (str) {
    var elem = document.querySelector(str);
    if (elem) {
      elem.remove();
    }
  };

  var uploadFunc = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  // Функция действия после удачной отправки формы
  var onModalSuccess = function () {
    var main = document.querySelector('main');
    var template = document.querySelector('#success').content.querySelector('div');
    var element = template.cloneNode(true);

    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }

    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }

    main.appendChild(element);
    main.addEventListener('click', function () {
      onModalSuccessClose('.success');
    });
    main.addEventListener('keydown', function (evtBody) {
      var key = evtBody.key;

      if (key === 'Escape') {
        onModalSuccessClose('.success');
      }
    });
  };

  // Функция действия после неудачной отправки формы
  var onModalError = function () {
    var main = document.querySelector('main');
    var template = document.querySelector('#error').content.querySelector('div');
    var element = template.cloneNode(true);
    var errorButton = document.querySelector('.error__button');

    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }

    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }

    main.appendChild(element);
    main.addEventListener('click', function () {
      onModalSuccessClose('.error');
    });

    errorButton.addEventListener('click', function () {
      onModalSuccessClose('.error');
    });

    main.addEventListener('keydown', function (evtBody) {
      var key = evtBody.key;

      if (key === 'Escape') {
        onModalSuccessClose('.error');
      }
    });
  };

  // Экспорт
  window.upload = {
    formUpLoad: uploadFunc,
    onModalSuccess: onModalSuccess,
    onModalError: onModalError
  };
})();
