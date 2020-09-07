require('dotenv').config();

const express = require('express');
const app = express();

// --> 7)  Mount the Logger middleware here
function showRequestInfo(req, res, next) {
  const { method, path, ip } = req;

  console.log(`${method} ${path} - ${ip}`);
  next();
}

app.use(showRequestInfo);

// --> 11)  Mount the body-parser middleware  here
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
// app.get('/', function (req, res) {
//   res.send('Hello Express');
// });

/** 3) Serve an HTML file */
app.get('/', function (req, res) {
  const absolutePath = __dirname + '/views/index.html';

  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
// app.get('/json', function (req, res) {
//   res.json({ message: 'Hello json' });
// });

/** 6) Use the .env file to configure the app */
app.get('/json', function (req, res) {
  const resObj = {
    message: 'Hello json',
  };

  if (process.env.MESSAGE_STYLE === 'uppercase')
    resObj.message = resObj.message.toUpperCase();

  res.json(resObj);
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get(
  '/now',
  function (req, res, next) {
    req.time = new Date().toString();

    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function (req, res) {
  const { word } = req.params;

  res.json({ echo: word });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
// app.get('/name', function (req, res) {
//   const { first, last } = req.query;

//   res.json({ name: `${first} ${last}` });
// });

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */
app
  .route('/name')
  .get(function (req, res) {
    const { first, last } = req.query;

    res.json({ name: `${first} ${last}` });
  })
  .post(function (req, res) {
    const { first, last } = req.body;

    res.json({ name: `${first} ${last}` });
  });

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
