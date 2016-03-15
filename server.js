// Empty server file.

var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");


// 404: Resource not found error page.
function send404(response) {
	response.writeHead(404, {"Content-type" : "text/plain"});
	response.write("Error 404: resource not found");
	response.end();
}


// Send any page via the response. filePath will relate to the local file directory. 
function sendPage(response, filePath, fileContents){
	response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}



// The server will either return 404 errors if the conent can't be found, or use the 
// send Page function. 
function serverWorking(response, absPath){
	fs.exists(absPath, function(exists){
		if (exists){
			fs.readFile(absPath, function(err, data){
				if (err){
					send404(response);
				} else{
					sendPage(response, absPath, data);
				}
			});
		} else {
			send404(response);
		}
		

	});
}




// Essentially a catch-all controller, if this were analogued to MVC design. Necessitates that
// the local files correspond to requests users will be making.  
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


// The server will either listen to the process's port OR, if it's running locally, will set 
// the port to 3000.
var port_number = server.listen(process.env.PORT || 3000);


