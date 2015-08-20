var express = require('express')

var servers = require('../servers.json');
var router = express.Router()
var mongoose = require('mongoose');
var Server = require('../models/Server.js');
var ping = require('ping');
var fs = require('fs');


// var s = new Rcon('46.101.5.97:27015', '56U4.yGL!A9597V');

/* TODO: Servers have own sub-url, example: /servers/uk-1
 * Shows currently connected players, map, some stats
 * Button which allows users to connect to the server
 */

// router.get('/create', function(req, res) {
//   res.render('servers/create.jade')
// })

// router.post('/create', function(req, res) {
//   console.log(req.body);
// })

/*
 * User Server Model
 * 1. query server data on GET request
 * 2. Push updated data to server
 * 2. Render updated data to view
 */
router.get('/', function(req, res) {
  //get map status
  var servers = {}

  // servers[0].hostname = resultStr[0]
  // servers[0].map = resultStr[5]
  // servers[0].players = resultStr[6].indexOf(/(?<![-.])\b[0-9]+\b(?!\.[0-9])/)
  console.log(resultStr[6].indexOf(/(?<![-.])\b[0-9]+\b(?!\.[0-9])/));
  // var servers = {
  //   1: {
  //     hostname: 'uk-1',  --- Called from DB
  //     ip: '',        --- Called from DB
  //     port: '',      --- Called from DB
  //     map: '',       --- Called from RCON
  //     online: '',    --- Called from RCON
  //     players: ''    --- Called from RCON
  //   },
  //   2 :{
  //     etc...
  //   }
  // }


  /*
   * Database Query logic:
   * Gets: hostname, ip, port
   */

  //Get IP, hostname, and port
  // Server.find({}, function(err, doc) {
  //   if (!err) {
  //     //  console.log(doc);
  //     for (var i = 0; i < doc.length; i++) {
  //       servers[i] = doc[i]
  //         // Ping servers to get alive status
  //       ping.promise.probe(doc[i].ip)
  //         .then(function(res) {
  //           if (res.alive) {
  //             servers[i].online = true
  //           } else {
  //             servers[i].online = false
  //           }
  //         })
  //     }
  //   } else {
  //     throw err
  //   }
  // })

  //Rendering:
  res.render('servers/index.jade', {
      servers: servers
    })
    /*
     * RCON query logic:
     * Gets: map and players online
     */
})

module.exports = router
