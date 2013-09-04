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

Asteroid.respawn = function(game) {
  var yingYang = function() {
    return [-1,1][Math.floor(Math.random()*2)];
  }
	var result = [];
	for(var i=0; i<10; i++){
		var coord1 = Math.floor(game.screenX / 2) + ((Math.floor(game.screenX / 2) + 36) * yingYang());
		var coord2 = Math.random() * game.screenX;
		if (yingYang() > 0) {
			var x = coord1;
			var y = coord2;
		} else {
			var y = coord1;
			var x = coord2;
		}
		result.push(
			new Asteroid(
				x,
				y,
				36,
				Asteroid.MAX_VELOCITY * Math.random() * yingYang(),
				Asteroid.MAX_VELOCITY * Math.random() * yingYang(),
				game
			)
		)
	}
	return result;
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