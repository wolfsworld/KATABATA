document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	
var sounds = [];
var exercises = [];

function checkplatform(){
if(device.platform.toLowerCase() === "android"){
	return "/android_asset/www/";
}
else{
	return 'no_android';
}
}

var mediaURL=checkplatform();

sounds.push(new Media(""+mediaURL+"sounds/go.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/rest.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/whip.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/heartbeat.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/applause.mp3"));
	
exercises.push(new Media(""+mediaURL+"sounds/ex1.mp3"));
exercises.push(new Media(""+mediaURL+"sounds/ex1.mp3"));
exercises.push(new Media(""+mediaURL+"sounds/ex1.mp3"));

alert(mediaURL);

var my_media = new Media(""+mediaURL+"ex1.mp3", MediaSuccess, MediaError, MediaStatus);
alert(my_media.MediaStatus);
my_media.play();

function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}

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


$(document).ready(function(){
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

sound_ex0[i].stop();
}

for(var i=0; i<sound_ex2.length; i++){

sound_ex2[i].stop();
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
if(sound_ex2[exc].MEDIA_STOPPED==4){
//go to play GO
go_ex('g');
}
}

function go_ex(g){
	sound_ex0[0].play();//play GO
	if(sound_ex0[exc].MEDIA_STOPPED==4){
		//go to countdown
		countdown1('g');
	}
}

function rest_ex(r){
	sound_ex0[1].play();
	if(sound_ex2[exc].MEDIA_STOPPED==4){
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
	  if(sound_ex0[2].MEDIA_STOPPED==4){
	  abort(z,d);
	  }
	  } else{
	  sound_ex0[3].play();
	  if(sound_ex0[3].MEDIA_STOPPED==4){
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


