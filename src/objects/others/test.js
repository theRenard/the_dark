export default function drawStar (graphics, cx, cy, spikes, outerRadius, innerRadius, color, lineColor) {
  var rot = Math.PI / 2 * 3;
  var x = cx;
  var y = cy;
  var step = Math.PI / spikes;
  graphics.lineStyle(10, lineColor, 1.0);
  graphics.fillStyle(color, 1.0);
  graphics.beginPath();
  graphics.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      graphics.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      graphics.lineTo(x, y);
      rot += step;
  }
  graphics.lineTo(cx, cy - outerRadius);
  graphics.closePath();
  graphics.fillPath();
  graphics.strokePath();
}
