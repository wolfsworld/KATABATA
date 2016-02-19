document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

function checkplatform(){
if(device.platform.toLowerCase() === "android"){
	return "/android_asset/www/";
}else{	return '';}
}

var mediaURL=checkplatform();

$(document).ready(function(){


var sounds = [];
var exercises = [];

var resource="/android_asset/www/";

sounds.push(new Media(""+mediaURL+"sounds/go.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/rest.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/whip.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/heartbeat.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/applause.mp3"));

exercises.push(new Media(""+mediaURL+"sounds/ex1.mp3",onSuccess, onError, onStatus));

function onSuccess(){}
function onError(error){}
function onStatus(status){
if( status==Media.MEDIA_STOPPED ) {
			movetogo();
        }else{}}


var ct=0;
var z=0;
var sound_ex0=sounds;
var sound_ex2=exercises;
var tid;
var running=false;

//Select random exercise
var lgth=sound_ex2.length-1;
//pick random number
var pick=Math.floor((Math.random() * lgth) + 0);

//stop button to clear all intervalls and containers
$('#stop_btn').on('click', function (){
for(var i=0; i<sound_ex0.length; i++){
sound_ex0[i].stop();
sound_ex0[i].release();
}
for(var i=0; i<sound_ex2.length; i++){
sound_ex2[i].stop();
sound_ex2[i].release()
}
abortTimer();
$('#rd_counter').empty();
$('#displayer').empty();
$('#container').css("display", "none");
});

//start exercise
$('#ex2_btn').on('click', function (){
prep_tabata();
});

function prep_tabata(){
//check if it is running. If yes, stop everything and clear display containers and continue from start
if(running==true){
ct=0;
z=0;
abortTimer();

$('#rd_counter').empty();
$('#displayer').empty();
$('#container').css("display", "none");

var exc=pick;
exercise(exc);
}//end if running == true
else{
var exc=pick;
exercise(exc);
}
}//end function prep_tabata


function exercise(exc){
running=true;
$('#rd_counter').append('Round #1 of 8');
var ex_sound=sound_ex2[exc];
ex_sound.play();
}

function movetogo(){
	go_ex('g');
}

function go_ex(g){
	$('.pulse').css({"background-color": "red"});
	sound_ex0[0].play();//play GO
		countdown1('g');
}

function rest_ex(r){
	sound_ex0[1].play();
	$('.pulse').css({"background-color": "blue"});
		countdown1('r');
}

function countdown1(v){
	var v=v;
	var z=0;
	var d=5;//duration
	tid = setInterval(function(){countdown(v,z++,d);}, 1000);
}

function countdown(v,z,d){
	//alert('this is v'+v+' this is z'+z+' this is d'+d+'');
	//alert(z);
$('#container').css("display", "block");
//$('#container').toggle('slow');
	  if(v=='g'){
	  sound_ex0[2].play();
	  abort(z,d);
	  } else{
		  sound_ex0[3].play();
		  abort(z,d);
}//function countdown
				  
function abort(z,d){
	//alert('this is abort');
	//alert('this is z'+z+' this is d'+d+'');			
$('#displayer').empty();
		if(v=='g'){
		$('#displayer').append('Keep going for '+(d-z)+' seconds');
		}else{
		$('#displayer').append('Relax for '+(d-z)+' seconds');
		}
		
		if(z>=d){
		  $('#container').css("display", "none");
		  abortTimer();
		  $('#displayer').empty();
		  ct=ct+1;
		  rd=ct/2;
			  //toggle
			  if(ct<16){
				  if(v=='g'){rest_ex('r');} else{go_ex('g');}
				  //visual
				  if ((parseFloat(rd) == parseInt(rd)) && !isNaN(rd)) {
				  $('#rd_counter').empty();
				  rd=rd+1;
				  $('#rd_counter').append('Round #'+rd+' of 8');
				  }
			  }
			  else{ 
				$('#container').css("display", "none");
				sound_ex0[4].play();
				$('#rd_counter').empty();
				$('#displayer').empty();
				$('#container').css("display", "none");
				ct=0;
				z=0;
				running=false;
			  }
		  }
	  }//if z>duration
}//function abort


function abortTimer() {
clearInterval(tid);

}

});//document ready
}


