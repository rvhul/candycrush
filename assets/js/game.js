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
    var rowNo;
    rowNo = 1;
    return $.each($("#board .row"), function(i, row) {
      var colNo;
      colNo = 1;
      $.each($(ele).children(".cell"), function(j, cell) {
        cell.dataset.rowNo = rowNo;
        return cell.dataset.colNo = colNo;
      });
      colNo++;
      return rowNo++;
    });
  },
  checkMatches: function() {
    return console.log("Checking matches");
  }
};

({
  init: function() {
    Game.populateCellsWithShapes();
    Game.populateCellsWithCoordinates();
    return Game.checkMatches();
  }
});

$(function() {
  return Game.init();
});
