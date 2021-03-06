document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

function checkplatform(){
if(device.platform.toLowerCase() === "android"){
	return "/android_asset/www/";
}else{	return '';}
}

var mediaURL=checkplatform();

$(document).ready(function(){

$(document).on("collapsibleexpand", "[data-role=collapsible]", function () {
    var position = $(this).offset().bottom;
    $.mobile.silentScroll(position);
});


$('.pulse').css({"display":"none"});
var resource="/android_asset/www/";

//create the arrays for exercises, commands and congrats
var sounds = [];
var exercises = [];

var kudos_all=["Great Job!","Wonderful!","Strong Performance!","Rock On!","Wow!!","Look at You!","You made it!!","Nice Workout!"];
var kudos_lgth=kudos_all.length;
var kudos_pick=Math.floor((Math.random() * kudos_lgth) + 0);
var kudos=kudos_all[kudos_pick];

var the_goes=[];
the_goes.push(new Media(""+mediaURL+"sounds/go.mp3"));
the_goes.push(new Media(""+mediaURL+"sounds/go1.mp3"));
the_goes.push(new Media(""+mediaURL+"sounds/go2.mp3"));
the_goes.push(new Media(""+mediaURL+"sounds/go3.mp3"));

var the_goes_lgth=the_goes.length;

var the_rests=[];
the_rests.push(new Media(""+mediaURL+"sounds/rest.mp3"));
the_rests.push(new Media(""+mediaURL+"sounds/rest1.mp3"));
the_rests.push(new Media(""+mediaURL+"sounds/rest2.mp3"));
the_rests.push(new Media(""+mediaURL+"sounds/rest3.mp3"));

var the_rests_lgth=the_rests.length;

sounds.push(new Media(""+mediaURL+"sounds/go.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/rest.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/whip.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/heartbeat.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/applause.mp3"));

exercises.push(['Do Sit-ups',new Media(""+mediaURL+"sounds/ex0.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Do Push-ups',new Media(""+mediaURL+"sounds/ex1.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Do Burpees',new Media(""+mediaURL+"sounds/ex2.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Do Squats',new Media(""+mediaURL+"sounds/ex3.mp3",onSuccess,onError,onStatus)]);
exercises.push(['Lift Weights',new Media(""+mediaURL+"sounds/ex4.mp3",onSuccess,onError,onStatus)]);

function onSuccess(){}
function onError(error){}
function onStatus(status){
if( status==Media.MEDIA_STOPPED ) {movetogo();}else{}}

//create the exercise selection list
var num_exercises=exercises.length;
var ex_list='';
for(i=0; i<num_exercises; i++){
ex_list+='<li class="ex_choice"><a id="'+i+'" href="#main" data-transition="turn" class="ui-btn ui-icon-heart ui-btn-icon-left">'+exercises[i][0]+'</a></li>';
}
$('#ex_listview').append(ex_list);

//GLOBAL variables to begin with
var pick;
var ct=0;
var z=0;
var d=0;
var dt=0;
var rd=0;
var v;
var m=0;
var tid;
var running=false;
abortTimer();
var version='0.2.3';

//stop button to clear all intervalls and containers
$('.stop_btn').on('click', stopall);

//function to reset all running exercises
function stopall(){
abortTimer();
clearTimeout(delay_go);
m=1;
ct=0;
z=0;
d=0;
dt=0;
rd=0;
v='a';

for(var i=0; i<the_goes_lgth; i++){
//the_goes[i].stop();
the_goes[i].release();
}
for(var i=0; i<the_rests_lgth; i++){
//the_rests[i].stop();
the_rests[i].release();
}
for(var i=0; i<sounds.length; i++){
//sounds[i].stop();
sounds[i].release();
}
for(var i=0; i<exercises.length; i++){
//exercises[i][1].stop();
exercises[i][1].release()
}

$('#rd_counter').empty();
$('#countdown').empty();
$('#container').css("display", "none");
$("#ex_display").empty();
$('#countdown').css({"opacity":"0", "background-image":"url(img/red_btn_30.png)"});
$('.stop_btn').css({"opacity":"0"});
$('#selection').collapsible( "collapse" );
$('#display').css({"background-image": "url(img/katabg.png)","background-position": "center 50px"});
//document.location.href="#page0";
};

//swipe stop current exercise and return to front page
$( "#display" ).on( "swipe", function(){
stopall();
document.location.href="#page0";
});

//start exercise
//hit specific exercise
$(document).on('click', '.ex_choice a', function () {
pick=$(this).attr("id");
$("#ex_display").empty();	
$("#ex_display").append(exercises[pick][0]);
});
//hit Random Button
$('#rand_kata_btn').on('click', function (){
var lgth=exercises.length-1;
//pick random number
pick=Math.floor((Math.random() * lgth) + 0);
$("#ex_display").empty();	
$("#ex_display").append(exercises[pick][0]);
});

// hit the START BUTTON
$(document).on('click', '#start_btn', function () {
prep_tabata(pick);
});

function prep_tabata(pick){
//check if it is running. If yes, stop everything and clear display containers and continue from start
if(running==true){
stopall();
m=0;
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
var ex_sound=exercises[exc][1];
ex_sound.play();
$('#rd_counter').transition({opacity:1},2500);
$('#rd_counter').append('Round #1 of 8');
}

function movetogo(){
//$('#countdown').css({"opacity":"1", "background-image":"url(img/red_btn_30.png)"});
$('.stop_btn').transition({opacity:1},1000);
	delay_go=setTimeout(function(){ 
								 if(m==0){
								 go_ex('g');
								 }else{
								 return false;
								 }
								 },2000);
}

function go_ex(g){
	$('#countdown').css({"opacity":"0","background-image":"url(img/red_btn_30.png)","color":"#F8E8FF"});
	var the_goes_pick=Math.floor((Math.random() * the_goes_lgth) + 0);
	v=g;
	the_goes[the_goes_pick].play();
	//sounds[0].play();//play GO
	$('#display').css({"background-image": "url(img/katabg.png)","background-position": "center 50px"});
	$('.pulse').css({"background-color": "red","color":"white"});
	$('#countdown').transition({opacity:1},1000,'in');
	
	countdown1(v);
}

function rest_ex(r){
	$('#countdown').css({"opacity":"0","background-image":"url(img/btn_bg_lightgreen80.png)","color":"green"});
	var the_rests_pick=Math.floor((Math.random() * the_rests_lgth) + 0);
	v=r;
	the_rests[the_rests_pick].play();
	//sounds[1].play();//play REST
	$('#display').css({"background-image":"url(img/katabg_green.png)","background-position":"center 50px"});
	$('.pulse').css({"background-color": "#c1ffb0","color":"green"});
	$('#countdown').transition({opacity:1},1000,'in');
	
	countdown1(v);
}

function countdown1(v){
	z=0; //counter reset
	if(v=='g'){
	d=10;//length counts on go
	}else{
	d=5;//length counts on rest
	}
	tid = setInterval(function(){countdown(v,z++,d);}, 1000);
}

function countdown(v,z,d){
$('#container').css("display", "block");
$('.pulse').empty();
$('.pulse').css({"display":"block"});
//check if GO or REST
	  if(v=='g'){
	  // sounds[2].play(); - the whip sound is muted
	  abort(z,d);
	  } 
	  else if(v=='r'){
		  sounds[3].play();
		  abort(z,d);
	  }
	  else{
		 return false;
	  }
}//end function countdown
				  
function abort(z,d){
$('#countdown').empty();
		if(v=='g'){
		$('#countdown').append('Keep going for '+(d-z)+' seconds');
		$('.pulse').append(d-z);
		}else if(v=='r'){
		$('#countdown').append('Relax for '+(d-z)+' seconds');
		$('.pulse').append(d-z);
		}
		else{
		return false;
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
				  //$('#countdown').transition({opacity:0},700);
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
				$('#countdown').transition({opacity:0},500);
				$('.pulse').empty();
				$('#container').css("display", "none");
				ct=0;
				z=0;
				setTimeout(function(){ document.location.href="#page0";$('#rd_counter').empty(); }, 3000);
				running=false;
			  }
	  }//if z>duration
}//function abort

function abortTimer() {
clearInterval(tid);
}

});//document ready
}


