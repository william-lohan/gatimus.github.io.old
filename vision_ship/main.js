
var stage;
var bg1;
var bg2;
var animation;
var paused = false;
var moveWindow = false;

var score = 0;
var highScore = 0;

var mouse = {
  x: 0,
  y: 0
};

var Key = {
  pressed: {},

  LEFT: 37 || 65,
  UP: 38|| 87,
  RIGHT: 39 || 68,
  DOWN: 40 || 83,
  
  isDown: function(keyCode) {
    return this.pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};


$( document ).ready(function() {
  init();
  
  window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  });
  
  window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected from index %d: %s",
      e.gamepad.index, e.gamepad.id);
  });
  
});

function init() {
  
  stage = new createjs.Stage("demoCanvas");
  
  var data = {
    images: ["star.png"],
    frames: {width:256, height:8, count:2},
    animations: {
      bg1: 0,
      bg2: 1
    }
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  

  bg1 = new createjs.Sprite(spriteSheet, "bg1");
  bg1.y = 480 * Math.random();
  bg1.x = 640;

  
  bg2 = new createjs.Sprite(spriteSheet, "bg2");
  bg2.y = 480 * Math.random();
  bg2.x = 640;


  animation = new Gatimus();
  
  
  stage = new createjs.Stage("demoCanvas");
  stage.addChild(bg1, bg2, animation);
  

  createjs.Ticker.addEventListener("tick", vBlank);
  
  
  $(document).keydown(function(event){Key.onKeydown(event);});
  $(document).keyup(function(event){Key.onKeyup(event);});
  
  
	$(document).mousemove(function( event ) {
    $("#debug").text(event.clientX + "," + event.clientY);
    var moveX = event.clientX - mouse.x;
    var moveY = event.clientY - mouse.y;
    if(moveWindow){
      var currentX = $("#help_dialog").css("left");
      console.log(currentX);
      var currentY = $("#help_dialog").css("top");
      $("#help_dialog").css({
        left: '+=' + moveX + 'px',
        top: '+=' + moveY + 'px'
      });
    }
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

				
  
}


function vBlank(event){
  var delta = event.delta / createjs.Ticker.interval;
  if(!paused){
    if(Key.isDown(27)){
      setPaused(true);
    }
    animation.move(
      Key.isDown(Key.UP),
      Key.isDown(Key.LEFT),
      Key.isDown(Key.DOWN),
      Key.isDown(Key.RIGHT)
    );
  
    var gamepads = navigator.getGamepads();
    var pad = gamepads[0];
    if (pad){
      animation.move(
        pad.buttons[12].pressed,
        pad.buttons[14].pressed,
        pad.buttons[13].pressed,
        pad.buttons[15].pressed
      );
      
      animation.move(
        pad.axes[1] < -0.5,
        pad.axes[0] < -0.5,
        pad.axes[1] > 0.5,
        pad.axes[0] > 0.5
      );
    }
  
    bg1.x -= 20 * delta;
    if(bg1.x < -60){
      bg1.y = 480 * Math.random();
      bg1.x = 640;
      score ++;
    }
    bg2.x -= 9 * delta;
    if(bg2.x < -60){
      bg2.y = 480 * Math.random();
      bg2.x = 640;
      score ++;
    }
    
    var pt = bg1.localToLocal(0,0,animation);
		if (animation.hitTest(pt.x, pt.y)) {
		  score = 0;
		  console.log('Hit!');
		}
		
    pt = bg2.localToLocal(0,0,animation);
		if (animation.hitTest(pt.x, pt.y)) {
		  score = 0;
		  console.log('Hit!');
		}
		
    if(score > highScore){
      highScore = score;
    }
    $("#score_value").text(score);
    $("#high_score_value").text(highScore);
  
    stage.update();
  } else {
    if(Key.isDown(27)){
      setPaused(false);
    }
  }

}

function setPaused(x){
  if(x){
    paused = true;
    $("#overlay").show();
    $("#pause").show();
  } else {
    paused = false;
    $("#overlay").hide();
    $("#pause").hide();
  }
}

function help(x){
  if(x){
    setPaused(true);
    $("#help_dialog").show();
  } else {
    setPaused(false);
    $("#help_dialog").hide();
  }
}

