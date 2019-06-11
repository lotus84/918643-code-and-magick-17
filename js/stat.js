'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var SHIFT = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var PADDING = 55;
var fontSize = '16px';
var fontFamily = 'PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - SHIFT, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + SHIFT, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, x, y, text) {
  ctx.fillStyle = '#000000';
  ctx.font = fontSize + fontFamily;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  renderText(ctx, CLOUD_X + SHIFT, CLOUD_Y + SHIFT, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + SHIFT, CLOUD_Y + SHIFT * 2, 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + SHIFT) * 3 + GAP + BAR_HEIGHT, BAR_WIDTH, -Math.floor(((BAR_HEIGHT * times[i]) / maxTime)));
    renderText(ctx, CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + SHIFT) * 3 + SHIFT + BAR_HEIGHT, names[i]);
    renderText(ctx, CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * i, ((CLOUD_Y + SHIFT) * 3 + SHIFT + BAR_HEIGHT) - Math.floor(((BAR_HEIGHT * times[i])) / maxTime) - SHIFT - GAP, Math.floor(times[i]));
  }
};
