Game =
  # FontAwesome shapes of game pieces within an array.
  shapes: ["bomb", "diamond", "heart", "star", "rocket", "user"]
  # Generate a random shape by adding 'fa-' class to the value in the shapes array on above.
  # Math.floor rounds down number (ie. 5.6 = 5).
  # Math.random generates a random number, in this case based on the length of the shapes array (which is 3 in index values).
  # Shapes array -> Math.floor rounding the number down -> Randomizing the value based on the length of the array -> Adding 'fa-' to that to achieve a different icon every time.
  randomShapeClass: ->
    "fa-" + Game.shapes[Math.floor(Math.random()*Game.shapes.length)]
  # Initializing the shape with the randomly generated class.
  init: ->
    $.each $(".cell i"), (i, ele) -> $(ele).addClass Game.randomShapeClass

$ ->
  Game.init()
