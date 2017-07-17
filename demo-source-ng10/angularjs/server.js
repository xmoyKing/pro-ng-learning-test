// server.js
var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'demo',
  db: {
    host: 'ds161960.mlab.com',
    port: 61960,
    name: 'dbking',
    credentials: {
      username: 'king',
      password: 'xmoy8427'
    }
  }
});

server.listen();

server.on('listening', function() {
  console.log("Demo Server in 5000");
});

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});