/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth-5;
canvas.height = innerHeight-5;

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function firework(x,y,vel_x,vel_y,color,delay=150) {
  this.x=x;
  this.y=y;
  this.vel_x=vel_x;
  this.vel_y=vel_y;
  this.color=color;
  this.delay=delay;
  this.count=0;
  this.dead=false;
};
  firework.prototype.update = function() {
    if(this.count>=this.delay){
    this.dead = true;
    }else{
      this.count++;
      this.draw();
    }

    this.x+=this.vel_x;
    this.y+=this.vel_y;

    this.y+=(this.count/200);

  }

  firework.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    // console.log(this.x);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }



function particle(x, y, radius, color , exploded) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.exploded = exploded;
    this.velocity= Math.random() * (0.6 - 0.5 + 1) + 0.5 ;
    this.vel_x=(Math.random()-.5) * 5 ;
    this.vel_y=Math.random()-.5  * 5;
    this.acc = 25 ;
    this.gravity = Math.random() ;
}

particle.prototype.update = function () {
    // firework.update();


      this.acc-=this.velocity;
      this.y-=this.acc;



    if(this.acc<=0)
    {
      this.exploded = true;
    }else{
      this.draw();
    }
    // this.y+=this.gravity;

};

particle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

// Implementation
var particles = void 0;
function init() {
    particles = [];


}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255,255,255,0.05)";
    c.fillRect(0,0,canvas.width,canvas.height);

    createParticle(1,false);


    for (var i=0;i<particles.length;i++) {
      if(particles[i].exploded){

        createFirework(particles[i].x,particles[i].y,50,particles[i].color);
        particles.forEach(firework =>{
          firework.update();

        });
         particles.splice(i,1);


      }
      else{

     particles[i].update();
   }
    }
}
var createParticle = function(number,exploded) {
  for (var i = 0; i < number; i++) {
        var x = Math.random() * canvas.width;
        var y =  canvas.height -5;
         if(Math.random() <= .05)
       particles.push(new particle(x,y,5,randomColor(colors),exploded));
       // console.log(exploded);
  }
}
var createFirework = function(xpos, y, number, color) {
  // console.log(xpos);

  for (var i = 0; i < number; i++) {
        var vel_x = Math.random() - .5;
        var vel_y =  Math.random() - .5;
         // if(Math.random() <= .01)
       particles.push(new firework(xpos,y,vel_x,vel_y,color));
}
}
init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map
