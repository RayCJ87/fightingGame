var express = require("express");
var http = require("http");
var socketIO = require('socket.io')
var bodyParser = require('body-parser')
var app = express();
var server = http.createServer(app);
var PORT = 8080; // default port 8080
var io = socketIO(server);
var winnerCounter = 0;
var playerCount = 1;
var playerData = {};
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
    // console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // console.log(`successfully connected to DB: ${MONGODB_URI}`);
  var gameRecord = db.db("fgame")

  gameRecord.createCollection('highRanking', function(err, res) {
  if (err) throw err;
    console.log("The collection created!");
  })
  // db.close();
  //routing starts here
  app.get("/", (req, res) => {

    res.sendFile(__dirname+ '/views/index.html');
  });



  app.get("/newgame", (req, res) => {
    playerData = {};
    playerCount = 1;
    res.render('newgame');
  })

  app.get("/welcome", (req, res) => {
    var rankRecord;
    gameRecord.collection("highRanking").find({}).toArray(function(err, result) {

      if (err) throw err;
      rankRecord = result;
      rankRecord.sort(function(a, b) {
        return b.score - a.score;
      })

      console.log("The record here:  ", rankRecord)
      res.render('welcome', {rankRecord: rankRecord})
    })
    //ready to send the highscore data to the page
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
    console.log(`The name is:   ${theName}`)
    const conToken = randomToken();
    console.log("The id is : ", playerCount);
    if (!playerData.hasOwnProperty(conToken)) {
      playerData[conToken] = {}
      playerData[conToken]['id'] = playerCount;
      playerData[conToken]['name'] = req.body.playerName;
      playerData[conToken]['token'] = conToken;
      playerCount++;
      res.redirect(`/controller/:${conToken}`);
    }
     console.log("Total players:   ", playerData);

  })

  app.get('/controller/:conToken', (req, res) => {
    const theToken = req.params.conToken.substring(1);
    console.log("theToken:   ", theToken);
    if (playerData[theToken]){
        const theID = playerData[theToken]['id'];
        console.log("the user", theID)
        const tempVar = {id: theID, theToken: theToken};
        console.log(" Total token is:", tempVar);
        res.render('controller', tempVar)
    }

  });


  // Add the websocket handler
  io.on('connection', function(socket) {


    if (winnerCounter == 0){
      socket.emit('redirect', '/player');
      // winnerCounter = 1;
    }

    socket.on('userInput', function(data) {
      if (data[1] && playerData.hasOwnProperty(data[1]['token'])){
        userAction['1'] = data[1];
        userAction['1']['name'] = playerData[data[1]['token']].name;
      }
      if (data[2] && playerData.hasOwnProperty(data[2]['token'])){
              userAction['2'] = data[2];
              userAction['2']['name'] = playerData[data[2]['token']].name;
            }
      if (data[3]  && playerData.hasOwnProperty(data[3]['token'])){
        userAction['3'] = data[3];
        userAction['3']['name'] = playerData[data[3]['token']].name;
      }
      if (data[4] && playerData.hasOwnProperty(data[4]['token'])){
        userAction['4'] = data[4];
        userAction['4']['name'] = playerData[data[4]['token']].name;
      }
      if (Object.keys(userAction).length == 4 && userAction['4']) {

        setTimeout(function(){
          socket.broadcast.emit('userAction',  userAction )
        }, 10)
          // console.log("userAction:   ", userAction);

      }

    })

    socket.on('winner', function(data) {
      // console.log("The winner is", data);

      //db save record here
      console.log(data['player'].name)
      for (let i in playerData){
        if (playerData[i]['id'] == data['player']){
          var scoreObj = {player: playerData[i].name, score: data['score']};
          gameRecord.collection('highRanking').insertOne(scoreObj, function(err, res) {
          if (err) throw err;
            console.log("player score saved")
          })
        }
      }
      // gracefulShutDown()
    })
  });

  server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });

});


function randomToken() {
  const randomKey = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0pQAZWSXEDCRFVTGBYHNUJMIKOLP";
  let output = "";
  while (output.length < 4){

  let temporaryNumber = Math.floor(Math.random() * (randomKey.length));
  output+= randomKey[temporaryNumber];
  }
  return output;
}


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

