document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

$(document).ready(function(){
var sounds = [];
var exercises = [];

var resource="/android_asset/www/";

sounds.push(new Media(""+resource+"sounds/go.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+resource+"sounds/rest.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+resource+"sounds/whip.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+resource+"sounds/heartbeat.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+resource+"sounds/applause.mp3",onSuccess, onError, onStatus));
	
exercises.push(new Media(""+resource+"sounds/ex1.mp3",onSuccess, onError, onStatus));
//exercises.push(new Media(""+resource+"sounds/ex1.mp3",onSuccess, onError, onStatus));
//exercises.push(new Media(""+resource+"sounds/ex1.mp3",onSuccess, onError, onStatus));


function onSuccess(){
	//alert('success');
}

function onError(error){
	//alert('error');
}

function onStatus(status){
	//alert(status);
if( status==4) {
            alert('go to next step');
		return status;	//next_step();
        }
		//else{
			//alert('it did not stop');
		//}
}


//var my_media=new Media("/android_asset/www/sounds/go.mp3");
//my_media.play();

//var my_audio=new Audio("sounds/applause.mp3");
//my_audio.play();

//alert(sounds[0]);

/*sounds.push([sound1,new Media("sound/sound1.mp3")]);
sounds.push([sound2,new Media("sound/sound1.mp3")]);
sounds.push([sound3,new Media("sound/sound1.mp3")]);
sounds.push([sound4,new Media("sound/sound1.mp3")]);
	
exercises.push([med1,new Media("sound/voice001.mp3")]);
exercises.push([med2,new Media("sound/voice001.mp3")]);
exercises.push([med3,new Media("sound/voice001.mp3")]);
exercises.push([med4,new Media("sound/voice001.mp3")]);
exercises.push([med5,new Media("sound/voice001.mp3")]);
exercises.push([med6,new Media("sound/voice001.mp3")]);
exercises.push([med7,new Media("sound/voice001.mp3")]);*/



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

$('#ex2_btn').on('click', function (){
prep_tabata();
});

function prep_tabata(){

if(running==true){
ct=0;
z=0;
abortTimer();

$('#rd_counter').empty();
$('#displayer').empty();
$('#container').css("display", "none");

for(var i=0; i<sound_ex0.length; i++){
sound_ex0[i].pause();
sound_ex0[i].currentTime=0;
}

for(var i=0; i<sound_ex2.length; i++){
sound_ex2[i].pause();
sound_ex2[i].currentTime=0;
}

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
sound_ex2[exc].play();
if (sound_ex2[exc].onStatus==4){//sound_ex2[exc].Media.MEDIA_STOPPED= function(){
alert('we go next to the step');
}
else{
	alert('status is something else')
}//go to play GO
//go_ex('g');
//}
}

function go_ex(g){
	sound_ex0[0].play();//play GO
	sound_ex0[0].onended = function(){
		//go to countdown
		countdown1('g');
	}
}

function rest_ex(r){
	sound_ex0[1].play();
	sound_ex0[1].onended = function(){
		//go to countdown
		countdown1('r');
	}
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
	  if(v=='g'){
	  sound_ex0[2].play();
	  sound_ex0[2].onended = function(){
	  abort(z,d);
	  }
	  } else{
		  sound_ex0[3].play();
		  sound_ex0[3].onended = function(){
		  abort(z,d);
	  }
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
				alert('done!');
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


