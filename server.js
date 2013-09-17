// Import modules
var http = require('http');
var fs = require('fs');
var url = require('url');

// Initialize global variables
var index = fs.readFileSync('index.html');

// Take port command line parameter
var port = Number(process.argv.splice(2));
if(port==0) port=8080;
console.log(port);

// Listen for http requests
http.createServer(function (req,res) {
	//res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(index);
}).listen(port);
