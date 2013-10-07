class Ship extends MovingObject
  constructor: (params) ->
    super(params)
    @foreAngle = params.foreAngle
    @d2X = params.d2X
    @d2Y = params.d2Y
    @angularVel = 0
    @power = off
    @ammo = on
    @muzzleVel = params.muzzleVel or 10

    key 'left', => @angularVel = -Math.PI / 30
    key 'right', => @angularVel = Math.PI / 30
    key 'up', => @power = on
    key 'space', => @fire if @ammo isnt off

    keyup 'left', => @angularVel = 0
    keyup 'right', => @angularVel = 0
    keyup 'up', => @power = off

  fire: ->
    params =
      x: @x
      y: @y
      dX: @dX + Math.sin(@foreAngle) * @muzzleVel
      dY: @dY - Math.cos(@foreAngle) * @muzzleVel
      radius: 1
    game.add new MovingObject(params)

  render: (ctx) ->
    shape = [[0,-10],[-4,3],[4,3]]

    ctx.restore()
    ctx.save()
    ctx.translate @x, @y
    ctx.rotate @foreAngle

    ctx.beginPath()
    ctx.moveTo shape[0][0], shape[0][1]
    ctx.lineTo shape[1][0], shape[1][1]
    ctx.lineTo shape[2][0], shape[2][1]
    ctx.closePath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 1.25
    ctx.stroke()
    ctx.restore()