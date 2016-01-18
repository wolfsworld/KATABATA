 //set global variables


//device detection and homepage size
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

}



$(document).ready(function(){


// set interval example
var tid = setInterval(mycode, 1000);
function mycode() {
  // do some stuff...
  // no need to recall the function (it's an interval, it'll loop forever)
}
function abortTimer() { // to be called when you want to stop the timer
  clearInterval(tid);
}


});
