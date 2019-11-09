var http = require('http');

http.createServer(function (request, reponse){
    reponse.writeHead(200, {'content-type': 'text/html'});
    reponse.write('Hello, world');
    reponse.end();
}).listen(8088);

console.log('server running at http://localhost:8088');