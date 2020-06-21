'use strict';
( function () {
window.data = {
offerUserAvatar: 'img/avatars/user',
offerType: ['palace', 'flat', 'house', 'bungalo'],
offerCheckIn: ['12:00', '13:00', '14:00'],
offerCheckOut : ['12:00', '13:00', '14:00'],
offerFeatures: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
offerPhotos : ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
createRandomDataOffer : function () {
  var titleTemp = window.util.getRandomString(window.util.getRandomInteger(5, 15));
  var priceTemp = Math.round(Math.random() * 100);
  var typeTemp = window.util.getRandomValueFromList(offerType);
  var roomsTemp = window.util.getRandomInteger(1, 4);
  var guestsTemp = window.util.getRandomInteger(2, 9);
  var checkInTemp = window.util.getRandomValueFromList(offerCheckIn);
  var checkOutTemp = window.util.getRandomValueFromList(offerCheckOut);
  var featuresTemp = window.util.getRandomValues(offerFeatures);
  var photosTemp = window.util.getRandomValues(offerPhotos);
  var descriptionTemp = window.util.getRandomString(getRandomInteger(5, 15));
  var locationX = window.util.getRandomInteger(1, mapWidth);
  var locationY = window.util.getRandomInteger(130, 629);
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
}
}
)();
