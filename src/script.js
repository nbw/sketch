(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Brush = /*#__PURE__*/function () {
  function Brush() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Brush);

    this.x = x;
    this.y = y;
    this._x = x;
    this._y = y;
    this.consumed = true;
  }

  _createClass(Brush, [{
    key: "setX",
    value: function setX(x) {
      this.x = x;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
    }
  }, {
    key: "add",
    value: function add(dx, dy) {
      this.x += dx;
      this.y += dy;
    }
  }, {
    key: "changed",
    value: function changed() {
      return this.x != this._x || this.y != this._y;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      this._x = this.x;
      this._y = this.y;
    }
  }]);

  return Brush;
}();

var _default = Brush;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} // https://www.materialpalette.com/colors


var COLORS = ["#cc1b0c", // DARK RED
"#f44336", // RED
"#e91e63", // PINK
"#9c27b0", // PURPLE
"#673ab7", // DEEP PURPLE
"#3f51b5", // INDIGO
"#2196f3", // BLUE
"#29b6f6", // LIGHT BLUE
"#4dd0e1", // CYAN
"#4db6ac", // TEAL
"#21ffc4", // BRIGHT TEAL
"#198552", // DARKER GREEN
"#4caf50", // GREEN
"#8bc34a", // LIGHT GREEN
"#d4e157", // LIME
"#ffeb3b", // YELLOW
"#ffb300", // AMBER
"#fb8c00", // ORANGE
"#ff5722", // DEEP ORANGE
"#8d6e63", // BROWN
"#9e9e9e", // GREY
"#607d8b", // BLUE GREY
"#000", // BLACK
"#FFF" // WHITE
];

var ColorPicker = /*#__PURE__*/function () {
  function ColorPicker(boardId) {
    _classCallCheck(this, ColorPicker);

    this.keyboard = document.getElementById("keyboard");
    this.keys = keyboard.querySelectorAll('[data-key]');
    this.current = "#333";
  }

  _createClass(ColorPicker, [{
    key: "init",
    value: function init() {
      var _this = this;

      var _loop = function _loop(i) {
        var keyNum = Number(_this.keys[i].getAttribute("data-key"));
        _this.keys[i].style.backgroundColor = COLORS[keyNum];

        _this.keys[i].setAttribute("color", COLORS[keyNum]);

        _this.keys[i].addEventListener("click", function (e) {
          _this.current = e.target.getAttribute("color");

          _this.setKeyActive(keyNum);
        });
      };

      for (var i = 0; i < this.keys.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "setKeyActive",
    value: function setKeyActive(selectedKey) {
      for (var i = 0; i < this.keys.length; i++) {
        var keyNum = Number(this.keys[i].getAttribute("data-key"));

        if (keyNum === selectedKey) {
          this.keys[i].classList.add("active");
        } else {
          this.keys[i].classList.remove("active");
        }
      }
    }
  }, {
    key: "pick",
    value: function pick(key) {
      this.current = COLORS[key % COLORS.length];
      this.setKeyActive(key);
    }
  }]);

  return ColorPicker;
}();

var _default = ColorPicker;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _opzjs = _interopRequireDefault(require("opzjs"));

var _midi = _interopRequireDefault(require("./midi"));

var _brush = _interopRequireDefault(require("./brush"));

var _color_picker = _interopRequireDefault(require("./color_picker"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // Canvas


var started = false;
var canvas = document.getElementById('canvas');
var scratch = document.createElement('canvas');
var ctxM = canvas.getContext('2d'); // Main

var ctxS = scratch.getContext('2d'); // Scratch

var width = Math.floor(document.getElementById("canvas").offsetWidth);
var height = 500;
var color = new _color_picker["default"]("keyboard");
var brush = new _brush["default"](width / 2, 3 * height / 4);
var lineWidth = 3; // Midi

var midi = new _midi["default"](); // Inits

midi.setup();
color.init();
color.pick(3);

var setupCanvas = function setupCanvas(c, w, h) {
  c.width = w;
  c.height = h;
};

setupCanvas(canvas, width, height);
setupCanvas(scratch, width, height);

var handler = function handler(event) {
  var data = _opzjs["default"].decode(event.data);

  if (data.action === "keys" && data.velocity > 0) {
    var key = (data.value.value - 53) % 24;
    color.pick(key);
  }

  if (data.action === "dial") {
    switch (data.value.dialColor) {
      case "green":
        brush.setX(data.velocity * width / 127);
        rotateKnob("left", 1620 * data.velocity / 128);
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
        brush.setY(data.velocity * height / 127);
        rotateKnob("right", 1620 * data.velocity / 128);
        break;

      default:
        return;
    }
  }
};

var midiConnect = function midiConnect(e) {
  midi.setup();
  setTimeout(function () {
    if (midi.devices.length > 0) {
      for (var deviceId in midi.devices) {
        midi.selectDevice(deviceId, handler);
      }

      var menu = document.getElementById("menu");
      menu.classList.add("hide");
    } else {
      var error = document.getElementById("connect-error");
      error.innerHTML = "Couldn't detect any midi devices (check browser support)";
    }
  }, 200);
};

var rotateKnob = function rotateKnob(knobClass, deg) {
  var div = document.querySelector(".".concat(knobClass, " div"));
  div.style.webkitTransform = 'rotate(' + deg + 'deg)';
  div.style.mozTransform = 'rotate(' + deg + 'deg)';
  div.style.msTransform = 'rotate(' + deg + 'deg)';
  div.style.oTransform = 'rotate(' + deg + 'deg)';
  div.style.transform = 'rotate(' + deg + 'deg)';
};

var clearCanvas = function clearCanvas(ctx, c) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var paint = function paint(ctx) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = color.current;
  ctx.moveTo(brush._x, brush._y);
  ctx.lineTo(brush.x, brush.y);
  ctx.stroke();
};

var paintCursor = function paintCursor(ctx) {
  var radius = lineWidth / 2 + 1;
  ctx.beginPath();
  ctx.strokeStyle = color.current;
  ctx.arc(brush.x, brush.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "#FFF";
  ctx.arc(brush.x, brush.y, 1, 0, 2 * Math.PI);
  ctx.stroke();
};

var draw = function draw() {
  clearCanvas(ctxM, canvas);

  if (started && brush.changed()) {
    paint(ctxS);
  }

  ctxM.drawImage(scratch, 0, 0);
  paintCursor(ctxM);
  brush.normalize();
  window.webkitRequestAnimationFrame(draw);
};

window.webkitRequestAnimationFrame(draw); // Keyboard input

var checkKey = function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == '38') {
    // UP
    brush.add(0, -10);
  } else if (e.keyCode == '40') {
    // DOWN
    brush.add(0, 10);
  } else if (e.keyCode == '37') {
    // LEFT
    brush.add(-10, 0);
  } else if (e.keyCode == '39') {
    // RIGHT
    brush.add(10, 0);
  }
};

var startButton = document.querySelector("#start button");
startButton.addEventListener("click", function (e) {
  document.getElementById("start").classList.add("hide");
  started = true;
});
document.onkeydown = checkKey;
document.getElementById("connect").addEventListener("click", midiConnect);

},{"./brush":1,"./color_picker":2,"./midi":4,"opzjs":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Midi = /*#__PURE__*/function () {
  function Midi() {
    _classCallCheck(this, Midi);

    this.self = this;
    this.devices = [];
    this.supported = this.checkMidiSupport();
  }

  _createClass(Midi, [{
    key: "setup",
    value: function setup() {
      navigator.requestMIDIAccess().then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    }
  }, {
    key: "onMIDISuccess",
    value: function onMIDISuccess(midiAccess) {
      var inputs = midiAccess.inputs.values();

      var _iterator = _createForOfIteratorHelper(midiAccess.inputs.values()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var input = _step.value;
          this.devices.push(input);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "onMIDIFailure",
    value: function onMIDIFailure() {
      console.log('Could not access your MIDI devices.');
    }
  }, {
    key: "checkMidiSupport",
    value: function checkMidiSupport() {
      if (navigator.requestMIDIAccess) {
        console.log('This browser supports WebMIDI!');
        return true;
      } else {
        console.log('WebMIDI is not supported in this browser.');
        return false;
      }
    }
  }, {
    key: "selectDevice",
    value: function selectDevice(deviceIndex, handler) {
      var device = this.devices[deviceIndex];
      device.onmidimessage = handler;
      return "Connected to \"".concat(device.name, "\"");
    }
  }]);

  return Midi;
}();

var _default = Midi;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

var _MIDI = require('./opz.json');

var error = function error(value) {
  console.log('[OPZ]: Untracked midi value. Please create an issue https://github.com/nbw/opz/issues');
  console.log("[OPZ]: ".concat(value));
  return value;
};

var get = function get() {
  var value = _MIDI;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    value = value[args[i]];
    if (!value) throw 'Untracked value';
  }

  return value;
};

var track = function track(input) {
  if (input.length < 1) return null;
  return get('track', input[0]);
};

var action = function action(input) {
  if (input.length < 1) return null;
  return get('action', input[0]);
};

var note = function note(input) {
  if (input.length < 2) return null;
  var n = input[1];
  return {
    value: n,
    note: get('notes', n % 12)
  };
};

var dial = function dial(input) {
  if (input.length < 2) return null;
  var d = input[1];
  return {
    dial: (d - 1) % 4,
    // 0 - 3
    dialColor: get('dial', 'color', d % 100),
    page: Math.floor((d - 1) / 4),
    // 0 - 3
    pageColor: get('dial', 'page', track(input), d % 100)
  };
};

var pitch = function pitch(input) {
  if (input.length < 3) return null;
  return {
    absolute: input[1],
    relative: input[2]
  };
};

var value = function value(input) {
  if (input.length < 3) return null;

  switch (action(input)) {
    case 'keys':
      return note(input);

    case 'dial':
      return dial(input);

    case 'pitch bend':
      return pitch(input);

    default:
      return {};
  }
};

var velocity = function velocity(input) {
  if (input.length < 3) return -1;
  return input[2];
};

var control = function control(input) {
  var c = get('control', input[0]);
  return {
    track: c,
    action: c,
    velocity: velocity(input),
    value: {}
  };
};

var decode = function decode(input) {
  try {
    if (input.length === 1) return control(input);
    if (input.length === 2) return null;
    return {
      track: track(input),
      action: action(input),
      velocity: velocity(input),
      value: value(input)
    };
  } catch (e) {
    error(input);
  }
};

module.exports = {
  decode: decode,
  velocity: velocity
};

},{"./opz.json":6}],6:[function(require,module,exports){
module.exports={
  "dictionary": {
    "action": {
      "dial": "dial",
      "keys": "keys",
      "pitch": "pitch bend"
    },
    "color": {
      "blue": "blue",
      "green": "green",
      "purple": "purple",
      "red": "red",
      "white": "white",
      "yellow": "yellow"
    },
    "track": {
      "arp": "arp",
      "bass": "bass",
      "chord": "chord",
      "fx1": "fx1",
      "fx2": "fx2",
      "kick": "kick",
      "lead": "lead",
      "lights": "lights",
      "master": "master",
      "module": "module",
      "motion": "motion",
      "perc": "perc",
      "perform": "perform",
      "sample": "sample",
      "snare": "snare",
      "tape": "tape"
    },
    "clock": "clock",
    "kill": "kill",
    "start": "start",
    "stop": "stop"
  },
  "control": {
    "248": "clock",
    "250": "start",
    "252": "stop"
  },
  "action": {
    "128": "keys",
    "129": "keys",
    "130": "keys",
    "131": "keys",
    "132": "keys",
    "133": "keys",
    "134": "keys",
    "135": "keys",
    "136": "keys",
    "137": "keys",
    "138": "keys",
    "139": "keys",
    "140": "keys",
    "141": "keys",
    "142": "keys",
    "143": "keys",
    "144": "keys",
    "145": "keys",
    "146": "keys",
    "147": "keys",
    "148": "keys",
    "149": "keys",
    "150": "keys",
    "151": "keys",
    "152": "keys",
    "153": "keys",
    "154": "keys",
    "155": "keys",
    "156": "keys",
    "157": "keys",
    "158": "keys",
    "159": "keys",
    "176": "dial",
    "177": "dial",
    "178": "dial",
    "179": "dial",
    "180": "dial",
    "181": "dial",
    "182": "dial",
    "183": "dial",
    "184": "dial",
    "185": "dial",
    "186": "dial",
    "187": "dial",
    "188": "dial",
    "189": "dial",
    "190": "dial",
    "191": "dial",
    "224": "pitch bend",
    "225": "pitch bend",
    "226": "pitch bend",
    "227": "pitch bend",
    "228": "pitch bend",
    "229": "pitch bend",
    "230": "pitch bend",
    "231": "pitch bend",
    "232": "pitch bend",
    "233": "pitch bend",
    "234": "pitch bend",
    "235": "pitch bend",
    "236": "pitch bend",
    "237": "pitch bend",
    "238": "pitch bend",
    "239": "pitch bend"
  },
  "track": {
    "128": "kick",
    "129": "snare",
    "130": "perc",
    "131": "sample",
    "132": "bass",
    "133": "lead",
    "134": "arp",
    "135": "chord",
    "136": "fx1",
    "137": "fx2",
    "138": "tape",
    "139": "master",
    "140": "perform",
    "141": "module",
    "142": "lights",
    "143": "motion",
    "144": "kick",
    "145": "snare",
    "146": "perc",
    "147": "sample",
    "148": "bass",
    "149": "lead",
    "150": "arp",
    "151": "chord",
    "152": "fx1",
    "153": "fx2",
    "154": "tape",
    "155": "master",
    "156": "perform",
    "157": "module",
    "158": "lights",
    "159": "motion",
    "176": "kick",
    "177": "snare",
    "178": "perc",
    "179": "sample",
    "180": "bass",
    "181": "lead",
    "182": "arp",
    "183": "chord",
    "184": "fx1",
    "185": "fx2",
    "186": "tape",
    "187": "master",
    "188": "perform",
    "189": "lights",
    "190": "lights",
    "191": "motion",
    "224": "kick",
    "225": "snare",
    "226": "perc",
    "227": "sample",
    "228": "bass",
    "229": "lead",
    "230": "arp",
    "231": "chord",
    "232": "fx1",
    "233": "fx2",
    "234": "tape",
    "235": "master",
    "236": "perform",
    "237": "module",
    "238": "lights",
    "239": "motion"
  },
  "notes": {
    "0": "C",
    "1": "C#",
    "2": "D",
    "3": "D#",
    "4": "E",
    "5": "F",
    "6": "F#",
    "7": "G",
    "8": "G#",
    "9": "A",
    "10": "A#",
    "11": "B"
  },
  "dial": {
    "color": {
      "1": "green",
      "2": "blue",
      "3": "yellow",
      "4": "red",
      "5": "green",
      "6": "blue",
      "7": "yellow",
      "8": "red",
      "9": "green",
      "10": "blue",
      "11": "yellow",
      "12": "red",
      "13": "green",
      "14": "blue",
      "15": "yellow",
      "16": "red",
      "23": "kill"
    },
    "page": {
      "kick": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "snare": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "perc": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "sample": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "bass": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "lead": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "arp": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "blue",
        "10": "blue",
        "11": "blue",
        "12": "blue",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "chord": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "fx1": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "fx2": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "tape": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "master": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "perform": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "module": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "lights": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      },
      "motion": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "23": "kill"
      }
    }
  }
}

},{}]},{},[3]);
