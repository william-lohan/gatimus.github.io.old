function Voice(context, shape, attack, decay, sustain, release){
  this.audioContext = context;
  this.shape = shape;
  this.attack = attack;
  this.decay = decay;
  this.sustain = sustain;
  this.release = release;
  this.envelope = this.audioContext.createGain();
  this.envelope.connect(this.audioContext.destination);
  this.osc = new Map();
  this.keys = new Map();
  var notes= [];
  var a = 440; // a is 440 hz...
  for (var x = 0; x < 127; ++x){
     notes[x] = a * Math.pow(2, (x - 69.0) / 12.0);
  }
}

Voice.prototype.noteOn = function(note, hz){
  console.log(this);
  this.keys.set(note, true);
  //this.envelope.set(note, this.audioContext.createGain());
  this.osc.set(note, this.audioContext.createOscillator());
  var now = this.audioContext.currentTime;
  
  this.envelope.gain.setValueAtTime(0, now); //start
  this.envelope.gain.linearRampToValueAtTime(1, now + this.attack / 1000); //attack
  this.envelope.gain.linearRampToValueAtTime(this.sustain / 1000, now + this.decay / 1000); //decay
  /*
  this.envelope.get(note).connect(this.audioContext.destination);
  this.envelope.get(note).gain.setValueAtTime(0, now); //start
  this.envelope.get(note).gain.linearRampToValueAtTime(1, now + this.attack / 1000); //attack
  this.envelope.get(note).gain.linearRampToValueAtTime(this.sustain / 1000, now + this.decay / 1000); //decay
  */
  this.osc.get(note).frequency.value = hz;
  this.osc.get(note).type = this.shape;
  this.osc.get(note).connect(this.envelope);
  
  this.osc.get(note).start(0);
};

Voice.prototype.noteOff = function(note){
  this.keys.set(note, false);
  
  this.osc.get(note).stop(0);
  this.osc.get(note).disconnect(this.envelope);
  //this.envelope.get(note).disconnect(context.audioContext.destination);
  
  /* keep this
  var now = this.audioContext.currentTime;
  this.envelope.get(note).gain.linearRampToValueAtTime(0, now + this.release / 1000);//release
  var kill = function(context, note){
    if(!context.keys.get(note)){
    	context.osc.get(note).stop(0);
    	context.osc.get(note).disconnect(context.envelope.get(note));
    	context.envelope.get(note).disconnect(context.audioContext.destination);
    }
  };
  window.setTimeout(
    kill,
    this.release,
    this,
    note
  );
  */
  
};

Voice.prototype.playNote = function(hz, duration){
  this.noteOn(hz);
  window.setTimeout(this.noteOff, duration);
};