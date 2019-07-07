'use strict';

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SETUP_LEFT = '50%';
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupCoords;
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (userNameInput !== document.activeElement) {
      closePopup();
      setup.style.top = setupCoords.top + 'px';
      setup.style.left = setupCoords.left;
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
  setupCoords = {
    left: SETUP_LEFT,
    top: setup.getBoundingClientRect().top
  };
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
    setupCoords = {
      left: SETUP_LEFT,
      top: setup.getBoundingClientRect().top
    };
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
  setup.style.top = setupCoords.top + 'px';
  setup.style.left = setupCoords.left;
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
    setup.style.top = setupCoords.top + 'px';
    setup.style.left = setupCoords.left;
  }
});

var dialogHandle = setup.querySelector('.upload');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var wizardItem = setup.querySelector('.setup-wizard');
var wizardCoat = wizardItem.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('input[name="coat-color"]');
var wizardEyes = wizardItem.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('input[name="eyes-color"]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
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
