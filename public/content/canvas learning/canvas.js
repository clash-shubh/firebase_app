var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth-5;
canvas.height=window.innerHeight-5;
var c=canvas.getContext('2d');
var numberOfParticles=500;
var maxSpeed=2;

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
  this.radius = 10;
  this.min=this.radius;
  this.color= colorArray[Math.floor(Math.random() * colorArray.length)];
  this.isColliding=false;


  this.draw = function() {

    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
    c.fillStyle = this.color;

    c.fill();
  }

  this.Collision = function() {
    for(var i=0;i<numberOfParticles;i++){
      if(this.x!=circleArray[i].x && this.y!=circleArray[i].y && this.dx!=circleArray[i].dx && this.dy!=circleArray[i].dy && this.isColliding==false){
        this.isColliding=true;
        circleArray[i].isColliding=true;
        var distance_vector={x:this.x - circleArray[i].x,y:this.y - circleArray[i].y};
        var distance=Math.sqrt((distance_vector.x*distance_vector.x) + (distance_vector.y * distance_vector.y));
        var radius_sum=circleArray[i].radius+this.radius;
        var unit_vectors={x:distance_vector.x/distance,y:distance_vector.y/distance};
        var relativeVelocity={dx:this.dx-circleArray[i].dx,dy:this.dy-circleArray[i].dy};
      //console.log("distance = "+distance);
      if(distance<=radius_sum && distance!=NaN){
        //circleArray[i].x=this.x+ ((circleArray[i].radius+this.radius)+1) * unit_vectors.x;
        //circleArray[i].y=this.y+ ((circleArray[i].radius+this.radius)+1) * unit_vectors.y;
        let speed=relativeVelocity.dx*unit_vectors.x+relativeVelocity.dy*unit_vectors.y;
        if(speed>maxSpeed){
          speed=maxSpeed;
        }
        if(speed>0){
          this.dx=speed*unit_vectors.x;
          this.dy=speed*unit_vectors.y;
          circleArray[i].dx=-speed*unit_vectors.x;
          circleArray[i].dy=-speed*unit_vectors.y;
        }
      }
    }
    else{
      this.isColliding=false;
      circleArray[i].isColliding=false;
    }
  }
  }
  
  this.update = function() {
    this.Collision();

    this.x+=this.dx;
    this.y+=this.dy;

    if(this.x+this.radius>innerWidth || this.x-this.radius<0)
    this.dx=-this.dx;

    if(this.y+this.radius>innerHeight || this.y-this.radius<0)
    this.dy=-this.dy;

    
    /*
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){
      if(this.radius < maxRadius) {this.radius+=1};

    }else if(this.radius > this.min) {
        this.radius-=1;
    }
    */
    this.draw();
  }



}

var circleArray = [];

function init(){
for(var i=0;i<numberOfParticles;i++){
    var x=Math.random() * (window.innerWidth - maxRadius*2) + maxRadius;
    var y=Math.random() * (window.innerHeight - maxRadius*2) + maxRadius;
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
console.log("init called!!!")
console.log(circleArray[0])
animate();
