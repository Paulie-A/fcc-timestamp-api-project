// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

var app = express();

//enable body parser
app.use(bodyParser.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// GET call to return json formats
app.get('/api/timestamp/:date', function (req, res, next) {
  //Gets date data
  var date = req.params.date;
  
 
  
  
  if(isNaN(date)){
    var naturalDate = new Date(date);
    if (naturalDate == "Invalid Date"){
      naturalDate = null;
      unixDate = null; 
    }else{
    naturalDate = naturalDate.toUTCString();
    var unixDate = new Date(date).getTime()*1000;
    }
  }
  else{
    var unixDate = date;
    var naturalDate = new Date(date *1000);
    naturalDate = naturalDate.toUTCString();
  }

  res.json({unix: unixDate, utc: naturalDate});
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});