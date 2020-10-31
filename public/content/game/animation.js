//this is the code for a small graphic application, basically learning the basics of animations
//variables
var buffer, controller, display, loop, player, render, resize, sprite_sheet,SPRITE_width=108,SPRITE_height=140;
buffer = document.createElement("canvas").getContext("2d");
display = document.querySelector("canvas").getContext("2d");


//animation class
var animation = function (frame_set,delay) {
  this.count = 0;
  this.delay = delay;
  this.frame = 0;
  this.frame_index = 0;
  this.frame_set = frame_set;
};

animation.prototype.change = function (frame_set,delay) {

    if(this.frame_set != frame_set){



      this.count = 0;
      this.delay = delay;
      this.frame_index = 0;
      this.frame_set = frame_set;
      this.frame = this.frame_set[this.frame_index];
    }
};
animation.prototype.update = function () {
    this.count++;
    if(this.count >= this.delay){
        this.count = 0;
        this.frame_index=(this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
        // console.log("frame = "+this.frame +" "+ this.frame_set +" "+this.frame_index);
        this.frame = this.frame_set[this.frame_index];

    }
};

//controller modified

controller = {
  left:  { active:false, state:false },
  right: { active:false, state:false },
  up:    { active:false, state:false },
  keyUpDown:function(event) {
    var key_state = (event.type == "keydown") ? true : false;
    switch(event.keyCode) {
      case 37:// left key
        if (controller.left.state != key_state) controller.left.active = key_state;
        controller.left.state  = key_state;// Always update the physical state.
      break;
      case 38:// up key
        if (controller.up.state != key_state) controller.up.active = key_state;
        controller.up.state  = key_state;
      break;
      case 39:// right key
        if (controller.right.state != key_state) controller.right.active = key_state;
        controller.right.state  = key_state;
      break;
    }
    // console.log("left:  " + controller.left.state + ", " + controller.left.active + "\nright: " + controller.right.state + ", " + controller.right.active + "\nup:    " + controller.up.state + ", " + controller.up.active);
  }
};

player = {

  animation:new animation(),// You don't need to setup Animation right away.
  jumping:true,
  height:180,    width:320,
  x:0,          y:400 - 180,
  x_velocity:0, y_velocity:0

};
sprite_sheet = {

  frame_sets:[[0], [0,1,2,3,4,5,6,7], [8,9,10,11,12,13,14,15]],// standing still, walk right, walk left
  image:new Image()

};

//loop function
loop = function(time_stamp) {

  if (controller.up.active && !player.jumping) {

    controller.up.active = false;
    player.jumping = true;
    player.y_velocity -= 35;

  }

  if (controller.left.active) {

    player.animation.change(sprite_sheet.frame_sets[2], 5);
    player.x_velocity -= 0.5;

  }

  if (controller.right.active) {

    player.animation.change(sprite_sheet.frame_sets[1], 5);
    player.x_velocity += 0.5;

  }

  if (!controller.left.active && !controller.right.active) {

    player.animation.change(sprite_sheet.frame_sets[0], 20);

  }

  player.y_velocity += 1;

  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;
  player.y_velocity *= 0.9;

  if (player.y + player.height > buffer.canvas.height - 2) {

    player.jumping = false;
    player.y = buffer.canvas.height - 2 - player.height;
    player.y_velocity = 0;

  }

  if (player.x + player.width < 0) {

    player.x = buffer.canvas.width;

  } else if (player.x > buffer.canvas.width) {

    player.x = - player.width;

  }

  player.animation.update();

  render();

  window.requestAnimationFrame(loop);

};









//sprite_sheet object



//resize function
resize = function() {

  display.canvas.width = document.documentElement.clientWidth - 60;

  // if (display.canvas.width > document.documentElement.clientHeight) {
  //
  //   display.canvas.width = document.documentElement.clientHeight;
  //
  // }

  display.canvas.height = display.canvas.width * 0.5;

  display.imageSmoothingEnabled = false;

};

//render function
render = function() {



  buffer.fillStyle = "#7ec0ff";
  buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);


   buffer.strokeStyle = "#8ed0ff";
   buffer.lineWidth = 100;
   buffer.beginPath();
   buffer.moveTo(0, 0);
   buffer.bezierCurveTo(400, 200, 400, 0, 800, 0);
   buffer.moveTo(0, 0);
   buffer.bezierCurveTo(400, 200, 400, 200, 800, 0);
   buffer.stroke();
   buffer.fillStyle = "#009900";
   buffer.fillRect(0, 300, buffer.canvas.width, 100);

  if (player.animation.frame>=8) buffer.drawImage(sprite_sheet.image, (player.animation.frame-8) * SPRITE_width,140, SPRITE_width, SPRITE_height, Math.floor(player.x), Math.floor(player.y), SPRITE_width, SPRITE_height);
  else buffer.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_width,0, SPRITE_width, SPRITE_height, Math.floor(player.x), Math.floor(player.y), SPRITE_width, SPRITE_height);




  display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);

};




///////////////////////
//////INITIALIZE///////
///////////////////////

buffer.canvas.width = 800;
buffer.canvas.height = 400;

window.addEventListener("resize", resize);
window.addEventListener("keydown", controller.keyUpDown);
window.addEventListener("keyup", controller.keyUpDown);

resize();
render();
sprite_sheet.image.addEventListener("load", function(event) {// When the load event fires, do this:

  window.requestAnimationFrame(loop);// Start the game loop.

});

sprite_sheet.image.src = "sprite.png";// Start loading the image.
