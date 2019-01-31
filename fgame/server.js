var express = require("express");
var http = require("http");
var socketIO = require('socket.io')
var bodyParser = require('body-parser')
var app = express();
var server = http.createServer(app);
var PORT = 8080; // default port 8080
var io = socketIO(server);

var players = {1:{}, 2:{}, 3:{}, 4:{}};

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/fgame";


app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

MongoClient.connect(MONGODB_URI, (err,db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`successfully connected to DB: ${MONGODB_URI}`);

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

  app.post("/register", (req, res) => {
    const theName = req.body.playerName;
    const theMail = req.body.playerEmail;
    // console.log(`The name is:   ${theName}`)

    res.end()
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

});


function gracefulShutDown() {
  console.log("\nShutting down gracefully......");
  try {
    db.close();
  }
  catch (err) {
    throw err;
  }

  finally {
    console.log("I will be back!");
    process.exit();
  }
}

