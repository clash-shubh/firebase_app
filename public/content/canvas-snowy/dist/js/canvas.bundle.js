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

canvas.width = innerWidth;
canvas.height = innerHeight;

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
function point(x, y, radius, density,angle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.density = density;
    this.angle=angle;
    var lastX=0;
    var lastY=0;
    //functions
    this.update = function (x,y) {
        lastX=x;
        lastY=y;

        angle+=0.05;
        this.x+=Math.sin(angle);
        this.y+=Math.sqrt(this.density,2) +1;
        if(this.y>innerHeight){
          this.y=0;
        }
        //points repelling outside from the area of cursor
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){
          if(mouse.x - this.x < 0)
          {
              this.x+=1;
          }
          else if(mouse.x-this.x > 0){
              this.x-=1;
          }

          if(mouse.y - this.y < 0)
          {
              this.y+=1;
          }
          else if(mouse.y-this.y > 0){
              this.y-=1;
          }
        }

        this.draw();
    };

    this.draw = function () {
        c.beginPath();

        //drawing points as circles
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = 'white';
        // c.fill();

        //drawing lines from last point to current points
        // c.moveTo(lastX,lastY);
        // c.lineTo(this.x,this.y);
        // c.strokeStyle='white';
        // c.stroke();
        // c.clearRect(0,0,200,200);
        // c.moveTo(20,0);
        // c.arc(20,0,130,0,Math.PI,false);
        // c.arc(200,-50,130,0,Math.PI,false);
        c.fillStyle='white';
        c.fill();
        c.closePath();
    };
}



// Implementation
var points = void 0;
function init() {
    points = [];

    for (var i = 0; i < 100; i++) {

        var x=Math.random() * innerWidth;
        var y=Math.random() * innerHeight;
        var r=Math.random() * 4 +1;
        var d=Math.random() * 2 +1;
        var a=Math.random();

       points.push(new point(x,y,r,d,a));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    points[0].update(0,0)
    for(var i=1;i<points.length;i++){
        points[i].update(points[i-1].x,points[i-1].y);
    }
    // points.forEach(point => {
    //  point.update();
    // });
}

init();

animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map
