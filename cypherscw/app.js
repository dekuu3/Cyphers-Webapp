var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

app.use(bodyParser.json());

//http request that checks the fs if a username is taken or not. if not the user is added to the fs
app.post('/signup', (request, response)=>{
	fs.readFile("data.JSON", 'utf8', function(err, data) {
	 var parseddata = JSON.parse(data);
	 var i;

	 for(i = 0; i < parseddata.length; i++){
		 if(parseddata[i].username === request.body.username ){
			 response.writeHead(400 ,"Already exists");
		    response.end();
			 return;
		 	}
	 	}
		parseddata.push(request.body);
	  	fs.writeFile('data.JSON', JSON.stringify(parseddata), function (err) {
		   if (err) throw err;
			response.redirect('/cyphers');
		});
  });
});

//http request that checks the fs if a user exists and if passwords match
app.post('/login', (request, response)=>{
	fs.readFile("data.JSON", 'utf8', function(err, data) {
	 var parseddata = JSON.parse(data);
	 var i;

	 for(i = 0; i < parseddata.length; i++){
		 if(parseddata[i].username === request.body.username &&
			 parseddata[i].password === request.body.password){
		 			response.redirect('/cyphers');
					return;
		 	}
	 	}
		response.writeHead(400 ,"Already exists");
		response.end();
  });
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
