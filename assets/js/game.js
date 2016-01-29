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
  coordinatesOfCell: function(cell) {
    var colNo, rowNo;
    colNo = parseInt(cell.dataset.colNo);
    rowNo = parseInt(cell.dataset.rowNo);
    return [rowNo, colNo];
  },
  handleCellClick: function(cell) {
    var absDiff, colNo, coords, orgColNo, orgRowNo, rowNo;
    if (Game.selectedCell === null) {
      return Game.selectCell(cell);
    } else {
      coords = Game.coordinatesOfCell(cell);
      rowNo = coords[0];
      colNo = coords[1];
      coords = Game.coordinatesOfCell(Game.selectedCell);
      orgRowNo = coords[0];
      orgColNo = coords[1];
      absDiff = [Math.abs(rowNo - orgRowNo), Math.abs(colNo - orgColNo)].sort();
      if (absDiff[0] === 0 && absDiff[1] === 1) {
        return console.log("Neighbor Clicked");
      } else {
        return Game.deselectCell();
      }
    }
  },
  selectCell: function(cell) {
    var colNo, coords, rowNo;
    Game.selectedCell = cell;
    $(cell).children('i').addClass('pulse');
    coords = Game.coordinatesOfCell(cell);
    rowNo = coords[0];
    colNo = coords[1];
    Game.highlightCell(Game.fetchCell(rowNo - 1, colNo));
    Game.highlightCell(Game.fetchCell(rowNo + 1, colNo));
    Game.highlightCell(Game.fetchCell(rowNo, colNo - 1));
    return Game.highlightCell(Game.fetchCell(rowNo, colNo + 1));
  },
  deselectCell: function() {
    $('.cell i').removeClass('rubberBand').removeClass('pulse');
    return Game.selectedCell = null;
  },
  bindCellsForClick: function() {
    return $('.cell').click(function() {
      return Game.handleCellClick(this);
    });
  },
  checkMatches: function() {
    return console.log("Checking matches");
  },
  init: function() {
    Game.rowCount = 0;
    Game.columnCount = 0;
    Game.deselectCell();
    Game.bindCellsForClick();
    Game.populateCellsWithShapes();
    Game.populateCellsWithCoordinates();
    Game.checkMatches();
    return Game.randomShapeClass();
  }
};

$(function() {
  return Game.init();
});
