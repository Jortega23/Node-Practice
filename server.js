// Core level moduel for node.js
// Raw Node.js


// Set up http variable with require http module
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});


const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))