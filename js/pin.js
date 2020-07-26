/* eslint-disable no-console */
'use strict';
(function () {
  var pinForNewOffer = document.querySelector('.map__pin--main');
  var pinForNewOfferDefault = {
    styleTop: pinForNewOffer.style.top,
    styleLeft: pinForNewOffer.style.left
  };
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');
  var LEFT_BUTTON = 0;
  window.pin = {
    pinForNewOffer: pinForNewOffer,
    pinForNewOfferDefault: pinForNewOfferDefault,
    defaultLocationPin: document.querySelector('.map__pin--main'),
    listenPinForNewOfferMouse: function () {
      pinForNewOffer.addEventListener('mousedown', function (evt) {
        if (evt.button === LEFT_BUTTON) {
          if (adForm.classList.contains('ad-form--disabled')) {
            window.common.setStateActive();
          } else {
            evt.preventDefault();

            var startCoords = {
              x: evt.clientX,
              y: evt.clientY
            };
            var onMouseMove = function (moveEvt) {
              moveEvt.preventDefault();

              var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
              };

              startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
              };

              pinForNewOffer.style.top = (pinForNewOffer.offsetTop - shift.y) + 'px';
              pinForNewOffer.style.left = (pinForNewOffer.offsetLeft - shift.x) + 'px';
              address.value = (pinForNewOffer.offsetLeft - shift.x).toString() + ', ' + (pinForNewOffer.offsetTop - shift.y).toString();
            };

            var onMouseUp = function (upEvt) {
              upEvt.preventDefault();

              pinForNewOffer.removeEventListener('mousemove', onMouseMove);
              pinForNewOffer.removeEventListener('mouseup', onMouseUp);
            };

            pinForNewOffer.addEventListener('mousemove', onMouseMove);
            pinForNewOffer.addEventListener('mouseup', onMouseUp);
          }
        }
      });
    },
    listenPinForNewOfferKey: function () {
      pinForNewOffer.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.common.setStateActive();
        }
      });
    },
    listenPinOffer: function () {
      window.map.mapPins.addEventListener('mousedown', function (evt) {
        var currentActivePin = document.querySelector('.map__pin--active');
        if (evt.target.parentNode.classList.contains('map__pin--main')) {
          if (currentActivePin !== null) {
            currentActivePin.classList.remove('map__pin--active');
          }
        } else if (evt.target.parentNode.classList.contains('map__pin')) {
          var offerId = evt.target.parentNode.getAttribute('sourceData');
          var card = window.map.offersMap.querySelector('article');
          if (currentActivePin !== null) {
            currentActivePin.classList.remove('map__pin--active');
          }
          evt.target.parentNode.classList.add('map__pin--active');
          if (card !== null) {
            card.remove();
          }
          window.card.setCard(window.main.offers, offerId);


        }
      });
    }
  };
})();
