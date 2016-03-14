var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

// Set the 404 error page.
function send404(response){
	response.writeHead(404, {"Content-type" : "text/plain"});
	response.write("Error 404: Resource not found");
	response.end();
}

// Receive the path to a file in order to render it as a view in the response.
function showViewPage(response, filePath, fileContents){
	response.writeHead(200, {"Content-type" : mime.lookup(path.basname(filePath))});
	response.end(fileContents);
}

// Control the flow of responses to view pages. 
function serverWorking(response, absPath){
	fs.exists(absPath, function(exists){
		if(exists){
			fs.readFile(absPath, function(err, data){
				if (err){
					send404(resonse);
				} else {
					showViewPage(response, absPath, data);
				}
			});
		} else {
			send404(response);
		}
	});
}

var server = http.createServer(function(request,response){

	var filePath = false; 

	if (request.url == '/'){
		filePath = "public/index.html";
	} else {
		filePath = "public" + request.url;
	}

	var absPath = "./" + filePath; 
	serverWorking(response, absPath);
});

var port_number = server.listen(process.env.PORT || 5000);