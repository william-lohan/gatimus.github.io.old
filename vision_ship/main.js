
var engine;
var game;
var input;



var stage;
var bg1, bg2, bg3, bg1e, bg2e, bg3e;
var shape;
var animation;
var paused = false;
var moveWindow = false;

var score = 0;
var highScore = 0;

var args = new (function (sSearch) {
  if (sSearch.length > 1) {
    for (var aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
      aItKey = aCouples[nKeyId].split("=");
      this[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
    }
  }
})(window.location.search);

alert(args);


$( document ).ready(function() {
  /*
  var preload = new createjs.LoadQueue(true, "./assets/");
  preload.installPlugin(createjs.Sound);
  preload.on("complete", function(event){
    console.log(event);
    $(".progress-container").hide();
    init();
  });
  preload.on("error", function(event){
    console.log(event);
    alert(event.title,event.message);
  });
  preload.on("progress", function(event){
    console.log(event);
    var pcent = Math.round(event.progress*100).toString() + "%";
    var progressBar = $(".progress-bar");
    progressBar.css("width", pcent);
    $(".progress").text(pcent);
  });
  preload.loadManifest([
    {id: "shot", src: "shot.mp3"},
    {id: "shotw", src: "shot.wav"}
  ]);
*/

/*full screen?
  var c = document.getElementById("game");
  var s = 1;
  if(window.innerWidth < window.innerHeight){
    s = window.innerWidth/640;
  } else if(window.innerHeight < window.innerWidth){
    s = window.innerHeight/480;
  }
  

  $("#game").css("transform", "scale(" + s.toString() + ", " + s.toString() + ") translate(30%, 20%)");
  //$("#game").css("left", "0");
  //$("#game").css("top", "0");
  //$("#game").css("transform", "translate(50%, 50%)");

  //c.style.
  //c.setAttribute('style',"transform: scale(" + s.toString() + ", " + s.toString() + ");");
  //c.setAttribute('style',"left: 50%; top: 50%; transform: translate(-50%, -50%);");
  */





  init();
});

function init() {

  game = new Game("gameCanvas", {}, 60, 10);

  input = new Input();
  
  //Keyboard
  window.addEventListener("keydown", function(event){
    input.onKeyDown(event);
  });
  window.addEventListener("keyup", function(event){
    input.onKeyUp(event);
  });
  
  //Mouse
  window.addEventListener("mousemove", function(event){
    input.onMouseMove(event);
  });
  window.addEventListener("mousedown", function(event){
    input.onMouseDown(event);
  });
  window.addEventListener("mouseup", function(event){
    input.onMouseUp(event);
  });

  //GamePad
  window.addEventListener("gamepadconnected", function(event){
    input.gamePadConnected(event);
  });
  window.addEventListener("gamepaddisconnected", function(event){
    input.gamePadDisconnected(event);
  });

  /*
  var next = "./levels/title.json";
  
  game.loadLevel(next, function(data){
    next = data.next;
    game.level = new Level(game.canvas, data);
  });
  */

  createjs.Ticker.addEventListener("tick", function(event){
    game.loop(event, input);
  });

  //engine = new Engine("gameCanvas", {}, 60);
  //engine.start();


  /*
	$(document).mousemove(function( event ) {
    //$("#debug").text(event.clientX + "," + event.clientY);
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
*/

				
  
}


function vBlank(event){
  var delta = event.delta / createjs.Ticker.interval;
  $("#debug").text("FPS: " + Math.round(1/event.delta*1000));
  if(!paused){
    if(Key.isDown(27)){
      setPaused(true);
    }
    animation.move(
      Key.isDown(Key.UP || 65),
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
    
    var bgSpeed = 5;
    bg1.x -= ((bgSpeed*0.45)*0.45) * delta;
    if(bg1.x < -1280){
      bg1.x = 0;
      score ++;
    }
    bg1e.x = bg1.x+1280;
    bg2.x -= (bgSpeed*0.45) * delta;
    if(bg2.x < -1280){
      bg2.x = 0;
      score ++;
    }
    bg2e.x = bg2.x+1280;
    bg3.x -= bgSpeed * delta;
    if(bg3.x < -1280){
      bg3.x = 0;
      score ++;
    }
    bg3e.x = bg3.x+1280;
    
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
    
    for(var i = 0; i < stage.children.length; i++){
      if (typeof stage.getChildAt(i).update === "function") { 
        stage.getChildAt(i).update(delta);
      }
    }
  
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

