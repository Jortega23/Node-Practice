// Core level HTTP moduel for node.js
// Raw Node.js


// Set up http variable with require http module
const http = require('http');

const todos = [
  {id: 1, text: 'Task 1'},
  {id: 2, text: 'Task 2'},
  {id: 3, text: 'Task 3'}
]

const server = http.createServer((req, res) => {
  const { method, url } = req

  // Initializing body to push data into it
  let body = []

  // sending body data using hhtp module using req.on
  req.on('data', chunk => {
    // push chunk into body
    body.push(chunk)
    // Listen to an 'end'
  }).on('end', () => {

    // Have access to buffer and concat the body to that
    // add .toString method
    body = Buffer.concat(body).toString();

    // set up a status and response object
    let status = 404;
    const response = {
      success: false,
      data: null,
      error: null
    }

    // Testing 
    // if statement to check method & url
    if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos
    } else if(method === 'POST' && url ==='/todos') {
      const { id, text } = JSON.parse(body);
      
      // Checking to see if id and text is inlcuded in the data
      if(!id || !text){
        status = 400,
        response.error = 'Please enter Id and Text'
      } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos
        }
    }
      
    res.writeHead(status, {
      'Content-Type': 'Application/json',
      'X-Powered-By': 'Node.js'
    });

    res.end(JSON.stringify(response)
    );
  })
});


const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))