/**
 * --
 * @class Game
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {Object} hud
 * @pram {Number} speed
 */
function Game(canvas, hud, fps, speed) {
	this.canvas = canvas;
	//TODO hud
	createjs.Ticker.framerate = fps;
	this.baseSpeed = (20/fps)*speed;
	this.adjustedSpeed = this.baseSpeed;
	
	
	//setup preload
	this.queue = new createjs.LoadQueue();
	this.queue.installPlugin(createjs.Sound);
	this.queue.on("error", function(event){
	  console.error(event.title, event.message, event.data);
	});
	this.queue.on("progress", function(event){
	  document.getElementById("progress").update(event.progress);
	});
	
	//setup state
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
  this.adjustedSpeed = (event.delta/createjs.Ticker.interval)*this.baseSpeed;
  
	if(!event.paused){
		this.state.loop(this);
		//var playerCommands = input.handleInput();
		//(this.level){
			//for (var i = 0; i < playerCommands.length; i++) {
				//playerCommands[i].execute(this.level.getChildByName("PLAYER"));
			//}
			//this.level.update(this.speed);
		//}
		
	//}// else {
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
	$.getJSON(levelURL, null, function(data, textStatus, jqXHR) {
		callBack(data);
	});
	*/
	
	this.queue.on("complete", callBack);
	this.queue.loadManifest(levelURL);
	
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
    loading: {
      _onEnter: function(game){
        document.getElementById("progress").update(0);
        document.getElementById("loading").style.visibility = "visible";
      },
      _onExit: function(game){
        document.getElementById("loading").style.visibility = "hidden";
      }
    },
    title: {
      _onEnter: function(game){
        console.log("Game State: Title Screen");
        game.next = "./levels/title_manifest.json";
        
        game.loadLevel(game.next, function(event){
          var data = game.queue.getResult("level");
          game.next = data.next;
          game.level = new Level(game.canvas, game.queue);
          document.getElementById("title-text").style.visibility = "visible";
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
        if(game.level){
          game.level.update(game.adjustedSpeed);
        }
      },
      start: function(game){
        this.transition(game, "level");
      },
      _onExit: function(game){
        document.getElementById("title-text").style.visibility = "hidden";
      }
    },
    level: {
      _onEnter: function(game){
        console.log("Game State: Level");
        game.loadLevel(game.next, function(data){
          game.next = data.next;
          game.level = new Level(game.canvas, data);
          document.getElementById("HUD").style.visibility = "visible";
        });
      },
      loop: function(game){
    
        var commands = input.handleInput();
        for(var i = 0; i < commands.length; i++){
          if(game.level){
            
            commands[i].execute(game.level.getChildByName("PLAYER"));

			      
          }
        }
        if(game.level){
          game.level.update(game.adjustedSpeed);
        }
        
      },
      gameOver: function(game){
        this.transition(game, "highScore");
      },
      pause: function(game){
        this.transition(game, "paused");
      },
      _onExit: function(game){
        document.getElementById("HUD").style.visibility = "hidden";
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
