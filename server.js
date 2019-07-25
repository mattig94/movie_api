const http = require('http'),
fs = require('fs'),
url = require('url');

http.createServer((request, response) => {
  var address = request.url,
    q = url.parse(address, true),
    filePath = '';

  if(q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if(err) {
      throw err;
    }

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(data);
    response.end('Hello Node!\n');
  });

  fs.appendFile('log.txt', 'URL: ' + address + '\nTime Stamp: ' + new Date() + '\n\n', function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
