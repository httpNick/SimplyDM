var Rcon = require('rcon');
var config = require('../config.js');
var conn = new Rcon(config.devserver.ip, 27015, config.devserver.rcon);
var data = [];

// TODO:
// Setup up module exports so we return a formatted string with server data
// Make the server-info lookup recursive, able to grab multiple servers
//
//

conn.on('connect', function() {
  console.log("connected!");
}).on('auth', function() {
  console.log("Authed!");
  conn.send('status');
}).on('response', function(str) {
  if (str != '') {
    update(str.replace(/(?:\r\n|\r|\n)/g, ',').split(','));
  }
});

conn.connect();

var update = function(str) {
  console.log(str);
  newData = {hostname : '', map : '', players : 0};
  newData.hostname = str[0].slice(10);
  newData.map = str[5].slice(10);
  newData.players = parseInt(str[6]
    .match(/(\b\d+(?:[\.,]\d+)?\b(?!(?:[\.,]\d+)|(?:\s*(?:%|percent))))/));
  data.push(newData);
  console.log(data);
}
