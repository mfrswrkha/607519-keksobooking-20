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
    window.common.setStateInit();
    window.pin.listenPinForNewOfferMouse();
    window.pin.listenPinForNewOfferKey();
  }
})();
