// JavaScript Document
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
 
//these are the variables which will be referenced by the index page
var snd_someSound1;
var snd_someSound2;
var snd_someMusic1;
 
//buffer loader loads
var bufferLoader;
 
//buffer loader is a js class used to load multiple files
bufferLoader = new BufferLoader(
    context,
    [
     'audio/some-sound1.mp3',
     'audio/some-sound2.mp3',
     'audio/some-music1.mp3'
    ],
    finishedLoading
 );
 
 bufferLoader.load();
 
 //callback once all the files have loaded
function finishedLoading(bufferList) {
 
      //create the source sound containers
      snd_someSound1 = context.createBufferSource();
      snd_someSound2 = context.createBufferSource();
      snd_someMusic1 = context.createBufferSource();
 
      //add buffers to the containers and accociate them with the loaded files. (Same order they were loaded in
      snd_someSound1.buffer = bufferList[0];
      snd_someSound2.buffer = bufferList[1];
      snd_someMusic1.buffer = bufferList[2];
 
     //sounds are ready to be played
}
 
//We will call this function from the index file
//it might look messy/crazy, but every time you want to play/replay a sound in Web Audio, you need to re-create the contect and connection.
function playSound(sound, volume, loop)
{
      //set some default values for the functions volume and loop parameters
      volume = typeof volume !== 'undefined' ? volume : 1;
      loop = typeof loop !== 'undefined' ? loop : false;
 
      var source = context.createBufferSource(), g = context.createGain();
      source.buffer = sound.buffer;
      source.loop = loop;
      g.gain.value = volume;
      source.connect(g);
      g.connect(context.destination);
      source.start(0);
}
