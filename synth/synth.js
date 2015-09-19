var voice, voiceSine, voiceSquare, voiceTriangle, voiceSawtooth;
var kb;
var midi;
var file = {};

window.onload = function() {
  
  
  
  var context = new window.AudioContext();
  
  voice = new Voice(context,"square",100,200,500,100);
  
  voiceSine = new Voice(context,"sine",100,200,500,0);
  voiceSquare = new Voice(context,"square",100,200,500,0);
  voiceTriangle = new Voice(context,"triangle",100,200,500,0);
  voiceSawtooth = new Voice(context,"sawtooth",100,200,500,0);
  
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

  
  var playNote = function(channel, number, hz){
    switch(channel) {
			case 0:
			  voiceSawtooth.noteOn(number, hz);
	      break;
      case 1:
        voiceTriangle.noteOn(number, hz);
        break;
      case 2:
        voiceSquare.noteOn(number, hz);
        break;
      case 3:
        voiceSine.noteOn(number, hz);
        break;
    }
  };
  
  var stopNote = function(channel, number, hz){
    switch(channel) {
			case 0:
			  voiceSawtooth.noteOff(number);
	      break;
      case 1:
        voiceTriangle.noteOff(number);
        break;
      case 2:
        voiceSquare.noteOff(number);
        break;
      case 3:
        voiceSine.noteOff(number);
        break;
    }
  };
  
  file.play = function(data) {
    
    		var midiFile=new MIDIFile(data.target.result);
				var events=midiFile.getMidiEvents();

  				for (var i = 0; i < events.length; i++){
  				  var event = events[i];
  				  var hz = 440.0 * Math.pow(2, (event.param1 - 69.0) / 12.0);

            if (event.subtype == 8){ //off
    		      setTimeout(stopNote, event.playTime, event.channel, event.param1, hz);
    		    } else if (event.subtype == 9) { //on
    		      setTimeout(playNote, event.playTime, event.channel, event.param1, hz);
    		    }

  				  if (i == events.length-1){
  				    //window.setTimeout(play, event.playTime);
  				  }
  				}

  };
  
  file.read = function(input) {
    	var reader = new FileReader();
			reader.readAsArrayBuffer(input.files[0]);
			reader.onloadend=this.play;
  };

};

