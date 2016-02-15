document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

function checkplatform(){
if(device.platform.toLowerCase() === "android"){
	return "/android_asset/www/";
}
else{
	return '';
}
}

var mediaURL=checkplatform();


$(document).ready(function(){
var sounds = [];
var exercises = [];

var resource="/android_asset/www/";

sounds.push(new Media(""+mediaURL+"sounds/go.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+mediaURL+"sounds/rest.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+mediaURL+"sounds/whip.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+mediaURL+"sounds/heartbeat.mp3",onSuccess, onError, onStatus));
sounds.push(new Media(""+mediaURL+"sounds/applause.mp3",onSuccess, onError, onStatus));

//sounds.push(""+mediaURL+"sounds/go.mp3");
//sounds.push(""+mediaURL+"sounds/rest.mp3");
//sounds.push(""+mediaURL+"sounds/whip.mp3");
//sounds.push(""+mediaURL+"sounds/heartbeat.mp3");
//sounds.push(""+mediaURL+"sounds/applause.mp3");

//exercises.push(""+mediaURL+"sounds/ex1.mp3");
exercises.push(new Media(""+mediaURL+"sounds/ex1.mp3",onSuccess, onError, onStatus));
//exercises.push(new Media(""+resource+"sounds/ex1.mp3",onSuccess, onError, onStatus));
//exercises.push(new Media(""+resource+"sounds/ex1.mp3",onSuccess, onError, onStatus));


function onSuccess(){
	//alert('success');
}

function onError(error){
	//alert('error');
}

function onStatus(status){
if( status==Media.MEDIA_STOPPED ) {
            //alert('has stopped');
			movetogo();
        }
		else{
			//alert('it did not stop');
		}
}




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
//sound_ex0[i].pause();
//sound_ex0[i].currentTime=0;
}

for(var i=0; i<sound_ex2.length; i++){
//sound_ex2[i].pause();
//sound_ex2[i].currentTime=0;
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
var ex_sound=sound_ex2[exc];
ex_sound.play();
//function onStatus(status){
//if( status==4){
//go_ex('g');
//}
//}
}

function movetogo(){
	go_ex('g');
	//alert('movetogo');
}

function go_ex(g){
	//sound_ex0[0]=new Media(sound_ex0[0],onSuccess, onError, onStatus);
	sound_ex0[0].play();//play GO
	//function onStatus(status){
	//if( status==4){
		//go to countdown
		countdown1('g');
	//}
	//}
}

function rest_ex(r){
	//sound_ex0[1]=new Media(sound_ex0[1],onSuccess, onError, onStatus);
	sound_ex0[1].play();
	//function onStatus(status){
	//if( status==4){
		countdown1('r');
	//}//}
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
	  //sound_ex0[2]=new Media(sound_ex0[2],onSuccess, onError, onStatus);
	  sound_ex0[2].play();
	 	//function onStatus(status){
		//if( status==4){
	  abort(z,d);
	  //}}
	  } else{
		 // sound_ex0[3]=new Media(sound_ex0[3],onSuccess, onError, onStatus);
		  sound_ex0[3].play();
		//function onStatus(status){
		//if( status==4){
		  abort(z,d);
	  //}}
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


