// 3D landscape utilizing WebGL and Seb Lee-Delisle's code from:
// http://www.sebleedelisle.com/2009/08/3d-landscape-in-html-canvas/

function render() {
  var SC_W = 600;
  var SC_H = 300;
  var RS = 100;
  var PLAYWIDTH = SC_W / RS;
  var PLAYHEIGHT = 50;
  var HALF_WIDTH = SC_W / 2;
  var HALF_HEIGHT = SC_H / 2;
  var fov = 250;
  var screenLeft = 0.0;
  var screenTop  = -10.0;
  var screenFront = 0.0;
  var canvas = document.getElementById('Canvas2D');
  var c = canvas.getContext('2d');

  function convert3Dto2D(x3d, y3d, z3d) {
    var scale = fov / (fov + z3d);
    var x2d = ((x3d - HALF_WIDTH) * scale) + HALF_WIDTH;
    var y2d = ((y3d - HALF_HEIGHT) * scale) + HALF_HEIGHT - (z3d * 0.01);
    return [x2d, y2d];
  }

  function noise(x, y) {
    return (Math.sin(y * 0.2) + Math.sin((x + (y * 0.6)) * 0.2)) * 4;
  }

  function drawLand() {
    c.fillStyle = "rgb(0, 0, 0)";
    c.fillRect(0, 0, SC_W, SC_H);
    screenFront += 1;
    screenLeft += 1;
    c.lineWidth = 0.5;
    var slicecount = SC_W / RS;
    var leftshift = (screenLeft % 1) * RS;
    var frontshift = (screenFront % 1) * RS;
    var p2d = [0, 0];
    for (var slicez = 100; slicez >= 10; slicez--) {
      c.beginPath();
      var firstpoint = true; // to ensure we only move to first point
      var edgewidth = slicez * 1.22; // rudimentary frustum culling
      var zpos = (slicez * RS) - frontshift;
      var slicevisible = false;

      // Make color fade with distance:
      if (Math.abs(zpos) < 100) linecol = 0xff;
      else if (zpos > 7000) linecol = ((10000 - zpos) / 3000) * 0xff;
      else linecol = 0xff;
      c.strokeStyle = "rgb(0, " + linecol + ", 0)";

      for(var slicex = -edgewidth;
          slicex <= slicecount + edgewidth;
          slicex++) {
        var h = noise(slicex + screenLeft, screenFront + slicez);
        var xpos = (slicex * RS) - leftshift;
        var ypos = (h - screenTop) * RS;
        p2d = convert3Dto2D(xpos, ypos, zpos);
        if (p2d[1] > SC_H) p2d[1] = SC_H;
        else if (p2d[1] < 0) p2d[1] = 0;
        else slicevisible = true;
        if (firstpoint) {
          c.moveTo(p2d[0], p2d[1]);
          firstpoint = false;
        } else {
          c.lineTo(p2d[0], p2d[1]);
        }
      }
      if(slicevisible) c.stroke();
    }
  }

  var loop = setInterval(function() { drawLand(); }, 50);
  //drawLand();
}
