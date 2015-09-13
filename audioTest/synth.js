var voice;
var kb;

window.onload = function() {

  voice = new Voice(new window.AudioContext(),"square",100,500,500,500);
   
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
  }
  
  kb.keyUp = function (note, frequency) {
    voice.noteOff(note);
  }

};

