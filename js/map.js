'use strict';
(function () {
  window.map = {
    mapPins: document.querySelector('.map__pins'),
    setMapPins: function (sourceData) {
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
        element.setAttribute('sourceData', i);
        fragment.appendChild(element);
      }
      window.map.mapPins.appendChild(fragment);
    },
    setMapPin: function (sourceData, sourceKey) {
      var template = document.querySelector('#pin').content.querySelector('button');
      var fragment = document.createDocumentFragment();
      var imageOffsetX = Math.round(template.children[0].width / 2);
      var imageOffsetY = Math.round(template.children[0].height);
      var element = template.cloneNode(true);
      var childEl = element.children[0];
      var mapAdvert = sourceData;
      childEl.src = mapAdvert.author.avatar;
      childEl.alt = mapAdvert.offer.title;
      var x = mapAdvert.location.x - imageOffsetX;
      var y = mapAdvert.location.y - imageOffsetY;
      element.style = 'left: ' + x + 'px; top: ' + y + 'px;';
      element.setAttribute('sourceData', sourceKey);
      fragment.appendChild(element);

      window.map.mapPins.appendChild(fragment);
    },
    removeMapPins: function () {
      var index = 0;
      var childrenCount = window.map.mapPins.children.length;
      for (var i = 0; i < childrenCount; i++) {
        if (window.map.mapPins.children[index].type === 'button') {
          window.map.mapPins.removeChild(window.map.mapPins.children[index]);
        } else {
          index++;
        }
      }
    },
    offersMap: document.querySelector('.map')
  };
})();
