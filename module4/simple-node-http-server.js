

const http = require('http');
const fs = require('fs');
const port = 3000;

const requestHandler = (request, response) => {
console.log(request.url);
  response.end('Writing file.....', fs.writeFile('hello-world.txt', 'Hello to this great world', 'utf8', (err) => {
    if (err) throw err;
    console.log('success')
              }
            )
          );
        }

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Error', err);
        }
console.log(`server is on ${port}`);
})
