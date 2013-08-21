function Surrogate() {};
Surrogate.prototype = MovingObjects.MovingObject.prototype;

function Asteroid(screenX, screenY, radius, deltaX, deltaY, game) {
  MovingObjects.MovingObject.call(this, screenX, screenY, radius);
  this.deltaX = deltaX;
  this.deltaY = deltaY;
  this.game = game;

};

Asteroid.RADIUS = 12;
Asteroid.MAX_VELOCITY = 2;
Asteroid.randomAsteroid = function(screenX, screenY, game) {
  var yingYang = function() {
    return [-1,1][Math.floor(Math.random()*2)];
  }
  return new Asteroid(
    screenX * Math.random(),
    screenY * Math.random(),
    Asteroid.RADIUS * Math.floor(Math.random() * 3 + 1),
    Asteroid.MAX_VELOCITY * Math.random() * yingYang(),
    Asteroid.MAX_VELOCITY * Math.random() * yingYang(),
    game
  );
}

Asteroid.newAsteroid = function(oldAsteroid,game,newSize) {
  var yingYang = function() {
    return [-1,1][Math.floor(Math.random()*2)];
  }
	return new Asteroid(
    oldAsteroid.centerX,
    oldAsteroid.centerY,
    newSize,
    Asteroid.MAX_VELOCITY * Math.random() * yingYang() + oldAsteroid.deltaX,
    Asteroid.MAX_VELOCITY * Math.random() * yingYang() + oldAsteroid.deltaY,
    game
	);
}

Asteroid.prototype = new Surrogate();

Asteroid.prototype.render = function (ctx) {
  ctx.beginPath();
  ctx.arc(
    this.centerX,
    this.centerY,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.25;
  ctx.stroke();
}