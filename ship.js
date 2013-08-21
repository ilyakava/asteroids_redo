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
	this.hasBullets = true;

  var that = this;
  key('left', function(){ that.angularVelocity = -(Math.PI/30) });
  key('right', function(){ that.angularVelocity = (Math.PI/30) });
  key('up', function(){ that.power = true });
	key('space', function(){
		if(that.hasBullets){
			that.fireBullet();
		}
	});

  keyup('right', function(){ that.angularVelocity = 0 });
  keyup('left', function(){ that.angularVelocity = 0 });
  keyup('up', function(){ that.power = false });
	keyup('space', function(){ that.hasBullets = true });

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

Ship.prototype.fireBullet = function () {
	this.hasBullets = false;
	var bullet = new Bullet(this);
	this.game.bullets.push(bullet);
}

var Bullet = function(ship){
	MovingObjects.MovingObject.call(this,ship.centerX,ship.centerY,1);
	this.velocity = { x: Math.sin(ship.angle)*6, y: -Math.cos(ship.angle) * 6 }
}

Bullet.prototype = new Surrogate2();

Bullet.prototype.render = function (ctx) {
  ctx.beginPath();
  ctx.arc(
    this.centerX,
    this.centerY,
    1,
    0,
    2 * Math.PI,
    false
  );
	ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1.25;
  ctx.stroke();
}

