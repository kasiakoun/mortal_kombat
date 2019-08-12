const express = require('express');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;

const app = new express();

app.use('/src', express.static(path.join(__dirname, '/src'), {
  extensions: ['js']
}));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname , '/index.html'));
});

app.listen(port);
console.log(`Server running at http://${hostname}:${port}`);