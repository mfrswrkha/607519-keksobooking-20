'use strict';
(function () {
  var offerUserAvatar = 'img/avatars/user';
  var offerType = ['palace', 'flat', 'house', 'bungalo'];
  var offerCheckIn = ['12:00', '13:00', '14:00'];
  var offerCheckOut = ['12:00', '13:00', '14:00'];
  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var myMap = document.querySelector('.map');
  var mapWidth = myMap.offsetWidth;
  function createRandomDataOffer() {
    var titleTemp = window.util.getRandomString(window.util.getRandomInteger(5, 15));
    var priceTemp = Math.round(Math.random() * 100);
    var typeTemp = window.util.getRandomValueFromList(offerType);
    var roomsTemp = window.util.getRandomInteger(1, 4);
    var guestsTemp = window.util.getRandomInteger(2, 9);
    var checkInTemp = window.util.getRandomValueFromList(offerCheckIn);
    var checkOutTemp = window.util.getRandomValueFromList(offerCheckOut);
    var featuresTemp = window.util.getRandomValues(offerFeatures);
    var photosTemp = window.util.getRandomValues(offerPhotos);
    var descriptionTemp = window.util.getRandomString(window.util.getRandomInteger(5, 15));
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
  window.data = {
    createUserOffers: function (offersCount) {
      var arrayOfOffers = [];
      var arrayElement = {};
      for (var i = 1; i <= offersCount; i++) {
        arrayElement = createRandomDataOffer();
        arrayElement.author.avatar = offerUserAvatar + '0' + i.toString() + '.png';
        arrayOfOffers.push(arrayElement);
      }
      return arrayOfOffers;
    }
  };
}
)();
