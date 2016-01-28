var Game;

Game = {
  shapes: ["bomb", "diamond", "heart", "star", "rocket", "user"],
  randomShapeClass: function() {
    return "fa-" + Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
  },
  populateCellsWithShapes: function() {
    return $.each($(".cell i"), function(i, ele) {
      return $(ele).addClass(Game.randomShapeClass);
    });
  },
  populateCellsWithCoordinates: function() {
    var colNo, rowNo;
    rowNo = 1;
    colNo = 1;
    $.each($("#board .row"), function(i, row) {
      colNo = 1;
      $.each($(row).children(".cell"), function(j, cell) {
        cell.dataset.rowNo = rowNo;
        cell.dataset.colNo = colNo;
        return colNo++;
      });
      return rowNo++;
    });
    Game.rowCount = rowNo;
    return Game.columnCount = colNo;
  },
  checkMatches: function() {
    return console.log("Checking matches");
  },
  init: function() {
    Game.rowCount = 0;
    Game.columnCount = 0;
    Game.populateCellsWithShapes();
    Game.populateCellsWithCoordinates();
    Game.checkMatches();
    return Game.randomShapeClass();
  }
};

$(function() {
  return Game.init();
});
