class MovingObject
  
  @random: =>
    @constructor
      x: screenX * Math.random()
      y: screenY * Math.random()
      radius: @MAX_RADIUS * Math.random()
      @dX: @MAX_VELOCITY * Math.random() * _.randomSign()
      @dY: @MAX_VELOCITY * Math.random() * _.randomSign()

  constructor: (params) ->
    @x = params.x
    @y = params.y
    @radius = params.radius
    @dX = params.dX
    @dY = params.dY

  MAX_RADIUS = 25
  MAX_VELOCITY = 2

  update: (params) ->
    switch @offScreen()
      when "right"
        @x = screenX + 1 - @x
      when "left"
        @x = screenX - 1 - @x
      when "top"
        @y = screenY + 1 - @y
      when "bottom"
        @y = screenY - 1 - @y
    @x += params.dX
    @y += params.dY

  offScreen: ->
    if @x > (@radius + screenX)
      "right"
    else if (@x + @radius) < 0
      "left"
    else if (@y + @radius) < 0
      "top"
    else if @y > (@radius + screenY)
      "bottom"
    else
      null

  collidedWith: (object) ->
    distance = Math.sqrt(Math.pow(@x - object.x, 2) +
      Math.pow(@y - object.y, 2));
    distance < @radius + object.radius

  render: (ctx) ->
    ctx.beginPath()
    ctx.arc @x, @y, @radius, 0, 2 * Math.PI, false
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1.25
    ctx.stroke()