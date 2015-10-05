/**
 * --
 * @class Game
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {Object} hud
 * @pram {Number} fps
 * @pram {Number} speed
 */
function Game(canvas, hud, fps, speed) {
	this.canvas = canvas;
	//hud
	createjs.Ticker.framerate = fps;
	this.baseSpeed = (20/fps)*speed;
}

/**
 * --
 * @class Game
 * @pram {Object} event
 */
Game.prototype.loop = function(event){
	if(!event.paused){
		var speed = (event.delta/createjs.Ticker.interval)*this.baseSpeed;
		var playerCommands = input.handleInput();
		if(this.level){
			for (var i = 0; i < playerCommands.length; i++) {
				playerCommands[i].execute(this.level.getChildByName("PLAYER"));
			};
			this.level.update(speed);
		}
		
	} else {
		//
	}
	//console.log('Game Loop');
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

/**
 * --
 * @class Game
 * @pram {String} levelURL
 */
Game.prototype.loadLevel = function(levelURL, callBack) {
	/*
	var request = new XMLHttpRequest();
	request.addEventListener("load", function(event){
		console.log(request.responseText);
		var levelData = JSON.parse(JSON.stringify(request.response));
		console.log(levelData.events);
	});
	request.open("GET", levelURL);
	request.send();
	*/
	
	$.getJSON(levelURL, null, function(data, textStatus, jqXHR) {
		callBack(data);
	});
	
	/*
	var preload = new createjs.LoadQueue();
	preload.addEventListener("fileload", function(event){
		console.log(event);
	});
	preload.loadFile(levelURL);
	*/
};
