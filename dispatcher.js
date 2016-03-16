var fs = require('fs');
var path = require ('path');
var mime = require ('mime');

var actions = {
	'view' : function(user) {
		return '<h1 Todos for ' + user + '</h1>';
	}
}


this.dispatch = function(request, response) {

	var serverError = function(code, content) {
		response.writeHead(code,{'Content-Type': 'text/plain'});
		response.end(content);
	};

	var sendPage = function(filePath, fileContents) {
		response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
		response.end(fileContents);
	}

	var verifyFile = function(filePath) {
		fs.exists(filePath, function(exists){
			if (exists){
				fs.readFile(filePath, function(err, data){
					if (err){
						serverError(404, "Resource not found.")
					} else {
						sendPage(filePath, data);
					}
				}); 
			} else {
				serverError(404, "Resource not found.")
			}
		})
	};

	if (request.url == "/") {
		verifyFile('./public/index.html');
	} else {

		var parts = request.url.split('/');
		var action = parts[1];
		var argument = string2.slice(2,string2.length).join("/");

		if (action == "resource"){
			verifyFile('./public/' + argument);
		} else if (typeof actions[action] == 'function'){
			var content = actions[action](argument);
			//verifyFile(content);
		} else {
			serverError(404, '404 Error: Resource not found.');
		}
	}
}