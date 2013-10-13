class Node

  PARENT = 4
  TOP_LEFT = 0
  TOP_RIGHT = 1
  BOTTOM_LEFT = 2
  BOTTOM_RIGHT = 3

  constructor: (params) ->
    @contents = []
    @children = []

    @x = params.x
    @y = params.y
    @w = params.w
    @h = params.h
    @depth = params.depth
    @maxChildren = params.maxChildren or 2
    @maxDepth = params.maxDepth or 4

  insert: (item) ->
    if @children.length
      idx = @findInsertNode(item)
      if idx is PARENT
        @contents.push item
      else
        children[idx].insert(item)
    else
      @contents.push item
      if @contents.length > @maxChildren and @depth < maxDepth
        # making children takes care of current items
        @makeChildren()


  findInsertNode: (item) ->
    if item.x + item.w < @x + (@w / 2) # TopRight is within TLquad?
      # BottomRight is within TLquad? and so and so...
      if item.y + item.h < @y + (@h / 2) then return TOP_LEFT
      if item.y >= @y + (@h / 2) then BOTTOM_LEFT else PARENT
    else if item.x >= @x + (@w / 2)
      if item.y + item.h < @y + (@h / 2) then return TOP_RIGHT
      if item.y >= @y + (@h / 2) then BOTTOM_RIGHT else PARENT
    else
      PARENT

  findOverlappingNodes: (item, callback) -> 
    if item.x > @x + (@w / 2)
      if item.y < @y + (@h / 2) then callback(TOP_LEFT)
      if item.y + item.h >= @y + (@h / 2) then callback(BOTTOM_LEFT)
    if item.x + item.w >= @x + (@w / 2)
      if item.y < @y + (@h / 2) then callback(TOP_RIGHT)
      if item.y + item.h >= @y + (@h / 2) then callback(BOTTOM_RIGHT)
  
  makeChildren: ->
    wNew = @w / 2
    hNew = @h / 2
    depthNew = @depth + 1
    # clockwise, remember, x and y are not centers, but Top Lefts
    xTopLefts = [0, hNew, 0, hNew]
    yTopLefts = [0, 0, wNew, wNew]

    _(4).times (idx) =>
      @children.push new Node
        x: @x + xTopLefts[idx]
        y: @y + yTopLefts[idx]
        w: wNew
        h: hNew
        depth: depthNew
        maxChildren: @maxChildren
        maxDepth: @maxDepth

    # rebuild tree
    oldContents = @contents
    @contents = []
    _(oldContents).each (item) =>
      @insert item

  clear: ->
    # recursively empty a node
    _(@children).each (child) =>
      child.clear()
    @items = []
    @children = []