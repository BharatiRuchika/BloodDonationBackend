var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({ path: './config/config.env' })
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bloodStoreRoutes = require("./routes/bloodStore")
var bloodRequestRoutes = require('./routes/bloodRequestRoutes')
var bloodIssueRoutes = require('./routes/bloodIssueRoutes');
var commentRoutes = require('./routes/commentRoutes');
const connectDB = require("./config/db.js");
// import connectDB from './config/db.js';
// dotenv.config()
connectDB.connect();
var app = express();
const cors = require("cors");
const corsOptions = {

  origin: true,
  credentials: true,
 
};

app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/users', usersRouter)
// app.use('/api/blood-store', bloodRouter)
app.use('/api/blood-store', bloodStoreRoutes)
app.use('/api/blood-request', bloodRequestRoutes)
app.use('/api/blood-issue', bloodIssueRoutes)
app.use('/api/comment', commentRoutes)

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

// const PORT = process.env.PORT||3001;

// app.listen(
//   process.env.PORT||3000,(
//     `Server running on port ${PORT}`
//   )
// )
// console.log(app.get("port"))
app.listen(process.env.PORT,()=>console.log(`server started at ${process.env.PORT}`));
module.exports = app;
