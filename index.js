const express = require('express');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();

// 🔥 Use of eexpress
const app = express();
// 💩 Our port 💁‍
const PORT = process.env.PORT || 3000;
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.SQL_USER,
  password: process.env.SQL_PW,
  database: 'reservation_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connecting at id: ', connection.threadId);
});

let reserveData = [
  {
    reserveCounter: 'expression',
    name: '🕵️‍ Vader',
    email: 'fake@me.com',
    phoneNumber: 4212746473,
    uniqueID: '12123'
  }
];

// [📦] Here is the middleware of the Json parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pages to serve
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/reserve', (req, res) => {
  res.sendFile(path.join(__dirname, '/reserve.html'));
});

app.get('/tables', (req, res) => {
  res.sendFile(path.join(__dirname, 'tables.html'));
});

// API service
app.get('/api/reserve/', (req, res) => {
  res.json(reserveData);
});

var waitingList = [];
var eatingList = [];

app.get('/api/table/', (req, res) => {
  // Pull the data from the database
  let mySqlQuery = 'SELECT * FROM reservations';
  let mainObj = {};
  connection.query(mySqlQuery, (err, response) => {
    if (err) throw err;
    console.log(`This is the response obj ${JSON.stringify(response)}`);
    console.log(
      'This is the response length:',
      JSON.stringify(response.length)
    );

    var newConstructor = JSON.stringify(response);

    res.send(newConstructor);
    // for (let i = 0; i < response.length; i++) {
    // mainObj.push(res[i]);

    // console.log(newFun);
    // }
  });
});

app.get('/api/reserve/:id', (req, res) => {
  // we are getting the ID of the URL here
  let uniqueId = req.params.id;

  // we do a foor loop to view all the objcts inside our array of objects
  for (let i = 0; i < reserveData.length; i++) {
    // if obj name matches with ur UniqueID passed in the URL
    if (uniqueId === reserveData[i].reserveID) {
      // Render the JSON file
      res.json(reserveData[i]);
    }
  }
});

// Server post method
app.post('/api/reserve', (req, res) => {
  reserveData.push(req.body);
  console.log(` 🔥 🔥 ${req.body}`);

  let myQuery =
    'INSERT INTO reservations SET res_name = ?, res_phone = ?, res_email = ?, res_unique_id = ?';
  let options = [
    req.body.name,
    req.body.phoneNumber,
    req.body.email,
    req.body.uniqueID
  ];

  let reservationCount = reserveData.length;

  if (reservationCount >= 5) {
    waitingList.push(options);
  } else {
    eatingList.push(options);
  }

  connection.query(myQuery, options, err => {
    if (err) throw err;
    console.log('Reservation Data Saved to DB');
  });

  res.redirect('/');
});
// reserve tab
// table tab
// [🔥] Here is working our app ⭐
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});

//  /* freddy is the coolest like evar
//  byron is wearing a very nice shirt today
//  the rest of u are ok... just ok
// */
// 😘
