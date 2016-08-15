var express = require('express');
var app = express(); 
var port = process.env.PORT || 8080; 
var bodyParser = require('body-parser'); 

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

var publish = function(req, res, next){
	res.startPublishing = function(){
			console.log('new pulish'); 
			res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		});
	};
	res.publish = function(log, type){
		var message = {log:log, type:type}; 
		res.write("data: " + JSON.stringify(message) + "\n\n"); 
	};
	next(); 
};

app.use(bodyParser.json()); 
app.use(allowCrossDomain); 
app.use(publish); 
app.use(express.static('public')); 
var connections = []; 
var publishLog = function(data, type){
	for(var i = 0; i < connections.length; i++){
		connections[i].publish(data, type); 
	}
};
app.post('/log', function(req, res){
	publishLog(req.body, 'log'); 
	res.send(); 
});
app.post('/error', function(req, res){
	publishLog(req.body, 'error'); 
	res.send();
});
app.get('/connect', function(req, res){
	connections.push(res); 
	console.log('got a connection'); 
	res.startPublishing();
});

app.listen(port, function(){
	console.log('accept all'); 
});