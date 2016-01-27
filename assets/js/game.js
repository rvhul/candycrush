var Game;

Game = {
  shapes: ["bomb", "diamond", "heart", "star"],
  randomShapeClass: function() {
    return "fa-" + Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
  },
  init: function() {
    return $.each($(".cell i"), function(i, ele) {
      return $(ele).addClass(Game.randomShapeClass);
    });
  }
};

$(function() {
  return Game.init();
});
