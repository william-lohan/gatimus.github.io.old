/**
 * --
 * @class Actor
 * @pram {Object} data
 */
function Actor(data) {
	var spriteSheet = new createjs.SpriteSheet(data.sprite_sheet);
	createjs.Sprite.call(this, spriteSheet, "init");
	this.data = data;
	this.x = data.x | 0;
	this.y = data.y | 0;
	this.speedFactor = data.speedFactor | 1;
	this.onTick = data.onTick;
	this.queue = {};
}
Actor.prototype = Object.create(createjs.Sprite.prototype);
/**
 * --
 * @class Actor
 * @pram {Number} speed
 */
Actor.prototype.update = function(speed) {
	if(this.queue.move){
		this.x += this.queue.x*speed;
		this.y += this.queue.y*speed;
	}
	this.queue.move = false;

	//onTick
	if(this.onTick) {
		this.x += this.onTick.x*speed;
		this.y += this.onTick.y*speed;
	}

	//kill
	if(this.data.kill){
		if(this.data.kill.x < 0){
			if(this.x < this.data.kill.x){
				this.parent.removeChild(this);
			}
		}
		if(this.data.kill.x > 0){
			if(this.x > this.data.kill.x){
				this.parent.removeChild(this);
			}
		}
	}

	//bounds
	if(this.data.bounds){
		if(this.x < this.data.bounds[0]){this.x = this.data.bounds[0];}
		if(this.y < this.data.bounds[1]){this.y = this.data.bounds[1];}
		if(this.x > this.data.bounds[2]){this.x = this.data.bounds[2];}
		if(this.y > this.data.bounds[3]){this.y = this.data.bounds[3];}
	}

};
/**
 * --
 * @class Actor
 * @pram {Number} x
 * @pram {Number} y
 */
Actor.prototype.move = function(x, y) {
	this.queue.move = true;
	this.queue.x = x;
	this.queue.y = y;
};
/**
 * --
 * @class Actor
 * @pram {Number} code
 */
Actor.prototype.action = function(code) {
	this.queue.action = true;
	this.queue.code = code;
};


/**
 * --
 * @class BackGround
 * @pram {Object} data
 */
function BackGround(data) {
	Actor.call(this, data);
	this.startingX = data.x | 0;
}
BackGround.prototype = Object.create(Actor.prototype);
/**
 * --
 * @class BackGround
 * @pram {Number} speed
 */
BackGround.prototype.update = function(speed) {
	Actor.prototype.update.call(this,speed);
	if(this.x < this.startingX-1280){
		this.x = this.startingX;
	}
};


//var machina = require('machina');
/**
 * --
 * @class Ship
 * @pram {Object} data
 */
function Ship(data) {
	Actor.call(this, data);
	this.state = new machina.Fsm(shipState);
	//this.state = new ShipStateIdle(this);
}
Ship.prototype = Object.create(Actor.prototype);
/**
 * --
 * @class Ship
 * @pram {Number} speed
 */
Ship.prototype.update = function(speed) {
	Actor.prototype.update.call(this,speed);
	//
	//if(!this.queue.action){
		//this.state = new ShipStateIdle(this);
	//}
	this.state.update(this.queue,action);
	this.queue.action = false;
};
/**
 * --
 * @class Ship
 * @pram {Number} code
 */
Ship.prototype.action = function(code) {
	this.queue.action = true;
	switch(code) {
		case 0:
			this.state.fire();
			break;
		case 1:
			this.state.charge();
			break;
		case 2:
			//
			break;
		case 3:
			//
			break;
		default:
			//default
	}
	//console.log(this.data.action_0.type);
	switch(this.data.action_0.type){
		case "SPAWN"://this.x+52, this.y+28,
			//this.state.fire(this);
			break;
	}
};
/**
 * --
 * @class Ship
 */
Ship.prototype.fire = function(){
	this.data.action_0.data.x = this.x+52;
	this.data.action_0.data.y = this.y+28;
	this.parent.spawn(this.data.action_0.data);
};
/**
 * --
 * @class Ship
 */
Ship.prototype.charge = function(){
	this.data.action_1.data.x = this.x+52;
	this.data.action_1.data.y = this.y+28;
	this.parent.spawn(this.data.action_1.data);
};

var shipState = {
  initialize: function(data) {
    //init
  },
  namespace: "ship-state",
  initialState: "idle",
  states: {
    idle: {
      _onEnter: function() {
        
      },
      fire: function(ship) {
        ship.fire();
        this.transition(ship, "firing");
      },
      charge: function(ship) {
        ship.charge();
        this.transition(ship, "charging");
      },
      update: function() {
        
      },
      _onExit: function() {
        
      }
    },
    firing: {
      _onEnter: function() {
        
      },
      fire: function() {
        //already
      },
      charge: function(ship) {
        ship.charge();
        this.transition(ship, "charging");
      },
      update: function(still) {
        if(!still){
          this.transition(still, "idle");
        }
      },
      _onExit: function() {
        
      }
    },
    charging:  {
      _onEnter: function() {
        
      },
      fire: function(ship) {
        ship.fire();
        this.transition(ship, "firing");
      },
      charge: function(ship) {
        if(!ship.charge){
          ship.charge = 0;
        }
        ship.charge ++;
      },
      update: function(still) {
        if(!still){
          this.transition(still, "idle");
        }
      },
      _onExit: function() {
        
      }
    }
  },
  fire: function(ship){
    this.handle(ship,"fire");
  },
  charge: function(ship){
    this.handle(ship,"charge");
  },
  update: function(still){
    this.handle(still,"update");
  }
};


/*
function ShipStateIdle(ship){
	this.ship = ship;
}
ShipStateIdle.prototype.fire = function(){
	this.ship.fire();
	this.ship.state = new ShipStateFiring(this.ship);
}
ShipStateIdle.prototype.charge = function(){
	this.ship.charge();
	this.ship.state = new ShipStateCharging(this.ship);
}

function ShipStateFiring(ship){
	this.ship = ship;
}
ShipStateFiring.prototype.fire = function(){
	//already firing
}
ShipStateFiring.prototype.charge = function(){
	this.ship.charge();
	this.ship.state = new ShipStateCharging(this.ship);
}

function ShipStateCharging(ship){
	this.ship = ship;
	this.charge = 0;
}
ShipStateCharging.prototype.fire = function(){
	this.ship.fire();
	this.ship.state = new ShipStateFiring(this.ship);
}
ShipStateCharging.prototype.charge = function(){
	this.charge ++;
	if(this.charge > 10){
		//change state to ChargeFiring
	}
}
*/