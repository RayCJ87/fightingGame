var express = require("express");
var http = require("http");
var socketIO = require('socket.io')

var app = express();
var server = http.createServer(app);
var PORT = 8080; // default port 8080
var io = socketIO(server);

app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  // res.send("Hello!");
  res.sendFile(__dirname+ '/views/index.html');
});

app.get("/welcome", (req, res) => {
  // res.send("Hello!");
  res.render('welcome')
});

app.get("/game", (req, res) => {
  // res.send("Hello!");
  res.render('game')
});

app.get("/player", (req, res) => {
  res.render('playerIndex')
})

app.get("/playerplay", (req, res) => {
  res.render('controller')
})

// Add the websocket handler
io.on('connection', function(socket) {

  //listening events
  socket.on('userInput', function(data) {
    socket.broadcast.emit('fromUser',  {input: data} )
    // console.log("Received:   ", );
  })
  //update all status to the game
  socket.emit();



});


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});