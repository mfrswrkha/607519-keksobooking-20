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
var OfferType = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckIn = ['12:00', '13:00', '14:00'];
var offerCheckOut = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var myMap = document.querySelector('.map');
myMap.classList.remove('map--faded');
var mapWidth = myMap.offsetWidth;

function getRandomValueList(list) {
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

function getRandomValues(source) {
  var result = [];
  var index = -1;
  var repeat = 0;
  var count = getRandomInteger(1, source.length - 1);
  // eslint-disable-next-line no-console
  // console.log(count);
  for (var i = 0; i < count; i++) {
    index = getRandomInteger(0, source.length - 1);
    repeat = 0;
    for (var j = 0; j < source.length; j++) {
      if (source[index] === result[j]) {
        repeat += 1;
      }
    }
    if (repeat === 0) {
      result.push(source[index]);
    }
  }
  // eslint-disable-next-line no-console
  // console.log(result);
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
  var typeTemp = getRandomValueList(OfferType);
  var roomsTemp = getRandomInteger(1, 4);
  var guestsTemp = getRandomInteger(2, 9);
  var checkInTemp = getRandomValueList(offerCheckIn);
  var checkOutTemp = getRandomValueList(offerCheckOut);
  var featuresTemp = getRandomValues(offerFeatures);
  var photosTemp = getRandomValues(offerPhotos);
  var descriptionTemp = getRandomString(getRandomInteger(5, 15));
  var locationX = getRandomInteger(1, mapWidth);
  var locationY = getRandomInteger(130, 629);
  var addressTemp = locationX + ', ' + locationY;
  var RandomOffer = {
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
  return RandomOffer;
}
function setMapPins(sourceData) {
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var x = 0;
  var y = 0;
  for (var i = 0; i < sourceData.length; i++) {
    var element = template.cloneNode(true);
    var childEl = element.children[0];
    childEl.src = sourceData[i].author.avatar;
    childEl.alt = sourceData[i].offer.title;
    x = sourceData[i].location.x - Math.round(childEl.width / 2);
    y = sourceData[i].location.y - Math.round(childEl.height / 2);
    element.style = 'left: ' + x + 'px; top: ' + y + 'px;';
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
  // eslint-disable-next-line no-console
  // console.log(element.children[0]);
  // eslint-disable-next-line no-console
  // console.log(childEl);
  // eslint-disable-next-line no-console
  // console.log(mapPins);
}
var myCount = 8;
var myArray = createUserOffers(myCount);
// eslint-disable-next-line no-console
console.log(myArray);

// eslint-disable-next-line no-console
// console.log(mapWidth);
setMapPins(myArray);
