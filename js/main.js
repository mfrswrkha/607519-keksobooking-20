'use strict';
(function () {
  var urlForLoad = 'https://javascript.pages.academy/keksobooking/data';
  var urlForUpload = 'https://javascript.pages.academy/keksobooking';
  var sizeOffersList = 5;
  window.main = {
    urlForUpload: urlForUpload,
    sizeOffersList: sizeOffersList,
    runBasicLogic: runBasicLogic,
    offers: []
  };

  window.xhr.loadData(urlForLoad, runBasicLogic);
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
