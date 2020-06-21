'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  window.common = {
    setStateInit: function () {
      adForm.classList.add('ad-form--disabled');
      setAttributeForListFields(adFormInputs, 'disabled', '');
      setAttributeForListFields(adFormSelects, 'disabled', '');
      window.form.setAddressFromPin(adForm, false);
    },
    setStateActive: function () {
      adForm.classList.remove('ad-form--disabled');
      removeAttributeForListFields(adFormInputs, 'disabled');
      removeAttributeForListFields(adFormSelects, 'disabled');
      window.map.offersMap.classList.remove('map--faded');
      window.form.setAddressFromPin(adForm, true);
      window.form.fillAdForm();
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
