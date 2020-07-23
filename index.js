var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
const shortid = require('shortid');


var user_route = require('./routes/userRouter');

var User = require('./models/user');

//Configuring Port
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), function () {
    console.log('Server is listening on port :', app.get('port'));
});

const url = 'mongodb://localhost:27017/user';
const connect  = mongo.connect(url, { useFindAndModify: false,  useUnifiedTopology: true, useNewUrlParser: true});

connect.then((db) => {
  console.log('Connected correctly to MongoDB..');
}, (err) => { console.log(err); });

user_route.configure(app, mongo, ObjectID, url, assert, User);


app.get('/', function (req, res) {
    res.send("Welcome to the homepage!");
});