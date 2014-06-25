#!/usr/bin/env node

var yetify = require('yetify');
var config = require('getconfig');
var port = parseInt(process.env.PORT || config.server.port, 10);
var io = require('socket.io').listen(port);

var signalmaster = require('./server')(config);
io.sockets.on('connection', function (client) {
    signalmaster.main(io).apply(this, arguments);
});

if (config.uid) process.setuid(config.uid);

console.log(yetify.logo() + ' -- signal master is running at: http://localhost:' + port);
