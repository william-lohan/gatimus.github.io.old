function MIDI(nav) {
  nav.requestMIDIAccess({sysex: true}).then(this.success, this.fail);
}

MIDI.prototype.success = function(access) {
  this.access = access;
  for (var input in this.access.inputs) {
    console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
      "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      "' version:'" + input.version + "'" );
  }
  for (var output in this.access.outputs) {
    console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
      "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
      "' version:'" + output.version + "'" );
  }
  
  function onMIDIMessage( event ) {
    var str = "MIDI message received at timestamp " + event.timestamp + "[" + event.data.length + " bytes]: ";
    for (var i=0; i<event.data.length; i++) {
      str += "0x" + event.data[i].toString(16) + " ";
    }
    console.log( str );
  }
  
  function startLoggingMIDIInput( midiAccess, indexOfPort ) {
    midiAccess.inputs.forEach( function(entry) {entry.value.onmidimessage = onMIDIMessage;});
  }
  
  startLoggingMIDIInput(this.access);
};

MIDI.prototype.fail = function(msg) {
  console.log(msg);
};

