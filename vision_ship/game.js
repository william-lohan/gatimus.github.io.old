/**
 * --
 * @class Game
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {Object} hud
 * @pram {Number} speed
 */
function Game(canvas, hud, fps, speed) {
	this.canvas = canvas;
	//hud
	createjs.Ticker.framerate = fps;
	this.baseSpeed = (20/fps)*speed;
	this.state = new machina.BehavioralFsm(gameState);
	this.state.transition(this, "title");
}

/**
 * --
 * @class Game
 * @pram {Object} event
 * @pram {Object} input
 */
Game.prototype.loop = function(event, input){
  this.speed = (event.delta/createjs.Ticker.interval)*this.baseSpeed;
  this.state.loop(this);
	if(!event.paused){
		
		//var playerCommands = input.handleInput();
		if(this.level){
			//for (var i = 0; i < playerCommands.length; i++) {
				//playerCommands[i].execute(this.level.getChildByName("PLAYER"));
			//}
			this.level.update(this.speed);
		}
		
	}// else {
		//
	//}
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

var gameState = {
  initialize: function(data) {
    //init
  },
  namespace: "game-state",
  initialState: "uninitialized",
  states: {
    uninitialized: {
        "*": function(game) {
            this.deferUntilTransition(game);
            this.transition(game, "title");
        }
    },
    title: {
      _onEnter: function(game){
        console.log("Game State: Title Screen");
        game.next = "./levels/title.json";
        
        game.loadLevel(game.next, function(data){
          game.next = data.next;
          game.level = new Level(game.canvas, data);
        });
      },
      loop: function(game){
        //not being called
        console.log("state loop");
        var commands = input.handleInput();
        for(var i = 0; i < commands.length; i++){
          console.log(commands[i]);
          switch(commands[i].code){
            case "start":
              this.transition(game, "level");
              break;
            default:
              //default
              break;
          }
        }
      },
      start: function(game){
        this.transition(game, "level");
      },
      _onExit: function(game){
        
      }
    },
    level: {
      _onEnter: function(game){
        console.log("Game State: Level");
        game.loadLevel(game.next, function(data){
          game.next = data.next;
          game.level = new Level(game.canvas, data);
        });
      },
      loop: function(game){
    
        var commands = input.handleInput();
        for(var i = 0; i < commands.length; i++){
          if(game.level){
            
            commands[i].execute(game.level.getChildByName("PLAYER"));
            
			      game.level.update(game.speed);
			      
          }
        }
        
      },
      gameOver: function(game){
        this.transition(game, "highScore");
      },
      pause: function(game){
        this.transition(game, "paused");
      },
      _onExit: function(game){
        
      }
    },
    paused: {
      _onEnter: function(game){
        console.log("Game State: Paused");
        createjs.Ticker.paused = true;
      },
      pause: function(game){
        this.transition(game, "level");
      },
      exit: function(game){
        this.transition(game, "title");
      },
      _onExit: function(game){
        createjs.Ticker.paused = false;
      }
    },
    highScore: {
      _onEnter: function(game){
        console.log("Game State: High Score");
      },
      exit: function(game){
        this.transition(game, "title");
      },
      _onExit: function(game){
        
      }
    }
  },
  loop: function(game){
    this.handle(game, "loop");
  },
  start: function(game){
    this.handle(game, "start");
  },
  pause: function(game){
    this.handle(game,"pause");
  },
  exit: function(game){
    this.handle(game, "exit");
  },
  gameOver: function(game){
    this.handle(game, "gameOver");
  }
};
