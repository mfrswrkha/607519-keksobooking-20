'use strict';
var countOfOffers = 8;
var offers = window.data.createUserOffers(countOfOffers);
// eslint-disable-next-line no-console
console.log(offers);
window.map.setMapPins(offers);
window.card.setCard(offers, 0);
window.common.setStateInit();
window.pin.listenPinForNewOfferMouse();
window.pin.listenPinForNewOfferKey();

