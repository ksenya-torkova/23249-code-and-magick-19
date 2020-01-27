'use strict';

var USER_NAME = 'Вы';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CLOUD_TEXT = 'Ура вы победили! Список результатов:';
var CLOUD_TEXT_MAX_WIDTH = 200;
var CLOUD_TEXT_LINE_HEIGHT = 20;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_X = CLOUD_X + BAR_WIDTH;
var BAR_MAX_Y = 90;
var TEXT_Y = 25;
var BAR_NAMES_GAP = 15;
var BAR_TIMES_GAP = 25;
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var drawText = function wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight) {
  ctx.font = 'PT Mono, 16px';
  ctx.fillStyle = 'Blue';
  ctx.textBaseline = 'top';

  var words = text.split(' ');
  var countWords = words.length;
  var line = '';

  for (var j = 0; j < countWords; j++) {
    var testLine = line + words[j] + ' ';
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, marginLeft, marginTop);
      line = words[j] + ' ';
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, marginLeft, marginTop);
};

var drawRect = function (ctx, x, y, width, height, color) {
  var rectColor = color || 'black';
  ctx.fillStyle = rectColor;
  ctx.fillRect(x, y, width, height);
};

var getGradientColor = function (ctx) {
  var gradientColor = ctx.createRadialGradient(300, 135, 0, 300, 135, 200);
  gradientColor.addColorStop(0, 'azure');
  gradientColor.addColorStop(1, 'dodgerblue');
  return gradientColor;
};

var getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
};

var getBarColor = function () {
  var randomOpacity = (Math.random().toFixed(1) * 10) / 10;
  return randomOpacity === 0
    ? 'hsla(240, 100%, 50%, ' + 0.1 + ')'
    : 'hsla(240, 100%, 50%, ' + randomOpacity + ')';
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxOfArray(times).toFixed(0);

  drawRect(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, getGradientColor(ctx));
  drawText(ctx, CLOUD_TEXT, BAR_X, TEXT_Y, CLOUD_TEXT_MAX_WIDTH, CLOUD_TEXT_LINE_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    var barHeight = ((BAR_MAX_HEIGHT * times[i]) / maxTime).toFixed(0);
    var barMaxY = BAR_MAX_HEIGHT - barHeight;

    drawText(ctx, names[i], BAR_X + i * (BAR_WIDTH + BAR_GAP), BAR_MAX_HEIGHT + BAR_NAMES_GAP + BAR_MAX_Y);
    drawText(ctx, times[i].toFixed(0), BAR_X + i * (BAR_WIDTH + BAR_GAP), BAR_MAX_Y + barMaxY - BAR_TIMES_GAP);

    var barColor = (names[i] === USER_NAME) ? COLOR_RED : getBarColor();
    drawRect(ctx, BAR_X + i * (BAR_WIDTH + BAR_GAP), BAR_MAX_Y + barMaxY, BAR_WIDTH, barHeight, barColor);
  }
};
