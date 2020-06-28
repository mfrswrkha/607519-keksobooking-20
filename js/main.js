'use strict';
var countOfOffers = 8;
var offers = window.data.createUserOffers(countOfOffers);
window.map.setMapPins(offers);
window.card.setCard(offers, 0);
window.common.setStateInit();
window.pin.listenPinForNewOfferMouse();
window.pin.listenPinForNewOfferKey();

