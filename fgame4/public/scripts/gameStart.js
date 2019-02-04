var socket = io();
var playerStatus;

$( document ).ready(function() {
  document.getElementById('playButton').disabled = true;
  document.getElementById('playButton').backgroundColor = 'grey';
    console.log( "ready!" );
});



  console.log("Welcome to this test welcome!")

socket.on('userAction', function(data){
  console.log("Game received action: ", data)
  if (data[4]["name"]){
    document.getElementById('playButton').disabled = false;
    document.getElementById('playButton').innerText = 'Start';
  }
  // console.log("the action : ---> ", playerCounter)
})



