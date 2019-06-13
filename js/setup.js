'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomNumber = function (arr) {
  var randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber > arr.length - 1) {
    randomNumber = arr.length - 1;
  }

  return randomNumber;
};

var setWizardsName = function (arrName, arrSurname) {
  var wizardsNames = [];
  for (var i = 0; i < 4; i++) {
    var name = arrName[getRandomNumber(arrName)];
    var surname = arrSurname[getRandomNumber(arrSurname)];
    wizardsNames[i] = name + ' ' + surname;
  }
  return wizardsNames;
};

var getWizards = function (arrName, arrSurname, arrCoatColors, arrEyesColors) {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    var wizardObject = {};
    var name = setWizardsName(arrName, arrSurname)[i];
    var coatColor = arrCoatColors[getRandomNumber(arrCoatColors)];
    var eyesColor = arrEyesColors[getRandomNumber(arrEyesColors)];
    wizardObject.name = name;
    wizardObject.coatColor = coatColor;
    wizardObject.eyesColor = eyesColor;
    wizards.push(wizardObject);
  }

  return wizards;
};

var wizardsList = getWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

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
