var util = require('util');
var http = require('http');
var url = require ('url');

// Custom-built dispatcher
var dispatcher = require('./dispatcher.js');

console.log('Starting server @ localhost:3000/')

http.createServer(function (request, response){
	// Wrapping server functionality in try/catch
	try {
		console.log('Incoming request from: ' + 
					request.connection.remoteAddress +
					' for href: ' + url.parse(request.url).href
					);
		dispatcher.dispatch(request, response);
	} catch (err) {
		util.puts(err);
		response.writeHead(500);
		response.end('Internal Server Error');
	}
}).listen(process.env.PORT || 3000 , function(){
	console.log('Server running at ' + process.env.PORT || 3000);
});


