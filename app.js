var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Validator = require('jsonschema').Validator;

var indexRouter = require('./routes/index');
var LoginRouter = require('./routes/login');
var SignUpRouter = require('./routes/signup');
var usersRouter = require('./routes/users');

var app = express();

//firebase connection
const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey.json');


//firebase project initialise
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//database reference
let db = admin.firestore();


//User Object schema
var v = new Validator(); //Schema validator using jsonschema

var userSchema = {
  "id": "/UserSchema",
  "type": "object",
  "title": "User Object",
  "properties": {
    "name": {
      "$id" : "#/properties/name",
      "type": "string",
      "title": "Name Schema",
      "default": ""
    },
    "e-mail": {
      "$id" : "#/properties/email",
      "type": "string",
      "title": "E-mail Schema",
      "default": ""
    },
    "consumer": {
      "$id" : "#/properties/consumer",
      "type": "boolean",
      "title": "Consumer Schema",
      "default": false
    },
    "business": {
      "$id" : "#/properties/business",
      "type": "boolean",
      "title": "Business Schema",
      "default": false
    },
    "contact number": {
      "$id" : "#/properties/contact number",
      "type": "string",
      "title": "Contact Number Schema",
      "default": ""
    },
  }
};

//Create a new collection and a document using the following example code.
//TODO - Alter code to read and display instead
let docRef = db.collection('users').doc('alovelace');
let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815,
  consumer: true,
  business: false
});
//Now add another document to the users collection. Notice that this document includes
//a key-value pair (middle name) that does not appear in the first document.
//Documents in a collection can contain different sets of information.
let aTuringRef = db.collection('users').doc('aturing');

let setAlan = aTuringRef.set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912,
  consumer: true,
  business: false
});

//You can also use the "get" method to retrieve the entire collection.
db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', LoginRouter);
app.use('/signup', SignUpRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
