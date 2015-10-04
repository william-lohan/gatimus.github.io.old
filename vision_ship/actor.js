/**
 * --
 * @class Actor
 * @pram {Object} data
 */
function Actor(data) {
	createjs.Sprite.call(this, data.sprite_sheet, "run");
	this.x = data.x | 0;
	this.y = data.y | 0;
	this.speedFactor = data.speedFactor | 1;
	this.onTick = data.onTick | null;
}

Actor.prototype = Object.create(createjs.Sprite.prototype);

/**
 * --
 * @class Actor
 * @pram {number} speed
 */
Actor.prototype.update = function(speed) {
	//
	if(this.onTick) {
		this.onTick(speed);
	}
};