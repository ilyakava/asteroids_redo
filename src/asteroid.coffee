class Asteroid extends MovingObject

  @split: (asteroid) =>
    dX = asteroid.dX
    dY = asteroid.dY
    hypotenuse = (Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)))
    theta = Math.asin(dY / hypotenuse)
    omega = 0.1 # in radians, 5 degrees-ish
    rtTwo = 1.414
    [
      @constructor
        x: asteroid.x
        y: asteroid.y
        radius: asteroid.radius / rtTwo
        dX: Math.sin(theta + omega) * hypotenuse * rtTwo
        dY: Math.cos(theta + omega) * hypotenuse * rtTwo
      @constructor
        x: asteroid.x
        y: asteroid.y
        radius: asteroid.radius / rtTwo
        dX: Math.sin(theta - omega) * hypotenuse * rtTwo
        dY: Math.cos(theta - omega) * hypotenuse * rtTwo
    ]