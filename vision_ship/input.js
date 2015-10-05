/**
 * --
 * @class Input
 */
function Input(){
	this.keyBoard = {};
	this.mouse = {
		x: 0,
		y: 0,
		moveX: 0,
		moveY: 0
	};
	this.gamePads = {};
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onKeyDown = function(event) {
	this.keyBoard[event.keyCode] = true;
	//console.log(event);
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onKeyUp = function(event) {
	this.keyBoard[event.keyCode] = false;
	//console.log(event);
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onMouseMove = function(event) {
	this.mouse.moveX = event.clientX - this.mouse.x;
	this.mouse.moveY = event.clientY - this.mouse.y;
	this.mouse.x = event.clientX;
	this.mouse.y = event.clientY;
	//console.log(event);
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.gamePadConnected = function(event) {
	this.gamePads[event.gamepad.index] = event.gamepad;
	console.log(event);
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.gamePadDisconnected = function(event) {
	delete this.gamePads[event.gamepad.index];
	console.log(event);
}

/**
 * --
 * @class Input
 * @pram {Object} event
 * @return
 */
Input.prototype.handleInput = function() {
	var commands = [];
	var x = 0;
	var y = 0;
	//var gamePads = navigator.getGamepads();
	if(this.gamePads[0]) { //use gamepad
		//console.log(gamePads[0]);
	} else { //use keyboard
		if(this.keyBoard[38] || this.keyBoard[87]){y = -1};
		if(this.keyBoard[37] || this.keyBoard[65]){x = -1};
		if(this.keyBoard[40] || this.keyBoard[83]){y = 1};
		if(this.keyBoard[39] || this.keyBoard[68]){x = 1};
		if(x != 0 || y != 0){
			commands.push(new Move(x, y));
		}
		if(this.keyBoard[32]){
			commands.push(new Action(0));
		} else if(this.keyBoard[90]){
			commands.push(new Action(1));
		}
	}
	return commands;
}