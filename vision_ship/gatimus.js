function Gatimus() {
    var data = {
    images: ["vision_ship.png"],
    frames: {width:64, height:64, count:3},
    animations: {
      run:[0,1,2]
    }
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  createjs.Sprite.call(this, spriteSheet, "run");
  this.delta = 10;
}

Gatimus.prototype = Object.create(createjs.Sprite.prototype);

Gatimus.prototype.move = function(up, left, down, right){
  if (up) this.y -= this.delta*2;
  if (left) this.x -= this.delta;
  if (down) this.y += this.delta*2;
  if (right) this.x += this.delta;
};