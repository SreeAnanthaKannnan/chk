/**
 * @author: Vikram Viswanathan
 * @version: 1.0.0
 * @date: February 20, 2019
 * @Description: This would be first file being accessed by the NodeJS server when it powers up.
 */

/**
 * Usage of strict mode
 * 1. It catches some common coding bloopers, throwing exceptions.
 * 2. It prevents, or throws errors, when relatively “unsafe” actions are taken (such as gaining access to the 
 *    global object).
 * 3. It disables features that are confusing or poorly thought out.
 */
'use strict';

var createError = require('http-errors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    logger = require('morgan'),
    swaggerJSDoc = require('swagger-jsdoc'),
    cors = require('cors'),
    log4js = require('log4js'),
    con = require('./mysql_connection/connection.js');

var indexRouter = require('./routes/index');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// swagger definition
var swaggerDefinition = {
    info: {
      title: 'APIs for Saneds SPSA application',
      version: '1.0.0',
      description: 'Providing the list of APIs developed for Saneds SPSA project.',
    },
    host: 'localhost:4000',
    basePath: '/',
};

log4js.configure({
    appenders: {
        SPSA_project: {
            type: 'dateFile', 
            filename: './log/SPSA_project_' + 
                    new Date().getFullYear() + "-"+ (new Date().getMonth()+ 1) + "-" + 
                    new Date().getDate() + '.log'
        }
    },
    categories: {
      default: { appenders: [ 'SPSA_project' ], level: 'debug' }
    }
});

const loggerS = log4js.getLogger('SPSA_project');

con.connectionCheck;
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/swagger-docs.js'],
};
  
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
  
// serve swagger
app.get('/swagger.json', function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.send(swaggerSpec);
});

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('data/img'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(request, response, next) {
    next(createError(404));
});
  
// error handler
app.use(function(error, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};
    // render the error page
    response.status(error.status || 500);
    response.render('error');
});

module.exports.dirname = __dirname;
module.exports.app = app;