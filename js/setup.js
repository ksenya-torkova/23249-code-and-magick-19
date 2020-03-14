'use strict';

var HEROES_AMOUNT = 4;

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var createHero = function () {
  var hero = {
    names:
      Math.random() >= 0.5 ?
        NAMES[getRandomInteger(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomInteger(0, SURNAMES.length - 1)] :
        SURNAMES[getRandomInteger(0, NAMES.length - 1)] + ' ' + NAMES[getRandomInteger(0, SURNAMES.length - 1)],
    coatColor: COAT_COLORS[getRandomInteger(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandomInteger(0, EYES_COLORS.length - 1)]
  };

  return hero;
};

var similarHeroTemplate = document.querySelector('#similar-wizard-template').content;
var similarHeroItem = similarHeroTemplate.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getTemplateOfHero = function (heroItem) {
  var heroTemplate = similarHeroItem.cloneNode(true);
  heroTemplate.querySelector('.setup-similar-label').textContent = heroItem.names;
  heroTemplate.querySelector('.wizard-coat').style.fill = heroItem.coatColor;
  heroTemplate.querySelector('.wizard-eyes').style.fill = heroItem.eyesColor;
  fragment.appendChild(heroTemplate);
};

var addHeroesToMarkup = function () {
  for (var i = 0; i < HEROES_AMOUNT; i++) {
    getTemplateOfHero(createHero());
  }

  var setupSimilarList = document.querySelector('.setup-similar-list');
  setupSimilarList.appendChild(fragment);
};

addHeroesToMarkup();

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
