'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_COUNT = 4;

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
      coatColor: window.util.COAT_COLORS[getRandomNumber(window.util.COAT_COLORS)],
      eyesColor: window.util.EYES_COLORS[getRandomNumber(window.util.EYES_COLORS)]
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
})();
