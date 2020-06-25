'use strict';
(function () {
  // var countOfOffers = 8;
// var offers = window.xhr.loadOffers(); // window.data.createUserOffers(countOfOffers);
// eslint-disable-next-line no-console
// console.log(offers);
  var url = 'https://javascript.pages.academy/keksobooking/data';
  window.xhr.loadData(url, window.map.setMapPins);
  window.common.setStateInit();
  window.pin.listenPinForNewOfferMouse();
  window.pin.listenPinForNewOfferKey();
})();
