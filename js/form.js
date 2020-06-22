'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var pinForNewOffer = window.map.mapPins.querySelector('.map__pin--main');
  var pinForNewOfferImg = pinForNewOffer.querySelector('img');
  window.form = {
    fillAdForm: function () {
      var housingRooms = adForm.querySelector('#room_number');
      var housingGuests = adForm.querySelector('#capacity');
      var buttonSubmit = adForm.querySelector('.ad-form__submit');
      buttonSubmit.addEventListener('click', function (evt) {
        if (evt.button === LEFT_BUTTON) {
          if (!validateRoomsGuests(housingRooms, housingGuests)) {
            evt.preventDefault();
          }
        }
      }
      );
      housingRooms.addEventListener('click', function () {
        validateRoomsGuests(housingRooms, housingGuests);
      });
      housingGuests.addEventListener('click', function () {
        validateRoomsGuests(housingRooms, housingGuests);
      });
    },
    setAddressFromPin: function (element, pageStateActive) {
      var imageOffsetX = Math.round(pinForNewOfferImg.width / 2);
      if (pageStateActive) {
        var imageOffsetY = Math.round(pinForNewOfferImg.height);
      } else {
        imageOffsetY = Math.round(pinForNewOfferImg.height / 2);
      }
      var coord = pinForNewOffer.getBoundingClientRect();
      var x = Math.round(coord.x) + imageOffsetX;
      var y = Math.round(coord.y) + imageOffsetY;
      var address = element.querySelector('#address');
      address.value = x.toString() + ', ' + y.toString();
    }
  };
  var guestsForRoomsRules = [
    {rooms: '1', guests: ['1']},
    {rooms: '2', guests: ['1', '2']},
    {rooms: '3', guests: ['1', '2', '3']},
    {rooms: '100', guests: ['0']}
  ];
  var LEFT_BUTTON = 0;
  function setErrorValidateNotification(element, message) {
    var BORDER_ERROR = '3px solid #ff0000';
    element.setCustomValidity(message);
    element.style.border = BORDER_ERROR;
  }
  function setSuccessValidateNotification(element, message) {
    var BORDER_SUCCESS = '1px solid #d9d9d3';
    element.setCustomValidity(message);
    element.style.border = BORDER_SUCCESS;
  }
  function validateRoomsGuests(housingRooms, housingGuests) {
    var currentCountOfRooms = housingRooms.options[housingRooms.selectedIndex].value;
    var currentCountOfGuests = housingGuests.options[housingGuests.selectedIndex].value;
    var count = -1;
    var rulesCount = guestsForRoomsRules.length;
    do {
      count++;
    }
    while ((count < rulesCount) && (guestsForRoomsRules[count].rooms !== currentCountOfRooms));
    if (count === rulesCount) {
      setErrorValidateNotification(housingRooms, 'Правила не определены');
      return false;
    } else if (!guestsForRoomsRules[count].guests.includes(currentCountOfGuests)) {
      setErrorValidateNotification(housingRooms, 'Недопустимо ' + currentCountOfRooms.toString() + ' комнат для  ' + currentCountOfGuests.toString());
      return false;
    }
    setSuccessValidateNotification(housingRooms, '');
    return true;
  }
})();
