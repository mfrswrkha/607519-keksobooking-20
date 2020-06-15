/* {
  "author": {
      "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
  "offer": {
      "title": строка, заголовок предложения
      "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": число, стоимость
      "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      "rooms": число, количество комнат
      "guests": число, количество гостей, которое можно разместить
      "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      "description": строка с описанием,
      "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },
  "location": {
      "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": случайное число, координата y метки на карте от 130 до 630.
  }
}*/
'use strict';
var offerUserAvatar = 'img/avatars/user';
var offerType = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckIn = ['12:00', '13:00', '14:00'];
var offerCheckOut = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var myMap = document.querySelector('.map');
myMap.classList.remove('map--faded');
var mapWidth = myMap.offsetWidth;

function getRandomValueFromList(list) {
  var index = getRandomInteger(0, list.length - 1);
  return list[index];
}

function getRandomInteger(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomString(length) {
  var alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя ';
  var word = '';
  for (var i = 0; i < length; i++) {
    word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
  }
  return word;
}

function shuffle(source) {
  var result = source.slice(0);
  var temp;
  for (var i = source.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function getRandomValues(source) {
  var temp = shuffle(source);
  var count = getRandomInteger(1, source.length - 1);
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push(temp[i]);
  }
  return result;
}
function createUserOffers(offersCount) {
  var arrayOfOffers = [];
  var arrayElement = {};
  for (var i = 1; i <= offersCount; i++) {
    arrayElement = createRandomDataOffer();
    arrayElement.author.avatar = offerUserAvatar + '0' + i.toString() + '.png';
    arrayOfOffers.push(arrayElement);
  }
  return arrayOfOffers;
}
function createRandomDataOffer() {
  var titleTemp = getRandomString(getRandomInteger(5, 15));
  var priceTemp = Math.round(Math.random() * 100);
  var typeTemp = getRandomValueFromList(offerType);
  var roomsTemp = getRandomInteger(1, 4);
  var guestsTemp = getRandomInteger(2, 9);
  var checkInTemp = getRandomValueFromList(offerCheckIn);
  var checkOutTemp = getRandomValueFromList(offerCheckOut);
  var featuresTemp = getRandomValues(offerFeatures);
  var photosTemp = getRandomValues(offerPhotos);
  var descriptionTemp = getRandomString(getRandomInteger(5, 15));
  var locationX = getRandomInteger(1, mapWidth);
  var locationY = getRandomInteger(130, 629);
  var addressTemp = locationX + ', ' + locationY;
  var randomOffer = {
    author: {
      avatar: 'http://userRandom.png'
    },
    offer: {
      title: titleTemp,
      address: addressTemp,
      price: priceTemp,
      type: typeTemp,
      rooms: roomsTemp,
      guests: guestsTemp,
      checkIn: checkInTemp,
      checkOut: checkOutTemp,
      features: featuresTemp,
      photos: photosTemp,
      description: descriptionTemp
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return randomOffer;
}
function setMapPins(sourceData) {
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var imageOffsetX = Math.round(template.children[0].width / 2);
  var imageOffsetY = Math.round(template.children[0].height);
  for (var i = 0; i < sourceData.length; i++) {
    var element = template.cloneNode(true);
    var childEl = element.children[0];
    var mapAdvert = sourceData[i];
    childEl.src = mapAdvert.author.avatar;
    childEl.alt = mapAdvert.offer.title;
    var x = mapAdvert.location.x - imageOffsetX;
    var y = mapAdvert.location.y - imageOffsetY;
    element.style = 'left: ' + x + 'px; top: ' + y + 'px;';
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
}
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
function setCard(sourceData, index) {
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
  myMap.insertBefore(fragment, mapFilters);
}
var countOfOffers = 8;
var offers = createUserOffers(countOfOffers);
setMapPins(offers);
setCard(offers, 0);
