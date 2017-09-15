var fs = require('fs');
var url = require('url');
var path = require("path");
const http = require('http');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("req.url:" + req.url);
  var uri = url.parse(req.url).pathname
     ,filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists){
      res.writeHead(404, {"Content-Type":"text/plain"});
      res.write("404 Not Found\n");
      res.end();
      return;
    }
    if(fs.statSync(filename).isDirectory()) 
      filename += '/index.html';
    
    fs.readFile(filename, "binary", function(err, file){
      if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
      }

      res.writeHead(200);
      res.write(file,"binary");
      res.end();
    })
  });
  // res.statusCode = 200;  
  // res.setHeader('Content-Type', 'text/html');
  // var x = request(req.url).pipe(res);
  //var file = fs.createReadStream(req.url);
  //file.pipe(res);
  //res.end('Hello World\n');
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});