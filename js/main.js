'use strict';
(function () {
  // var countOfOffers = 8;
// var offers = window.xhr.loadOffers(); // window.data.createUserOffers(countOfOffers);
// eslint-disable-next-line no-console
// console.log(offers);
  var url = 'https://javascript.pages.academy/keksobooking/data';
  var result = '';
  var onError = function (message) {
    result = message;
  };

  var onSuccess = function (data) {
    result = data;
  };
  // window.map.setMapPins();
  // window.card.setCard(offers, 0);
  window.xhr.loadOffers(url, onSuccess, onError);
  console.log(result);
  window.common.setStateInit();
  window.pin.listenPinForNewOfferMouse();
  window.pin.listenPinForNewOfferKey();
})();
