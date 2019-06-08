'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - 20, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 20, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, fontSize, fontFamily, x, y, text, color) {
  ctx.fillStyle = color;
  ctx.font = fontSize + fontFamily;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');
  renderText(ctx, '16px', 'PT Mono', 120, 30, 'Ура вы победили!', '#000000');
  renderText(ctx, '16px', 'PT Mono', 120, 50, 'Список результатов:', '#000000');
};
