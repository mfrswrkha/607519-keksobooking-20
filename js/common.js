/* eslint-disable no-console */
'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var adFormInputsSelects = adForm.querySelectorAll('input,select');
  var filterFormInputsSelects = filterForm.querySelectorAll('input,select');
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
      console.log(window.main.offers);
      if (window.main.offers.length > 0) {
        console.log('manyOffers', window.map.mapPins);
        removeAttributeForListFields(filterFormInputsSelects, 'disabled');
      }
      window.map.offersMap.classList.remove('map--faded');
      window.form.setAddressFromPin(adForm, true);
      window.form.fillAdForm();
    },
    filterOffers: function (size) {
      function isSomeHouseType(element) {
        if (filterHouseType.value === 'any') {
          return element;
        } else if (filterHouseType.value === element.offer.type) {
          return element;
        }
        return null;
      }
      var filterHouseType = filterForm.querySelector('#housing-type');
      var index = 0;
      var childrenCount = window.map.mapPins.children.length;
      for (var i = 0; i < childrenCount; i++) {
        if (window.map.mapPins.children[index].type === 'button') {
          window.map.mapPins.removeChild(window.map.mapPins.children[index]);
        } else {
          index++;
        }
      }
      var result = window.main.offers.filter(isSomeHouseType);
      switch (result.length) {
        case (result.length > size): {
          var topSizeList = result.slice(0, size);
          window.map.setMapPins(topSizeList);
          break;
        }
        case (result.length === 0): {
          console.log('not found result');
          break; }
        default:
          window.map.setMapPins(result);
      }
    },
    listenFilterHouseType: function (size) {
      var filterHouseType = filterForm.querySelector('#housing-type');
      filterHouseType.addEventListener('click', this.filterOffers(size));
      filterHouseType.addEventListener('change', function () {
        var card = window.map.offersMap.querySelector('article');
        card.remove();
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
