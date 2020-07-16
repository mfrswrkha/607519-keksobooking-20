'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var pinForNewOffer = window.map.mapPins.querySelector('.map__pin--main');
  var pinForNewOfferImg = pinForNewOffer.querySelector('img');
  var guestsForRoomsRules = [
    {rooms: '1', guests: ['1']},
    {rooms: '2', guests: ['1', '2']},
    {rooms: '3', guests: ['1', '2', '3']},
    {rooms: '100', guests: ['0']}
  ];
  var priceForTypePlaceRules = [
    {type: 'bungalo', minPrice: 0},
    {type: 'flat', minPrice: 1000},
    {type: 'house', minPrice: 5000},
    {type: 'palace', minPrice: 10000}
  ];
  var LEFT_BUTTON = 0;
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var DEFAULT_MIN_PRICE = 0;
  var DEFAULT_MAX_PRICE = 1000000;
  window.form = {
    fillAdForm: function () {
      var housingRooms = adForm.querySelector('#room_number');
      var housingGuests = adForm.querySelector('#capacity');
      var title = adForm.querySelector('#title');
      var price = adForm.querySelector('#price');
      var timein = adForm.querySelector('#timein');
      var timeout = adForm.querySelector('#timeout');
      var typePlace = adForm.querySelector('#type');

      var buttonSubmit = adForm.querySelector('.ad-form__submit');
      setLimitsForInput(title, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, true, null);
      setValidateTypePlacePrice(typePlace, price);
      buttonSubmit.addEventListener('click', function (evt) {
        if (evt.button === LEFT_BUTTON) {
          if (!validateRoomsGuests(housingRooms, housingGuests)) {
            evt.preventDefault();
          }
        }
      }
      );
      // title.addEventListener('input', function () {
      //      validateTitle(title);
      //  });
      typePlace.addEventListener('change', function () {
        setValidateTypePlacePrice(typePlace, price);
      });
      housingRooms.addEventListener('click', function () {
        validateRoomsGuests(housingRooms, housingGuests);
      });
      housingGuests.addEventListener('click', function () {
        validateRoomsGuests(housingRooms, housingGuests);
      });
      timein.addEventListener('change', function () {
        setSyncroValuesTimeinTimeout(timein, timeout);
      });
      timeout.addEventListener('change', function () {
        setSyncroValuesTimeinTimeout(timeout, timein);
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
  function setLimitsForInput(input, minSize, maxSize, required, placeholderText) {
    var inputType = input.getAttribute('type');
    if (inputType === 'number') {
      input.setAttribute('min', minSize);
      input.setAttribute('max', maxSize);
    } else if (inputType === 'text') {
      input.setAttribute('minlength', minSize);
      input.setAttribute('maxlength', maxSize);
    }
    if (required) {
      input.setAttribute('required', null);
    }
    if (placeholderText !== null) {
      input.setAttribute('placeholder', placeholderText);
    }
  }
  /*
  function validateTitle(title) {
    var TITLE_MIN_LENGTH = 30;
    var TITLE_MAX_LENGTH = 100;
    if (title.value.length < TITLE_MIN_LENGTH) {
      setErrorValidateNotification(title, 'Минимальное количество символов: ' + TITLE_MIN_LENGTH);
    } else if (title.value.length <= TITLE_MAX_LENGTH) {
      setSuccessValidateNotification(title, 'Максимальное количество символов: ' + TITLE_MAX_LENGTH);
    } else if (title.value.length > TITLE_MAX_LENGTH) {
      setErrorValidateNotification(title, 'Максимальное количество символов: ' + TITLE_MAX_LENGTH);
    }
  }*/
  function setValidateTypePlacePrice(typePlace, price) {
    var currentTypePlace = typePlace.options[typePlace.selectedIndex].value;
    var count = -1;
    var rulesCount = priceForTypePlaceRules.length;
    do {
      count++;
    }
    while ((count < rulesCount) && (priceForTypePlaceRules[count].type !== currentTypePlace));
    if (count === rulesCount) {
      setLimitsForInput(price, DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE, true, DEFAULT_MIN_PRICE.toString());
    } else {
      setLimitsForInput(price, priceForTypePlaceRules[count].minPrice, DEFAULT_MAX_PRICE, true, priceForTypePlaceRules[count].minPrice.toString());
    }
  }
  function setSyncroValuesTimeinTimeout(source, destination) {
    destination.value = source.options[source.selectedIndex].value;
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
