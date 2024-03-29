'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards
    .slice()
    .sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var wizard = {
    onEyesChange: window.debounce(function (color) {
      eyesColor = color;
      updateWizards();
    }),
    onCoatChange: window.debounce(function (color) {
      coatColor = color;
      updateWizards();
    })
  };

  var onLoadWizards = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onLoadWizards, window.util.onErrorLoad);

  window.setup = wizard;
})();
