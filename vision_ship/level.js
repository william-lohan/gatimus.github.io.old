/**
 * --
 * @class Level
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {Object} levelData 
 */
function Level(canvas, levelData) {
	this.levelData = levelData;
	createjs.Stage.call(this, canvas);

	//following code will be replaced by parsing levelData and generating level
	//var bg1, bg2, bg3, bg1e, bg2e, bg3e;
	var bg1Sprite = new createjs.SpriteSheet({
	images: ["bg1.png"],
	frames: {width:1280, height:480, count:1},
	animations: {
	  bg1: 0
	}
	});

	var bg2Sprite = new createjs.SpriteSheet({
	images: ["bg2.png"],
	frames: {width:1280, height:480, count:1},
	animations: {
	  bg2: 0
	}
	});

	var bg3Sprite = new createjs.SpriteSheet({
	images: ["bg3.png"],
	frames: {width:1280, height:480, count:1},
	animations: {
	  bg3: 0
	}
	});

	this.bg1 = new createjs.Sprite(bg1Sprite, "bg1");
	this.bg2 = new createjs.Sprite(bg2Sprite, "bg2");
	this.bg3 = new createjs.Sprite(bg3Sprite, "bg3");


	this.bg1e = new createjs.Sprite(bg1Sprite, "bg1");
	this.bg1e.x = 1280;
	this.bg2e = new createjs.Sprite(bg2Sprite, "bg2");
	this.bg2e.x = 1280;
	this.bg3e = new createjs.Sprite(bg3Sprite, "bg3");
	this.bg3e.x = 1280;


	this.animation = new Gatimus();

	createjs.Stage.prototype.addChild.call(this,this.bg1, this.bg2, this.bg3, this.bg1e, this.bg2e, this.bg3e, this.animation);
	//---
	console.log('New Level: ' + this);
}

Level.prototype = Object.create(createjs.Stage.prototype);

/**
 * --
 * @class Level
 * @pram {number} speed
 */
Level.prototype.update = function(speed){
	//
	var bgSpeed = speed/2;
    this.bg1.x -= ((bgSpeed*0.45)*0.45);
    if(this.bg1.x < -1280){
      this.bg1.x = 0;
      //score ++;
    }
    this.bg1e.x = this.bg1.x+1280;
    this.bg2.x -= (bgSpeed*0.45);
    if(this.bg2.x < -1280){
      this.bg2.x = 0;
      //score ++;
    }
    this.bg2e.x = this.bg2.x+1280;
    this.bg3.x -= bgSpeed;
    if(this.bg3.x < -1280){
      this.bg3.x = 0;
      //score ++;
    }
    this.bg3e.x = this.bg3.x+1280;
	//
	createjs.Stage.prototype.update.call(this);//call super
	console.log('Update Level');
};