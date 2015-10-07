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
		moveY: 0,
		buttons: {}
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
Input.prototype.onMouseDown = function(event) {
	this.mouse.buttons[event.button] = true;
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onMouseUp = function(event) {
	this.mouse.buttons[event.button] = false;
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
 */
Input.prototype.getGamepads = function() {
	this.gamePads = navigator.getGamepads();
	console.log(this.gamePads[0].axes);
}

/**
 * --
 * @class Input
 * @pram {Object} event
 * @return
 */
Input.prototype.handleInput = function() {
	this.getGamepads();
	var commands = [];
	var x = 0;
	var y = 0;
	//var gamePads = navigator.getGamepads();
	if(this.gamePads[0]) { //use gamepad
		if(Math.abs(this.gamePads[0].axes[0]) > 0.25){x = this.gamePads[0].axes[0]};
		if(Math.abs(this.gamePads[0].axes[1]) > 0.25){y = this.gamePads[0].axes[1]};

		if(this.gamePads[0].buttons[0].pressed){
			commands.push(new Action(0));
		} else if(this.gamePads[0].buttons[1].pressed){
			commands.push(new Action(1));
		}
	} else { //use keyboard
		if(this.keyBoard[38] || this.keyBoard[87]){y = -1};
		if(this.keyBoard[37] || this.keyBoard[65]){x = -1};
		if(this.keyBoard[40] || this.keyBoard[83]){y = 1};
		if(this.keyBoard[39] || this.keyBoard[68]){x = 1};
		
		if(this.keyBoard[32]){
			commands.push(new Action(0));
		} else if(this.keyBoard[90]){
			commands.push(new Action(1));
		}
	}
	if(x != 0 || y != 0){
			commands.push(new Move(x, y));
		}
	return commands;
}