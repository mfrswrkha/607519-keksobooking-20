'use strict';
(function () {
  var url = 'https://javascript.pages.academy/keksobooking/data';
  var sizeOffersList = 5;
  window.main = {
    sizeOffersList: sizeOffersList,
    runBasicLogic: runBasicLogic,
    offers: []
  };

  window.xhr.loadData(url, runBasicLogic);
  function runBasicLogic(sourceData) {
    window.main.offers = sourceData.slice(0);
    // eslint-disable-next-line no-console
    console.log(window.main.offers);
    window.common.setStateInit();
    window.map.setMapPins(window.main.offers);
    window.pin.listenPinForNewOfferMouse();
    window.pin.listenPinForNewOfferKey();
    window.card.setCard(window.main.offers, 0);
    window.common.filterOffers(sizeOffersList);
    window.pin.listenPinOffer();
    // eslint-disable-next-line no-console
    console.log('startlistenmain');
    window.common.listenFilterHouseType(sizeOffersList);
  }
})();
