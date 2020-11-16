const map= function(level){
this.level=level;
this.display=function(){
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

}
}
