
$(document).ready(function(){
var ct=0;
var z=0;
var sound_ex0=$('.ex0');
var sound_ex2=$('.ex2');

var running=false;
//Select random exercise
var lgth=sound_ex2.length-1;
//pick random number
var pick=Math.floor((Math.random() * lgth) + 0);

if(running==true){
$('#ex2_btn').on('click', function playit(){
 alert(running);
//define the exercise to be played
ct=0;
z=0;

$('#rd_counter').empty();
$('#displayer').empty();

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
});

}//end false
else{
	$('#ex2_btn').on('click', function playit(){
	running=true;
	var exc=pick;
	exercise(exc);
	});
}


function exercise(exc){
sound_ex2[exc].play();
sound_ex2[exc].onended = function(){
$('#rd_counter').append('Round #1 of 8');
//go to play GO
go_ex('g');
}
}


function go_ex(g){
	sound_ex0[0].play();
	sound_ex0[0].onended = function(){
		//go to countdown
		countdown1('g');
	}
}

function rest_ex(r){
	sound_ex0[2].play();
	sound_ex0[2].onended = function(){
		//go to countdown
		countdown1('r');
	}
}


function countdown1(v){
	//$('#container').css("display", "block");
	var v=v;
	 var tid = setInterval(countdown, 1000);

	  var z=0;
	  var duration=5;
				function countdown(){
					$('#container').css("display", "block");
						if(v=='g'){
						sound_ex0[1].play();
						sound_ex0[1].onended = function(){
						abort();
						}
						} else{
							sound_ex0[4].play();
							sound_ex0[4].onended = function(){
							abort();
						}
				}//function countdown
					  z++;
					  function abort(){
						  if(running==true){
						  	  $('#ex2_btn').on('click', function(){
										 clearInterval(tid);
										 abortTimer();
										 v='g';
										 ct=100;
										 z=99;
										 $('#container').css("display", "none");
										 $('#rd_counter').empty();
										 return false;
										 
										 });
							}
							  
					  $('#displayer').empty();
					  if(v=='g'){
					  $('#displayer').append('Keep going for '+(duration-z)+' seconds');
					  }else{
					  $('#displayer').append('Relax for '+(duration-z)+' seconds');
					  }
					  if(z>=duration){
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
						  else if(ct==16){
							$('#container').css("display", "none");
						  	sound_ex0[3].play();
						  	alert('done!');  
						  }
						  else{
 							alert('ct is > 16');
							return false;
						  }
						  
						 // //else{
						  //$('#container').css("display", "none");
						  //sound_ex0[3].play();
						  //alert('done!');
						  //}
					  }
					function abortTimer() {
						clearInterval(tid);
						//$('#ex2_btn').on('click', function(){
											//clearInterval(tid);			   
														  // });
						}
				  	}//if z>5
				  	}//function abort
}//function countdown1


});//document ready


