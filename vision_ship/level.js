/**
 * --
 * @class Level
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {String | Object} levelData 
 */
function Level(canvas, levelData) {
	createjs.Stage.call(this, canvas);
	this.levelData = levelData;
	this.ticks = 0;
}

Level.prototype = Object.create(createjs.Stage.prototype);

/**
 * --
 * @class Level
 * @pram {Number} speed
 */
Level.prototype.update = function(speed){

	for (var i = 0; i < this.levelData.events.length; i++) {
		var event = this.levelData.events[i];
		if(event.ticks == this.ticks){
			switch(event.type){
				case "SPAWN":
					this.spawn(event.data);
					break;
				default:
					//default
			}
		}
	}

	for (var i = 0; i < this.children.length; i++) {
		if(this.children[i].update){
			this.children[i].update(speed);
		}
	}

	//console.log(this.children.length);


	createjs.Stage.prototype.update.call(this);//call super
	this.ticks ++;
};

Level.prototype.spawn = function(data) {
	console.log(data);
	var entity;
	switch(data.type){
		case "BG":
			entity = new BackGround(data);
			break;
		case "PLAYER":
			entity = new Ship(data);
			entity.name = "PLAYER";
			break;
		default:
			entity = new Actor(data);
	}
	return this.addChild(entity);
};