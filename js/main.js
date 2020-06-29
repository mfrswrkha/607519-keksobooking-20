'use strict';
(function () {
  var url = 'https://javascript.pages.academy/keksobooking/data';
  window.xhr.loadData(url, window.map.setMapPins);
  window.common.setStateInit();
  window.pin.listenPinForNewOfferMouse();
  window.pin.listenPinForNewOfferKey();
})();
