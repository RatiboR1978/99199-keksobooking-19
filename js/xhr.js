'use strict';
/*
 Модуль работы с сервером
*/

(function () {
  var TIMEOUT = 10000;
  var STATUS_CODE_DONE = 200;
  var DATA_TYPE = 'json';
  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking/'
  };

  var createXhr = function (method, url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;

    // Устанавливаем (ограничиваем) тип получаемых данных
    if (method === 'GET') {
      xhr.responseType = DATA_TYPE;
    }

    // Обработка ошибок
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_DONE) {
        onSuccess(xhr.response);
      } else {
        onError('Номер ошибки: ' + xhr.status + '.');
      }
    });

    // Ошибка "задержки"
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });

    // Ошибка соединения
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения ' + xhr.status + '.');
    });

    // Открытие запроса
    xhr.open(method, url);

    // Отправка запроса
    xhr.send(data || null);
  };

  // Функции GET и POST запросов
  var load = function (onSuccess, onError) {
    createXhr('GET', ServerUrl.LOAD, '', onSuccess, onError);
  };

  var upload = function (data, onSuccess, onError) {
    createXhr('POST', ServerUrl.UPLOAD, data, onSuccess, onError);
  };

  // Экспорт
  window.xhr = {
    load: load,
    upload: upload
  };
})();
