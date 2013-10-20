Asteroids
===
* An implementation of the classic Asteroids game in JavaScript
* [Play here!](http://ilyakavalerov.com/asteroids/asteroids.html)
* ![image](http://imgur.com/Jt3dbey.gif)


##TODO:
* Don't iterate through asteroids to check for collisions, implement a [quadtree](https://github.com/ilyakava/asteroids_redo)
    * [example](https://github.com/silflow/quadtree-javascript/blob/master/quadtree.js)
    * Quadtree at this point is a reimplementation of [silflow's quadtree](https://github.com/silflow/quadtree-javascript)
    * could we also use a [kd-tree](http://en.wikipedia.org/wiki/Kd-tree) for just 2 dimensions?
* Don't use circle asteroids
    *  check for collisions with [SAT](http://gamedev.tutsplus.com/tutorials/implementation/collision-detection-with-the-separating-axis-theorem/)
    *  
