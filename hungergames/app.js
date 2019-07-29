var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('mongodb');
var moment = require('moment');
var request = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/dist/client')));
app.use(express.static(path.join(__dirname, 'public')));

let db;
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/HungerGames", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('connected to mongo');
    db = client.db();
});

app.get('/api/lunches/:date', function(req, res) {
    request.get('http://lunch.kabbage.com/api/v2/lunches/' + req.params.date,
        (error, response, body) => {
            if (error) {
                return res.sendStatus(400);
            }

            return res.send(response.body);
        }
    );
});

app.get('/api/lineStatus', function(req, res) {
    if (!db) {
        res.sendStatus(504)
    }

    db.collection('hungergames').find({}).toArray(function(err, docs) {
        if (err) {
            res.sendStatus(500);
        }

        res.status(200).json(docs);
    });
});

app.post('/api/lineStatus', function(req, res) {
    if (!(req.body.lineOpen && req.body.lineLength && req.body.linePace)) {
        res.sendStatus(400);
    }

    if (!db) {
        res.sendStatus(504)
    }

    req.body.timestamp = moment().format();

    db.collection('hungergames')
        .insertOne(req.body, function(err, doc) {
            if (err) {
                res.sendStatus(500);
            }

            res.sendStatus(200);
        });
});

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
