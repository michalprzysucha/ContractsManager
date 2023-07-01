const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const bodyparser = require('body-parser')

const indexRouter = require('./routes/index');
const tendersRouter = require('./routes/tenders');
const companyRouter = require('./routes/companies');
const contractingAuthorityRouter = require('./routes/contractingAuthorities');
const offersRouter = require('./routes/offers');

const app = express();
//app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/tenders', tendersRouter);
app.use('/companies', companyRouter);
app.use('/ca', contractingAuthorityRouter);
app.use('/offers', offersRouter);

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
