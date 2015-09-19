var voice;
var kb;
var midi;
var readFile;
var playFile;

window.onload = function() {

  voice = new Voice(new window.AudioContext(),"square",100,200,500,100);
  
  //midi = new MIDI(navigator);
   
  kb = new QwertyHancock({id: "kb",
                 width: 1200,
                 height: 200,
                 octaves: 4,
                 startNote: 'C2',
                 whiteNotesColour: 'white',
                 blackNotesColour: 'black',
                 hoverColour: '#ff185c'});
  
  kb.keyDown = function (note, frequency) {
    voice.attack = document.getElementById("attack").value;
    voice.decay = document.getElementById("decay").value;
    voice.sustain = document.getElementById("sustain").value;
    voice.release = document.getElementById("release").value;
    voice.shape =document.querySelector('input[name="waveform"]:checked').value;
    voice.noteOn(note, frequency);
  };
  
  kb.keyUp = function (note, frequency) {
    voice.noteOff(note);
  };
  
  playFile = function(data) {
    		var midiFile=new MIDIFile(data.target.result);
				var events=midiFile.getMidiEvents();
				function play(){
  				for (var i = 0; i < events.length; i++){
  				  var event = events[i];
  				  
  				  if (event.channel == 0) {
  
              var hz = 440.0 * Math.pow(2, (event.param1 - 69.0) / 12.0);
  				    if (event.subtype == 8){ //off
  				      console.log(event);
  				      window.setTimeout(kb.keyUp, event.playTime, event.param1, hz);
  				    } else if (event.subtype == 9) { //on
  				      console.log(event);
  				      window.setTimeout(kb.keyDown, event.playTime, event.param1, hz);
  				    }
  				  }
  				  if (i == events.length-1){
  				    window.setTimeout(play, event.playTime);
  				  }
  				}
				}
				play();
  };
  
  readFile = function(input) {
    	var reader = new FileReader();
			reader.readAsArrayBuffer(input.files[0]);
			reader.onloadend=playFile;
  };

};

