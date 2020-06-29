'use strict';
(function () {
  window.xhr = {
    loadData: function (url, onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          if (xhr.readyState === 4) {
            onSuccess(xhr.response);
          }
        }
      }
      );
      xhr.addEventListener('error', function () {
        // eslint-disable-next-line no-console
        console.log('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        // eslint-disable-next-line no-console
        console.log('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; // 10s
      xhr.open('GET', url);
      xhr.send();
    }
  };
})();
