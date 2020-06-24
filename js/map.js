'use strict';
(function () {
  window.map = {
    mapPins: document.querySelector('.map__pins'),
    setMapPins: function (sourceData) {
     // var sourceData = window.xhr.loadOffers();
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
      window.map.mapPins.appendChild(fragment);
    },
    offersMap: document.querySelector('.map')
  };
})();
