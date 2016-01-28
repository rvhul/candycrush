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
    $.each $(".cell i"), (i, ele) -> $(ele).addClass(Game.randomShapeClass).addClass('animated').addClass('infinite')

  # Change data attribute to 'cell' class within row to increment row by row, column by column -- an automated method instead of manually typing it out for each cell.
  populateCellsWithCoordinates: ->
    # Setting row and column values to 1 at the start of the loop
    rowNo = 1
    colNo = 1
    # Taking the .each module and applying it to an array of #board > .row to retrieve all the rows within the section #board - passing it two values index, value(row).
    $.each $("#board .row"), (i, row) ->
      # Setting column number to 1.
      colNo = 1
      # Now using the .each module again to select the child sub-class of .row which is .cell.
      $.each $(row).children('.cell'), (j, cell) ->
        # Adding the data-row-no data attribute to the html code on the browser end.
        cell.dataset.rowNo = rowNo
        cell.dataset.colNo = colNo
        colNo++
      rowNo++
    Game.rowCount = rowNo
    Game.columnCount = colNo

  fetchCell: (rowNo, colNo) ->
    selector = ".cell"
    selector += "[data-row-no='#{rowNo}']"
    selector += "[data-col-no='#{colNo}']"
    $(selector)

  highlightCell: (cell) ->
    $(cell).children('i').addClass('rubberBand')

  selectCell: (cell) ->
    if Game.selectedCell == null
      console.log "fgdfg"
      Game.selectedCell = cell
      $(cell).children('i').addClass('pulse')
      colNo = parseInt(cell.dataset.colNo)
      rowNo = parseInt(cell.dataset.rowNo)
      Game.highlightCell(Game.fetchCell(rowNo-1, colNo))
      Game.highlightCell(Game.fetchCell(rowNo+1, colNo))
      Game.highlightCell(Game.fetchCell(rowNo, colNo-1))
      Game.highlightCell(Game.fetchCell(rowNo, colNo+1))
    else
      Game.deselectCell()

  deselectCell: ->
    $('.cell i').removeClass('rubberBand').removeClass('pulse')
    Game.selectedCell = null

  bindCellsForClick: ->
    $('.cell').click ->
      Game.selectCell(@)

  checkMatches: ->
    console.log "Checking matches"

# Initialize functions to work in tandem within the Game object.
  init: ->
    Game.rowCount = 0
    Game.columnCount = 0
    # Game.selectedCell()
    Game.deselectCell()
    Game.bindCellsForClick()
    Game.populateCellsWithShapes()
    Game.populateCellsWithCoordinates()
    Game.checkMatches()
    Game.randomShapeClass()

# Initializing the entire game.
$ ->
  Game.init()
