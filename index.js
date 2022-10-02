// index.js
// where your node app starts

// init project
var express = require('express');
require('dotenv').config()
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//date route

app.get('/api/:date?', (req, res) => {
  const data = req.params.date
  let date;
  // if no input then return the current date
  if (!data) {
    date = new Date()
  } else {
    //if the input is date format
    if (isNaN(data)) {
      date =new Date(data);
    } else {
      //if the date is milliseconds format
      date = new Date(parseInt(data))
    }
  }
  // date error handler
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date'})
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()})
  }
})






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
