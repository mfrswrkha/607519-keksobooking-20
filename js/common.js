/* eslint-disable no-console */
'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var adFormInputsSelects = adForm.querySelectorAll('input,select');
  var address = adForm.querySelector('#address');
  var filterFormInputsSelects = filterForm.querySelectorAll('input,select');
  var filterHouseType = filterForm.querySelector('#housing-type');
  var filterHousingPrice = filterForm.querySelector('#housing-price');
  var filterHousingRooms = filterForm.querySelector('#housing-rooms');
  var filterHousingGuests = filterForm.querySelector('#housing-guests');
  var filterHouseFeatures = filterForm.querySelector('#housing-features');
  var filterHouseFeaturesList = filterForm.querySelector('#housing-features').querySelectorAll('input');

  window.common = {
    setStateInit: function () {
      adForm.classList.add('ad-form--disabled');
      setAttributeForListFields(adFormInputsSelects, 'disabled', 'disabled');
      setAttributeForListFields(filterFormInputsSelects, 'disabled', 'disabled');
      window.form.setAddressFromPin(adForm, false);
    },
    setStateActive: function () {
      adForm.classList.remove('ad-form--disabled');
      removeAttributeForListFields(adFormInputsSelects, 'disabled');

      if (window.main.offers.length > 0) {
        removeAttributeForListFields(filterFormInputsSelects, 'disabled');
        window.map.setMapPins(window.main.offers);
        window.common.filterOffers(window.main.sizeOffersList);
        window.pin.listenPinOffer();
        window.common.listenFilterHouse(window.main.sizeOffersList);
      }
      window.map.offersMap.classList.remove('map--faded');
      window.form.setAddressFromPin(adForm, true);
      address.setAttribute('disabled', 'disabled');
      window.form.fillAdForm();
      // window.common.listenFilterHouseType(window.main.sizeOffersList);
    },
    filterOffers: function (size) {
      var count = 0;
      var filteredOfferCount = 0;
      var childrenCount = window.map.mapPins.children.length;
      for (var i = 0; i < childrenCount; i++) {
        if (window.map.mapPins.children[count].type === 'button') {
          window.map.mapPins.removeChild(window.map.mapPins.children[count]);
        } else {
          count++;
        }
      }
      window.main.offers.forEach(function (item, index) {
        if (window.form.validateFilterHouseFeatures(filterHouseFeaturesList, item.offer.features)) {
          if ((filterHouseType.value === 'any') | (filterHouseType.value === item.offer.type)) {
            if ((filterHousingRooms.value === 'any') | (filterHousingRooms.value === item.offer.rooms.toString())) {
              if ((filterHousingGuests.value === 'any') | (filterHousingGuests.value === item.offer.guests.toString())) {
                if (filterHousingPrice.value === 'any') {
                  if (filteredOfferCount < size) {
                    window.map.setMapPin(item, index);
                    filteredOfferCount++;
                  }
                } else {
                  if (window.form.validateFilterHousingPrice(filterHousingPrice.options[filterHousingPrice.selectedIndex].value, item.offer.price)) {
                    if (filteredOfferCount < size) {
                      window.map.setMapPin(item, index);
                      filteredOfferCount++;
                    }
                  }
                }

              }
            }
          }
        }
      }

      );

    },

    setStateReset: function () {
      window.pin.pinForNewOffer.style.left = window.pin.pinForNewOfferDefault.styleLeft;
      window.pin.pinForNewOffer.style.top = window.pin.pinForNewOfferDefault.styleTop;
      window.map.removeMapPins();
      window.form.adForm.reset();
      window.form.filterForm.reset();
      window.card.removeCard();
    },
    listenFilterHouse: function (size) {
      filterHouseType.addEventListener('change', function () {
        window.common.filterOffers(size);
        window.card.removeCard();
      });
      filterHousingPrice.addEventListener('change', function () {
        window.common.filterOffers(size);
        window.card.removeCard();
      });
      filterHousingRooms.addEventListener('change', function () {
        window.common.filterOffers(size);
        window.card.removeCard();
      });
      filterHousingGuests.addEventListener('change', function () {
        window.common.filterOffers(size);
        window.card.removeCard();
      });
      filterHouseFeatures.addEventListener('click', function () {
        window.common.filterOffers(size);
        window.card.removeCard();
      });
    },
    onSuccessSendData: function () {
      var template = document.querySelector('#success').content.querySelector('.success');
      var fragment = document.createDocumentFragment();
      var mainBlock = document.querySelector('main');
      var element = template.cloneNode(true);
      window.common.setStateReset();
      window.common.setStateInit();
      fragment.appendChild(element);
      mainBlock.appendChild(fragment);
      var successMessage = mainBlock.querySelector('.success');
      successMessage.addEventListener('click', function () {
        successMessage.remove();
      });
      successMessage.addEventListener('keydown', function (evt) {
        if (evt.key === 'Esc') {
          successMessage.remove();
        }
      });
    },
    onErrorSendData: function () {
      var template = document.querySelector('#error').content.querySelector('.error');
      var fragment = document.createDocumentFragment();
      var mainBlock = document.querySelector('main');
      var element = template.cloneNode(true);
      window.common.setStateReset();
      window.common.setStateInit();
      fragment.appendChild(element);
      mainBlock.appendChild(fragment);
      var errorMessage = mainBlock.querySelector('.error');
      errorMessage.addEventListener('click', function () {
        errorMessage.remove();
      });
      errorMessage.addEventListener('keydown', function (evt) {
        if (evt.key === 'Esc') {
          errorMessage.remove();
        }
      });
    }

  };
  function setAttributeForListFields(element, attribute, value) {
    for (var i = 0; i < element.length; i++) {
      element[i].setAttribute(attribute, value);
    }
    return element;
  }
  function removeAttributeForListFields(element, attribute) {
    for (var i = 0; i < element.length; i++) {
      element[i].removeAttribute(attribute);
    }
    return element;
  }
})();
