/**
 * The file that is executed first. It redirect all routes to the correct file, start the server and make initial packages configuration.
 * @type {[type]}
 */
require("es6-shim");
var express = require('express');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var ApplicationManager = require("./api/ApplicationManager");

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));

// To call Application Manager
var server_router_controller = require(__dirname + '/routes/server-router-controller');
app.use('/servercontroller', server_router_controller);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        // normal static file request
        next();
    }
    else {
        // redirect all html requests to `index.html`
        res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
    }
});

app.listen(app.get('port'), function() {
    console.log('Welcome to LL Totem Project. Available on port '+app.get('port'));
}); 

// Instantiating the web socket (port 8000) - server side
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
http.listen(4060);

// Starting communication with the message broker
var applicationManager = new ApplicationManager();
applicationManager.startBrokerListeners(io);