function Surrogate2() {};
Surrogate2.prototype = MovingObjects.MovingObject.prototype;

var Ship = function (game, radius) {
  MovingObjects.MovingObject.call(this,game.screenX/2,game.screenY/2,4);
  this.game = game;
  this.angle = 0;
  this.velocity = { x:0, y:0 }
  this.acceleration = { x:0, y:0 }
  this.angularVelocity = 0;
	this.power = false;

  var that = this;
  key('left', function(){ that.angularVelocity = -(Math.PI/3)/10  });

  key('right', function(){ that.angularVelocity = (Math.PI/3)/10 });

  key('up', function(){
		that.power = true;
  });

  keyup('right', function(){ that.angularVelocity = 0 });
  keyup('left', function(){ that.angularVelocity = 0 });
  keyup('up', function(){that.power = false });

}

Ship.prototype = new Surrogate2();

Ship.prototype.render = function (ctx) {

  var shape = [[0,-10],[-4,3],[4,3]];

  ctx.restore();
  ctx.save();
  ctx.translate(this.centerX, this.centerY);
  ctx.rotate(this.angle);

  ctx.beginPath();
  ctx.moveTo(shape[0][0],shape[0][1]);
  ctx.lineTo(shape[1][0],shape[1][1]);
  ctx.lineTo(shape[2][0],shape[2][1]);
  ctx.closePath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.25;
  ctx.stroke();

  ctx.restore();
};

Ship.prototype.isHit = function (asteroid) {
	var that = this;
	var distance = Math.sqrt(Math.pow(that.centerX - asteroid.centerX, 2) + Math.pow(that.centerY - asteroid.centerY, 2));
	return distance < this.radius + asteroid.radius
}