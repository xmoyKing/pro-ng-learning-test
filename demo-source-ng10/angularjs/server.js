// server.js
var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'demo',
  db: {
    host: 'host',
    port: 'dbport',
    name: 'dbname',
    credentials: {
      username: 'username',
      password: 'password'
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