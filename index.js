// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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

app.get("/api", (req, res) => {

  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })

});

app.get("/api/:currentDate", (req, res) => {
  let currentDate = req.params.currentDate;

  let unixDate;
  let dateObj;
  let utcDate;

  // Test whether the input date is a number
  let isUnix = /^\d+$/.test(currentDate);

  // If no date specified, use the current date
  if (!currentDate) {
    dateObj = new Date();
  }
  // If the date is a Unix Timestamp
  else if (currentDate && isUnix) {
    unixDate = parseInt(currentDate);
    dateObj = new Date(unixDate);
  }
  // If the date is not a unix time stamp
  else if (currentDate && !isUnix) {
    dateObj = new Date(currentDate);
  }

  if (dateObj.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString();

  res.json({ unix: unixDate, utc: utcDate });
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
