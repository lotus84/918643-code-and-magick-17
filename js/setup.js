'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
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

var getRandomNumber = function (arr) {
  var randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber > arr.length - 1) {
    randomNumber = arr.length - 1;
  }

  return randomNumber;
};

var getWizardsObject = function () {
  return {
    name: NAMES[getRandomNumber(NAMES)] + ' ' + SURNAMES[getRandomNumber(SURNAMES)],
    coatColor: COAT_COLORS[getRandomNumber(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRandomNumber(EYES_COLORS)]
  };
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push(getWizardsObject());
  }
  return wizards;
};

var wizardsList = getWizards();

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createFragment = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return similarListElement.appendChild(fragment);
};

createFragment(wizardsList);

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
