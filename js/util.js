'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  window.util = {
    setup: setup,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };
})();
