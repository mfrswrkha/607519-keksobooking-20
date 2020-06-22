'use strict';
(function () {
  window.card = {
    setCard: function (sourceData, index) {
      var template = document.querySelector('#card').content.querySelector('article');
      var fragment = document.createDocumentFragment();
      var element = template.cloneNode(true);
      var sourceElementOffer = sourceData[index].offer;
      var sourceElementAuthor = sourceData[index].author;
      setCardCommonInfo(element, sourceElementOffer);
      setCardType(element, sourceElementOffer);
      setCardFeatures(element, sourceElementOffer);
      setCardPhotos(element, sourceElementOffer);
      setCardAvatar(element, sourceElementAuthor);
      fragment.appendChild(element);
      var mapFilters = document.querySelector('.map__filters-container');
      window.map.offersMap.insertBefore(fragment, mapFilters);
    }
  };
  function setCardCommonInfo(element, source) {
    var cardTitle = element.querySelector('.popup__title');
    var cardAddress = element.querySelector('.popup__text--address');
    var cardPrice = element.querySelector('.popup__text--price');
    var cardCapacity = element.querySelector('.popup__text--capacity');
    var cardTime = element.querySelector('.popup__text--time');
    var cardDescription = element.querySelector('.popup__description');
    cardTitle.textContent = source.title;
    cardAddress.textContent = source.address;
    cardPrice.textContent = source.price.toString() + ' Р/ночь';
    if (source.rooms === 1) {
      cardCapacity.textContent = source.rooms.toString() + ' комната для ' + source.guests.toString() + ' гостей';
    } else {
      cardCapacity.textContent = source.rooms.toString() + ' комнаты для ' + source.guests.toString() + ' гостей';
    }
    cardTime.textContent = 'Заезд после ' + source.checkIn + ' , выезд до  ' + source.checkOut;
    cardDescription.textContent = source.description;
    return element;
  }
  function setCardType(element, source) {
    var cardType = element.querySelector('.popup__type');
    if (source.type === 'flat') {
      cardType.textContent = 'Квартира';
    } else if (source.type === 'bungalo') {
      cardType.textContent = 'Квартира';
    } else if (source.type === 'house') {
      cardType.textContent = 'Дом';
    } else if (source.type === 'palace') {
      cardType.textContent = 'Дворец';
    } else {
      cardType.textContent = 'Не указано';
    }
    return element;
  }
  function setCardFeatures(element, source) {
    var cardFeatures = element.querySelector('.popup__features');
    cardFeatures.textContent = '';
    for (var i = 0; i < source.features.length; i++) {
      var li = document.createElement('li');
      li.textContent = source.features[i];
      cardFeatures.appendChild(li);
    }
    return element;
  }
  function setCardAvatar(element, source) {
    var cardAvatar = element.querySelector('.popup__avatar');
    cardAvatar.src = source.avatar;
    return element;
  }
  function setCardPhotos(element, source) {
    var cardPhotos = element.querySelector('.popup__photos');
    var img = cardPhotos.querySelector('.popup__photo');
    for (var j = 0; j < source.photos.length; j++) {
      var additionalImg = img.cloneNode(true);
      additionalImg.src = source.photos[j];
      cardPhotos.appendChild(additionalImg);
    }
    cardPhotos.children[0].remove();
    return element;
  }
})();
