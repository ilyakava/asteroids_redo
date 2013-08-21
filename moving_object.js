var MovingObjects = (function () {

  function MovingObject(centerX,centerY,radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  };

  MovingObject.MAX_RADIUS = 25;
  MovingObject.randomMovingObject = function (screenX, screenY) {
    return new MovingObject(
      screenX * Math.random(),
      screenY * Math.random(),
      MovingObject.MAX_RADIUS * Math.random()
    );
  };

  MovingObject.prototype.update = function (deltaX, deltaY) {
		switch (this.offScreen(500,500)) {
		case "right":
			this.centerX = 501 - this.centerX;
			break;
		case "left":
			this.centerX = 499 - this.centerX
			break;
		}
		switch (this.offScreen(500,500)) {
		case "top":
			this.centerY = 499 - this.centerY;
			break;
		case "bottom":
			this.centerY = 501 - this.centerY;
			break;
		}
		this.centerX = (this.centerX + deltaX);
		this.centerY = (this.centerY + deltaY);
  };

  MovingObject.prototype.offScreen = function (screenX, screenY) {
    if (this.centerX > (this.radius + screenX)) {
      return "right"
    } else if ((this.centerX + this.radius) < 0) {
      return "left"
    } else if ((this.centerY + this.radius) < 0){
    	return "top"
    } else if (this.centerY > (this.radius + screenY)){
			return "bottom"
		} else {
      return false
    }
  };
	
	MovingObject.prototype.isHit = function (object) {
		var that = this;
		var distance = Math.sqrt(Math.pow(that.centerX - object.centerX, 2) + Math.pow(that.centerY - object.centerY, 2));
		return distance < this.radius + object.radius
	}

  return {
    MovingObject: MovingObject
  };

})();