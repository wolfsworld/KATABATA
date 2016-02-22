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

var resource="/android_asset/www/";

sounds.push(new Media(""+mediaURL+"sounds/go.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/rest.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/whip.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/heartbeat.mp3"));
sounds.push(new Media(""+mediaURL+"sounds/applause.mp3"));

exercises.push(['drill1',new Media(""+mediaURL+"sounds/ex0.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill2',new Media(""+mediaURL+"sounds/ex1.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill3',new Media(""+mediaURL+"sounds/ex2.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill4',new Media(""+mediaURL+"sounds/ex3.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill5',new Media(""+mediaURL+"sounds/ex4.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill6',new Media(""+mediaURL+"sounds/ex5.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill7',new Media(""+mediaURL+"sounds/ex6.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill8',new Media(""+mediaURL+"sounds/ex7.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill9',new Media(""+mediaURL+"sounds/ex8.mp3",onSuccess,onError,onStatus)]);
exercises.push(['drill10',new Media(""+mediaURL+"sounds/ex9.mp3",onSuccess,onError,onStatus)]);

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
ex_list+='<li><a href="#" data-transition="turn" id="exer1_btn" class="ui-btn ui-icon-heart ui-btn-icon-left">'+exercises[i][0]+'</a></li>';
}
$('#ex_listview').append(ex_list);


var ct=0;
var z=0;
//var sounds=sounds;
//var exercises=exercises;
var tid;
var running=false;

//Select random exercise
var lgth=exercises.length-1;
//pick random number
var pick=Math.floor((Math.random() * lgth) + 0);

//stop button to clear all intervalls and containers
$('#stop_btn').on('click', function (){
for(var i=0; i<sounds.length; i++){
sounds[i].stop();
sounds[i].release();
}
for(var i=0; i<exercises.length; i++){
exercises[i][1].stop();
exercises[i][1].release()
}
abortTimer();
$('#rd_counter').empty();
$('#countdown').empty();
$('#container').css("display", "none");
document.location.href="#page0";
//self.location.href = 'index.html';
});

//start exercise
$('#rand_kata_btn').on('click', function (){
$('#countdown').css({"background-image":"url(img/red_btn_30.png)"});
prep_tabata();
});

function prep_tabata(){
//check if it is running. If yes, stop everything and clear display containers and continue from start
if(running==true){
ct=0;
z=0;
abortTimer();

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
	$('#countdown').css({"background-image":"url(img/red_btn_30.png)"});
	$('.pulse').css({"background-color": "red"});
	sounds[0].play();//play GO
		countdown1('g');
}

function rest_ex(r){
	sounds[1].play();//play REST
	$('.pulse').css({"background-color": "blue"});
	$('#countdown').css({"background-image":"url(img/btn_bg_green80.png)"});
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
				$('#countdown').empty();
				$('.pulse').empty();
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


