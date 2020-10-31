var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth-5;
canvas.height=window.innerHeight-5;
var c=canvas.getContext('2d');

var mouse= {
  x: undefined,
  y: undefined
}
var maxRadius=40;
var minRadius=3;
var colorArray = [
  '#00B9AE',
  '#FF84E8',
  '#7F2CCB',
  '#2F195F',
  '#E94F37'
];
window.addEventListener('mousemove',function(event){
  mouse.x=event.x;
  mouse.y=event.y;
})

window.addEventListener('resize',function(event){
  canvas.width=window.innerWidth-5;
  canvas.height=window.innerHeight-5;

  init();
})

function Circle(x,y,dx,dy,radius) {
  this.x=x;
  this.y=y;
  this.dx = dx;
  this.dy = dy;
  this.radius = Math.random() * 5 + 1;
  this.min=this.radius;
  this.color= colorArray[Math.floor(Math.random() * colorArray.length)];


  this.draw = function() {

    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = this.color;

    c.fill();
  }
  
  this.update = function() {
    this.x+=this.dx;
    this.y+=this.dy;

    if(this.x+this.radius>innerWidth || this.x-this.radius<0)
    this.dx=-this.dx;

    if(this.y+this.radius>innerHeight || this.y-this.radius<0)
    this.dy=-this.dy;

    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){
      if(this.radius < maxRadius) {this.radius+=1};

    }else if(this.radius > this.min) {
        this.radius-=1;
    }

    this.draw();
  }
}

var circleArray = [];

function init(){


circleArray = [];
for(var i=0;i<1000;i++){
    var x=Math.random() * (window.innerWidth - radius*2) + radius;
    var y=Math.random() * (window.innerHeight - radius*2) + radius;
    var dx=(Math.random()-0.5)*4;
    var dy=(Math.random()-0.5)*4;
    var radius=10;
    circleArray.push(new Circle(x,y,dx,dy,radius));
}
}


function animate(){
  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i=0;i<circleArray.length;i++){
      circleArray[i].update();
  }

  requestAnimationFrame(animate);
}
init();
animate();
