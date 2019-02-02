var express = require("express");
var http = require("http");
var socketIO = require('socket.io')
var bodyParser = require('body-parser')
var app = express();
var server = http.createServer(app);
var PORT = 8080; // default port 8080
var io = socketIO(server);
var playerCounter = 0;
var playerList = [{}, {}, {}, {}];
var userAction = {};
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/fgame";


app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Start the srever and db
MongoClient.connect(MONGODB_URI, (err,db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`successfully connected to DB: ${MONGODB_URI}`);
  var gameRecord = db.db("fgame")

  gameRecord.createCollection('scoreRanking', function(err, res) {
  if (err) throw err;
    console.log("The collection created!");
  })

  // var newUpdate1 = { $set: {player: "Gary", score: 150}}
  // var newUpdate2 = { $set: {player: "Dan", score: 250}}
  // gameRecord.collection("scoreRanking").updateOne({player: 'Gary'}, newUpdate1, function (err, res) {
  //   console.log("Gary updated");
  // })
  //   gameRecord.collection("scoreRanking").updateOne({player: 'Dan'}, newUpdate2, function (err, res) {
  //   console.log("Dan updated");
  // })
  // db.close();
  //routing starts here
  app.get("/", (req, res) => {
    // res.send("Hello!");
    res.sendFile(__dirname+ '/views/index.html');
  });

  app.get("/welcome", (req, res) => {
    var rankRecord;
    gameRecord.collection("scoreRanking").find({}).toArray(function(err, result) {

      if (err) throw err;
      rankRecord = result;
      console.log("The rrr:    ", rankRecord);
      rankRecord.sort(function(a, b) {
        return b.score - a.score;
      })

      res.render('welcome', {rankRecord: rankRecord})
    })
    //ready to send the highscore data to the page
    // console.log("the rankRecord  ", rankRecord);
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
    console.log(`The name is:   ${theName}`)
    console.log(`The name is:   ${theMail}`)
    for (let i = 0; i < playerList.length; i++){
      if (!playerList[i]["name"]){
        console.log("hellooooo");
        playerList[i]["name"] = req.body.playerName;
        playerList[i]["email"] = theMail;
        res.redirect(`/controller/:${i+1}`);
        break;
      }
      else if (playerList["name"] && (i == playerList.length - 1 )){
        res.render('gameBusy');
      }
    }
    console.log("Total players:   ", playerList);
  })

  app.get('/controller/:id', (req, res) => {
    const theID = req.params.id.substring(1);
    // console.log(typeof req.params.id);
    console.log("the user", theID)
    const tempVar = {id: theID}
    res.render('controller', tempVar)
  });

  // app.get("/qrcode", (req, res)=> {
  //   res.render('gameQrcode')
  // })

  // Add the websocket handler
  io.on('connection', function(socket) {




    socket.on('userInput', function(data) {
      if (data[1]){
        userAction['1'] = data[1];
        userAction['1']['name'] = playerList[0].name;
      }
      if (data[2]){
              userAction['2'] = data[2];
              userAction['2']['name'] = playerList[1].name;
            }
      if (Object.keys(userAction).length == 2 && userAction['2']) {


        setTimeout(function(){
          socket.broadcast.emit('userAction',  userAction )
        }, 10)
          // console.log("userAction:   ", userAction);

      }

    })

    socket.on('winner', function(data) {
      console.log("The winner is", data);

      //db save record here
      console.log(playerList[data['player']-1].name)
      var scoreObj = {player: playerList[data['player'] -1 ].name, score: data['score']};
      gameRecord.collection('scoreRanking').insertOne(scoreObj, function(err, res) {
        if (err) throw err;
        console.log("player score saved")
      })

      // gracefulShutDown()
    })

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

