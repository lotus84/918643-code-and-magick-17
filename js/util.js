'use strict';

(function () {
  var setup = document.querySelector('.setup');

  window.util = {
    setup: setup,
    onErrorLoad: function (message) {
      var div = document.createElement('div');
      div.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      div.style.position = 'absolute';
      div.style.left = 0;
      div.style.right = 0;
      div.style.fontSize = '30px';
      div.textContent = message;
      document.body.insertAdjacentElement('afterbegin', div);
    }
  };
})();
