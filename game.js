var Game = function (screenX, screenY, numAsteroids) {
  this.screenX = screenX;
  this.screenY = screenY;
	this.numAsteroids = numAsteroids;
  this.asteroids = this.makeAsteroids(numAsteroids);
	this.bullets = [];
  this.ship = new Ship(this);
	this.lives = 3;
	this.score = 0;
	this.gameOver = false;
	this.seconds = 0;
	this.tenths = 0;
};

Game.prototype.nextLife = function(){
	this.asteroids = this.makeAsteroids(10);
	this.ship.centerX = this.screenX/2;
	this.ship.centerY = this.screenY/2;
  this.ship.angle = 0;
  this.ship.velocity = { x:0, y:0 }
  this.ship.acceleration = { x:0, y:0 }
  this.ship.angularVelocity = 0;
	this.ship.power = false;
	this.ship.hasBullets = true;
	this.bullets = [];
}

Game.prototype.resetGame = function(){
	this.score = 0;
	this.nextLife();
	this.lives = 3;
	this.gameOver = false;
	this.seconds = 0;
	this.tenths = 0;
}

Game.prototype.makeAsteroids = function (num) {
  var that = this;
  var asteroids = [];

  var oneAsteroid = function () {
    return asteroids.push(Asteroid.randomAsteroid(that.screenX, that.screenY, that));
  };

  _(num).times(oneAsteroid);
  return asteroids;
};

Game.prototype.render = function (ctx) {
	var that = this;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.screenX, this.screenY);
	
  var renderAsteroid = function (asteroid) {
    asteroid.render(ctx);
  };
	
	var renderBullet = function (bullet){
		bullet.render(ctx);
	}

  _.each(this.asteroids, renderAsteroid);
  this.ship.render(ctx);
	_.each(this.bullets, renderBullet);
	
	ctx.fillStyle = "white";
	ctx.font = "12pt Arial";
	ctx.fillText("Lives: " + that.lives, 5, 15);
	ctx.fillText("Score: " + that.score,	5, 35);
	ctx.fillStyle = "white";
	ctx.font = "12pt Arial";
	ctx.fillText("Time: " + that.seconds + "." + that.tenths, 5, 495);
	
	if (this.lives < 1){
		ctx.fillStyle = "white";
		ctx.font = "20pt Arial";
		ctx.fillText("GAMEOVER", 170,250);
		ctx.font = "10pt Arial";
		ctx.fillText("press space to continue", 180,265)
		that.gameOver = true;
	}
};

Game.prototype.draw = function (canvasEl) {
  var ctx = canvasEl.getContext("2d");
  // render
  var that = this;
  
	setInterval(function () {
		if (!(that.gameOver)) {
			that.render(ctx);
			that.update();
		}
  }, 33);
	
	setInterval(function (){
		that.tenths = (that.tenths + 1) % 10;
	}, 100);
	
	setInterval(function (){
		that.seconds ++;
	}, 1000);
	
	key('space', function(){
		if(that.gameOver){		
			that.resetGame();
		}
	});
	
};

Game.prototype.update = function () {
  var that = this;
	var shipHit = false;
	_.each(that.asteroids, function(asteroid){
		if(that.ship.isHit(asteroid)) {
			shipHit = true;
		}
	});
	
	if (shipHit) {
		that.lives--;
		if (that.lives > 0) {
			that.nextLife();
		}
	}

  var updateShip = function () {
		
		that.ship.velocity.y = that.ship.velocity.y * .985
		that.ship.velocity.x = that.ship.velocity.x * .985
		
		if(that.ship.power) {
			that.ship.acceleration.y = Math.cos(that.ship.angle) * .2;
			that.ship.acceleration.x = Math.sin(that.ship.angle) * .2;
		} else {
			that.ship.acceleration.y = 0;
			that.ship.acceleration.x = 0;
		}
		
	  that.ship.velocity.x += that.ship.acceleration.x;
	  that.ship.velocity.y -= that.ship.acceleration.y;

	  that.ship.angle += that.ship.angularVelocity
		
    that.ship.update(that.ship.velocity.x, that.ship.velocity.y);
  }

	var updateBullet = function (bullet) {
		var index = that.bullets.indexOf(bullet);
		if(bullet.offScreen(that.screenX,that.screenY)){
			that.bullets.splice(index, 1);
		} else {
			bullet.update( bullet.velocity.x, bullet.velocity.y );
		}
		_.each(that.asteroids, function(asteroid){
			if(bullet.isHit(asteroid)){
			  var yingYang = function() {
			    return [-1,1][Math.floor(Math.random()*2)];
			  }
				var asteroidIndex = that.asteroids.indexOf(asteroid);
				that.bullets.splice(index, 1);
				that.score += 10;
				if (asteroid.radius == 24) {
					that.asteroids = that.asteroids.concat(
						[Asteroid.newAsteroid(asteroid,that,12),Asteroid.newAsteroid(asteroid,that,12)]
					);
				} else if (asteroid.radius == 36){
					that.asteroids = that.asteroids.concat(
						[Asteroid.newAsteroid(asteroid,that,24),Asteroid.newAsteroid(asteroid,that,24)]
					);
				} else if (asteroid.radius == 12){
					that.asteroids = that.asteroids.concat(
						[Asteroid.newAsteroid(asteroid,that,6),Asteroid.newAsteroid(asteroid,that,6)]
					);
				}
				that.asteroids.splice(asteroidIndex, 1);
			}
		})
	}

  var updateAsteroid = function (asteroid) {
    asteroid.update(asteroid.deltaX, asteroid.deltaY);
  };

	_.each(this.bullets,updateBullet)
  _.each(this.asteroids, updateAsteroid);
  updateShip();

};