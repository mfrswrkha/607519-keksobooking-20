'use strict';

(function () {
  window.util = {
    getRandomInteger: function (min, max) {
    // случайное число от min до (max+1)
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    getRandomValueFromList: function (list) {
      var index = window.util.getRandomInteger(0, list.length - 1);
      return list[index];
    },

    getRandomString: function (requiredLength) {
      var alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя ';
      var word = '';
      for (var i = 0; i < requiredLength; i++) {
        word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
      }
      return word;
    },
    getShuffleArrayValues: function (source) {
      var result = source.slice(0);
      var temp;
      for (var i = source.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
      return result;
    },
    getRandomValues: function (source) {
      var temp = window.util.getShuffleArrayValues(source);
      var count = window.util.getRandomInteger(1, source.length - 1);
      var result = [];
      for (var i = 0; i < count; i++) {
        result.push(temp[i]);
      }
      return result;
    }
  };
}
)();
