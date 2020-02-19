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

  window.upload = function (url, data, onSuccess, onError) {
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
    var body = document.querySelector('body');
    var template = document.querySelector('#success').content.querySelector('div');
    var element = template.cloneNode(true);
    body.appendChild(element);
    body.addEventListener('click', function () {
      onModalSuccessClose('.success');
    });
    body.addEventListener('keydown', function (evtBody) {
      var key = evtBody.key;

      if (key === 'Escape') {
        onModalSuccessClose('.success');
      }
    });
  };

  // Функция действия после неудачной отправки формы
  var onModalError = function () {
    var body = document.querySelector('body');
    var template = document.querySelector('#error').content.querySelector('div');
    var element = template.cloneNode(true);
    body.appendChild(element);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      onModalSuccessClose('.error');
    });
    body.addEventListener('keydown', function (evtBody) {
      var key = evtBody.key;

      if (key === 'Escape') {
        onModalSuccessClose('.error');
      }
    });
  };

  // Экспорт
  window.upload = {
    onModalSuccess: onModalSuccess,
    onModalError: onModalError
  };
})();
