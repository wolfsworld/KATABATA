document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

function checkplatform(){
if(device.platform.toLowerCase() === "android"){
	return "/android_asset/www/";
}else{	return '';}
}

var mediaURL=checkplatform();

$(document).ready(function(){

$('.pulse').css({"display":"none"});

var sounds = [];
var exercises = [];
//var kudos = [];

var resource="/android_asset/www/";

var kudos_all=["Great Job!","Wonderful!","Strong Performance!","Rock On!","Wow!!","Look at You!","You made it!!","Nice Workout!"];
var kudos_lgth=kudos_all.length;
var kudos_pick=Math.floor((Math.random() * kudos_lgth) + 0);
var kudos=kudos_all[kudos_pick];


sounds.push(new Media(""+mediaURL+"sounds/go.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/rest.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/whip.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/heartbeat.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/applause.mp3"));

exercises.push(['Push-ups',new Media(""+mediaURL+"sounds/ex0.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Burpees',new Media(""+mediaURL+"sounds/ex1.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Sit-ups',new Media(""+mediaURL+"sounds/ex2.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Squats',new Media(""+mediaURL+"sounds/ex3.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Sprints',new Media(""+mediaURL+"sounds/ex4.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Rope-Jumps',new Media(""+mediaURL+"sounds/ex5.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Drink a beer',new Media(""+mediaURL+"sounds/ex6.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Sing a Song',new Media(""+mediaURL+"sounds/ex7.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Dance a Jig',new Media(""+mediaURL+"sounds/ex8.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Go Home',new Media(""+mediaURL+"sounds/ex9.mp3",onSuccess,onError,onStatus)]);

//exercises.push(new Media('drill1',''+mediaURL+'sounds/ex0.mp3',onSuccess, onError, onStatus));
//exercises.push(new Media('drill2',''+mediaURL+'sounds/ex1.mp3',onSuccess, onError, onStatus));
//exercises.push(new Media(""+mediaURL+"sounds/ex1.mp3",onSuccess, onError, onStatus));
//exercises.push(new Media(""+mediaURL+"sounds/ex2.mp3",onSuccess, onError, onStatus));

function onSuccess(){}
function onError(error){}
function onStatus(status){
if( status==Media.MEDIA_STOPPED ) {
			movetogo();
        }else{}}


var num_exercises=exercises.length;
var ex_list='';
for(i=0; i<num_exercises; i++){
ex_list+='<li class="ex_choice"><a id="'+i+'" href="#main" data-transition="turn" class="ui-btn ui-icon-heart ui-btn-icon-left">'+exercises[i][0]+'</a></li>';
}
$('#ex_listview').append(ex_list);

var pick;
var ct=0;
var z=0;
//var sounds=sounds;
//var exercises=exercises;
var tid;
var running=false;

//Select random exercise


//stop button to clear all intervalls and containers
$('#stop_btn').on('click', function (){
abortTimer();
$('#rd_counter').empty();
$('#countdown').empty();
$('#container').css("display", "none");
$("#ex_display").empty();

for(var i=0; i<sounds.length; i++){
sounds[i].stop();
sounds[i].release();
}
for(var i=0; i<exercises.length; i++){
exercises[i][1].stop();
exercises[i][1].release()
}
document.location.href="#page0";
});

//start exercise
//hit specific exercise
$(document).on('click', '.ex_choice a', function () {
pick=$(this).attr("id");
//prep_tabata(pick);
});

//hit Random Button
$('#rand_kata_btn').on('click', function (){
$('#countdown').css({"background-image":"url(img/red_btn_30.png)"});
var lgth=exercises.length-1;
//pick random number
pick=Math.floor((Math.random() * lgth) + 0);
//prep_tabata(pick);
});

$(document).on('click', '#start_btn', function () {
prep_tabata(pick);
});


function prep_tabata(pick){
	alert(pick);
$("#ex_display").empty();	
$("#ex_display").append(exercises[pick][0]);
//check if it is running. If yes, stop everything and clear display containers and continue from start
if(running==true){
ct=0;
z=0;
abortTimer();

$('#ex_display').empty();
$('#rd_counter').empty();
$('#countdown').empty();
$('.pulse').empty();
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
var ex_sound=exercises[exc][1];
ex_sound.play();
}

function movetogo(){
	go_ex('g');
}

function go_ex(g){
	$('#countdown').css({"background-image":"url(img/red_btn_30.png)","color":"#F8E8FF","display":"block"});
	$('.pulse').css({"background-color": "red","color":"white"});
	sounds[0].play();//play GO
		countdown1('g');
}

function rest_ex(r){
	sounds[1].play();//play REST
	$('.pulse').css({"background-color": "#c1ffb0","color":"green"});
	$('#countdown').css({"background-image":"url(img/btn_bg_lightgreen80.png)","color":"green","display":"block"});
		countdown1('r');
}

function countdown1(v){
	var v=v;
	var z=0;
	if(v=='g'){
	var d=10;//counts on go
	}else{
	var d=5;//counts on rest
	}
	tid = setInterval(function(){countdown(v,z++,d);}, 1000);
}

function countdown(v,z,d){
	//alert('this is v'+v+' this is z'+z+' this is d'+d+'');
	//alert(z);
$('#container').css("display", "block");
$('.pulse').empty();
$('.pulse').css({"display":"block"});
//$('#container').toggle('slow');
	  if(v=='g'){
	 // sounds[2].play();
	  abort(z,d);
	  } else{
		  sounds[3].play();
		  abort(z,d);
}//function countdown
				  
function abort(z,d){
	//alert('this is abort');
	//alert('this is z'+z+' this is d'+d+'');			
$('#countdown').empty();
		if(v=='g'){
		$('#countdown').append('Keep going for '+(d-z)+' seconds');
		$('.pulse').append(d-z);
		}else{
		$('#countdown').append('Relax for '+(d-z)+' seconds');
		$('.pulse').append(d-z);
		}
		
		if(z>=d){
		  $('#container').css("display", "none");
		  abortTimer();
		  $('#countdown').empty();
		  $('.pulse').empty();
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
				sounds[4].play();
				$('#rd_counter').empty();
				$('#rd_counter').append(kudos);
				$('#countdown').empty();
				$('#countdown').css({"display":"none"});
				$('.pulse').empty();
				$('#container').css("display", "none");
				ct=0;
				z=0;
				setTimeout(function(){ document.location.href="#page0"; }, 5000);
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


