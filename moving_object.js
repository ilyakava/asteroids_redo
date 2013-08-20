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
    this.centerX = (this.centerX + deltaX);
    if (this.offScreen(500, 500)) {
      if (this.offScreen(500, 500) === "positive") {
        this.centerX = 502 - this.centerX
      } else {
        this.centerX = 498 - this.centerX
      }
    }
    this.centerY = (this.centerY + deltaY);
    if (this.offScreen(500, 500)) {
      if (this.offScreen(500, 500) === "positive") {
        this.centerY = 502 - this.centerY
      } else {
        this.centerY = 498 - this.centerY
      }
    }
  };

  MovingObject.prototype.offScreen = function (screenX, screenY) {
    if (
      (this.centerX > (this.radius + screenX)) ||
      (this.centerY > (this.radius + screenY))
    ) {
      return "positive"
    } else if (
      (this.centerX + this.radius) < 0 ||
      (this.centerY + this.radius) < 0
    ) {
      return "negative"
    } else {
      return null
    }
  };

  return {
    MovingObject: MovingObject
  };

})();