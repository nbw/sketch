import OPZ from "opzjs";
import Midi from "./midi";
import Brush from "./brush";
import ColorPicker from "./color_picker";

// Canvas
let started  = false;
const canvas  = document.getElementById('canvas');
const scratch = document.createElement('canvas');
const ctxM = canvas.getContext('2d'); // Main
const ctxS = scratch.getContext('2d'); // Scratch
const width = Math.floor(document.getElementById("canvas").offsetWidth);
const height = 500;
const color = new ColorPicker("keyboard");
const brush = new Brush(width/2, 3*height/4);
let lineWidth = 3;

// Midi
const midi = new Midi();


// Inits
midi.setup();
color.init();
color.pick(3);

const setupCanvas = (c, w, h) => {
  c.width = w;
  c.height = h;
}

setupCanvas(canvas, width, height);
setupCanvas(scratch, width, height);

const handler = (event) => {
  const data = OPZ.decode(event.data);

  if (
    data.action === "keys" &&
    data.velocity > 0
  ) {
    const key = (data.value.value - 53)%24;
    color.pick(key);
  }

  if (data.action === "dial") {
    switch(data.value.dialColor) {
      case "green":
        brush.setX(data.velocity*width/127);
        rotateKnob("left", 1620*data.velocity/128);
        break;
      case "blue":
        lineWidth = Math.max(data.velocity, 1);
        break;
      case "yellow":
        if (data.velocity >= 127) {
          clearCanvas(ctxS, canvas);
        }
        break;
      case "red":
        brush.setY(data.velocity*height/127);
        rotateKnob("right", 1620*data.velocity/128);
        break;
      default:
        return;
    }
  }
};

const midiConnect = (e) => {
  midi.setup();
  setTimeout( () => {
    if (midi.devices.length > 0) {
      for (let deviceId in midi.devices) {
        midi.selectDevice(deviceId, handler);
      }
      const menu = document.getElementById("menu");
      menu.classList.add("hide");
    } else {
      const error = document.getElementById("connect-error")
      error.innerHTML = "Couldn't detect any midi devices (check browser support)";
    }
  }, 200);
}

const rotateKnob = (knobClass, deg) => {
  const div = document.querySelector(`.${knobClass} div`);
  div.style.webkitTransform = 'rotate('+deg+'deg)';
  div.style.mozTransform    = 'rotate('+deg+'deg)';
  div.style.msTransform     = 'rotate('+deg+'deg)';
  div.style.oTransform      = 'rotate('+deg+'deg)';
  div.style.transform       = 'rotate('+deg+'deg)';
}

const clearCanvas = (ctx, c) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const paint = (ctx) => {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = color.current;
  ctx.moveTo(brush._x, brush._y);
  ctx.lineTo(brush.x, brush.y);
  ctx.stroke();
}

const paintCursor = (ctx) => {
  const radius = lineWidth/2+1;
  ctx.beginPath();
  ctx.strokeStyle = color.current;
  ctx.arc(brush.x, brush.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "#FFF";
  ctx.arc(brush.x, brush.y, 1, 0, 2 * Math.PI);
  ctx.stroke();
}

const draw = () => {
  clearCanvas(ctxM, canvas);
  if (started && brush.changed()) {
    paint(ctxS);
  }

  ctxM.drawImage(scratch, 0, 0);
  paintCursor(ctxM);
  brush.normalize();

  window.webkitRequestAnimationFrame(draw);
}

window.webkitRequestAnimationFrame(draw);

// Keyboard input
const checkKey = (e) => {
  e = e || window.event;
  if (e.keyCode == '38') { // UP
    brush.add(0, -10);
  }
  else if (e.keyCode == '40') { // DOWN
    brush.add(0, 10);
  }
  else if (e.keyCode == '37') { // LEFT
    brush.add(-10, 0);
  }
  else if (e.keyCode == '39') { // RIGHT
    brush.add(10, 0);
  }

}

const startButton = document.querySelector(`#start button`);
startButton.addEventListener("click", (e) => {
  document.getElementById("start").classList.add("hide");
  started = true;
});

document.onkeydown = checkKey;

document.getElementById("connect").addEventListener("click", midiConnect);
