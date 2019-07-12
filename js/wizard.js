'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardItem = window.util.setup.querySelector('.setup-wizard');
  var wizardCoat = wizardItem.querySelector('.wizard-coat');
  var wizardCoatInput = window.util.setup.querySelector('input[name="coat-color"]');
  var wizardEyes = wizardItem.querySelector('.wizard-eyes');
  var wizardEyesInput = window.util.setup.querySelector('input[name="eyes-color"]');
  var wizardFireball = window.util.setup.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input[name="fireball-color"]');

  var arrayIndex = 0;
  var getArrayIndex = function (arr) {
    if (arrayIndex >= arr.length - 1) {
      arrayIndex = 0;
    } else {
      arrayIndex = arrayIndex + 1;
    }
    return arrayIndex;
  };

  var changeCoatColor = function (index) {
    wizardCoat.style.fill = COAT_COLORS[index];
    wizardCoatInput.setAttribute('value', COAT_COLORS[index]);
  };

  wizardCoat.addEventListener('click', function () {
    changeCoatColor(getArrayIndex(COAT_COLORS));
  });

  var changeEyesColor = function (index) {
    wizardEyes.style.fill = EYES_COLORS[index];
    wizardEyesInput.setAttribute('value', EYES_COLORS[index]);
  };

  wizardEyes.addEventListener('click', function () {
    changeEyesColor(getArrayIndex(EYES_COLORS));
  });

  var changeFireballColor = function (index) {
    wizardFireball.style.backgroundColor = FIREBALL_COLORS[index];
    wizardFireballInput.setAttribute('value', FIREBALL_COLORS[index]);
  };

  wizardFireball.addEventListener('click', function () {
    changeFireballColor(getArrayIndex(FIREBALL_COLORS));
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
