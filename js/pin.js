'use strict';
(function () {
  var pinForNewOffer = document.querySelector('.map__pin--main');
  window.pin = {
    listenPinForNewOfferMouse: function () {
      pinForNewOffer.addEventListener('mousedown', function (evt) {
        if (evt.button === 0) {
          window.common.setStateActive();
        }
      });
    },
    listenPinForNewOfferKey: function () {
      pinForNewOffer.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.common.setStateActive();
        }
      });
    }
  };
})();
