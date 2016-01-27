Game =
  # FontAwesome shapes of game pieces within an array.
  shapes: ["bomb", "diamond", "heart", "star", "rocket", "user"]

  # Generate a random shape by adding 'fa-' class to the value in the shapes array on above.
  # Math.floor rounds down number (ie. 5.6 = 5).
  # Math.random generates a random number, in this case based on the length of the shapes array (which is 3 in index values).
  # Shapes array -> Math.floor rounding the number down -> Randomizing the value based on the length of the array -> Adding 'fa-' to that to achieve a different icon every time.
  randomShapeClass: ->
    "fa-" + Game.shapes[Math.floor(Math.random()*Game.shapes.length)]

  # Populating the cells with randomly generated shape classes.
  populateCellsWithShapes: ->
    $.each $(".cell i"), (i, ele) -> $(ele).addClass Game.randomShapeClass

  # Change data attribute to 'cell' class within row to increment row by row, column by column -- an automated method instead of manually typing it out for each cell.
  populateCellsWithCoordinates: ->
    rowNo = 1
    $.each $("#board .row"), (i, row) ->
        colNo = 1
        $.each $(ele).children(".cell"), (j, cell) ->
          cell.dataset.rowNo = rowNo
          cell.dataset.colNo = colNo
        colNo++
        rowNo++

  checkMatches: ->
    console.log "Checking matches"

# Initialize functions to work in tandem within the Game object.
init: ->
  Game.populateCellsWithShapes()
  Game.populateCellsWithCoordinates()
  Game.checkMatches()

# Initializing the entire game.
$ ->
  Game.init()
