// server.js
var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'demo',
  db: {
    host: 'host', // 远程mongodb域名或ip
    port: 'dbport', // 数据库端口
    name: 'dbname', // 数据库名
    credentials: {
      username: 'username', // 数据库用户名
      password: 'password' // 数据库密码
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