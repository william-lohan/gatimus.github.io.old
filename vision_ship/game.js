/**
 * --
 * @class Game
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {Object} hud
 * @pram {number} fps
 * @pram {number} speed
 */
function Game(canvas, hud, fps, speed) {
	this.canvas = canvas;
	//hud
	createjs.Ticker.framerate = fps;
	this.baseSpeed = (20/fps)*speed;
	this.level = new Level(canvas, {});
	/*
	createjs.Ticker.addEventListener("tick", function(event){
		console.log(this.level);
	});
	*/
	console.log('New Game: ' + this.level);
}

/**
 * --
 * @class Game
 * @pram {Object} event
 */
Game.prototype.loop = function(event){
	var level = this.level;
	console.log(level);
	if(!event.paused){
		var speed = (event.delta/createjs.Ticker.interval)*this.baseSpeed;
		//read input
		this.level.update(speed);
	} else {
		//
	}
	console.log('Game Loop');
};


/**
 * --
 * @class Game
 * @pram {boolean} paused
 */
Game.prototype.setPaused = function(paused) {
	createjs.Ticker.paused = paused;
	//
};

//Game.prototype.constructor = Game;
