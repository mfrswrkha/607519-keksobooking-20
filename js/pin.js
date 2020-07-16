/* eslint-disable no-console */
'use strict';
(function () {
  var pinForNewOffer = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var LEFT_BUTTON = 0;
  window.pin = {
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
              window.form.setAddressFromPin(adForm, true);
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
      var allPins = window.map.mapPins.querySelectorAll('.map__pin');
      console.log('mappins0', allPins[0]);
      // allPins[0].remove();
      //  offerPins.fi
      // console.log('mappins', allPins);
      // for
      window.map.mapPins.addEventListener('mousedown', function (evt) {
        if (evt.target.parentNode.classList.contains('map__pin--main')) {
          console.log('ne ura!');
        } else if (evt.target.parentNode.classList.contains('map__pin')) {
          var index = window.map.offersMap.indexOf(evt.target.parentNode);
          console.log('i', index);
        }
        // eslint-disable-next-line no-console
        console.log('index-', evt.target.parentNode);
      });
    }
  };
})();
