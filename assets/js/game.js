var Game;

Game = {
  shapes: ["bomb", "diamond", "heart", "star", "rocket", "user"],
  randomShapeClass: function() {
    return "fa-" + Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
  },
  populateCellsWithShapes: function() {
    return $.each($(".cell i"), function(i, ele) {
      return $(ele).addClass(Game.randomShapeClass).addClass('animated').addClass('infinite');
    });
  },
  populateCellsWithCoordinates: function() {
    var colNo, rowNo;
    rowNo = 1;
    colNo = 1;
    $.each($("#board .row"), function(i, row) {
      colNo = 1;
      $.each($(row).children('.cell'), function(j, cell) {
        cell.dataset.rowNo = rowNo;
        cell.dataset.colNo = colNo;
        return colNo++;
      });
      return rowNo++;
    });
    Game.rowCount = rowNo;
    return Game.columnCount = colNo;
  },
  fetchCell: function(rowNo, colNo) {
    var selector;
    selector = ".cell";
    selector += "[data-row-no='" + rowNo + "']";
    selector += "[data-col-no='" + colNo + "']";
    return $(selector);
  },
  highlightCell: function(cell) {
    return $(cell).children('i').addClass('rubberBand');
  },
  selectCell: function(cell) {
    var colNo, rowNo;
    $(cell).children('i').addClass('pulse');
    colNo = parseInt(cell.dataset.colNo);
    rowNo = parseInt(cell.dataset.rowNo);
    Game.highlightCell(Game.fetchCell(rowNo - 1, colNo));
    Game.highlightCell(Game.fetchCell(rowNo + 1, colNo));
    Game.highlightCell(Game.fetchCell(rowNo, colNo - 1));
    return Game.highlightCell(Game.fetchCell(rowNo, colNo + 1));
  },
  bindCellsForClick: function() {
    return $('.cell').click(function() {
      return Game.selectCell(this);
    });
  },
  checkMatches: function() {
    return console.log("Checking matches");
  },
  init: function() {
    Game.rowCount = 0;
    Game.columnCount = 0;
    Game.populateCellsWithShapes();
    Game.populateCellsWithCoordinates();
    Game.bindCellsForClick();
    Game.checkMatches();
    return Game.randomShapeClass();
  }
};

$(function() {
  return Game.init();
});
