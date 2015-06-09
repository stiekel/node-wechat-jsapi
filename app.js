'use strict';
var sign = require('./sign.js');
var http = require('http');
var express = require('express');
var config = require('./config.js');
var callWeiXin = require('./callWeiXin');

var app = http.createServer();
var server = express(app);

server.listen(config.port, function(){
  console.log('runing on port: ', config.port);
});

server.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",'nodejs-weixin')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

server.get('/sign', function(req, res, next){
  callWeiXin.get(config.appid, config.secret, function(err, access_token, ticket){
    if(err) {
      return res.status(500).json({code: 500});
    } else {
      var url = req.protocol + '://' + req.get('host') + req.originalUrl;
      url = req.headers['referer'] || "";
      var index = url.indexOf("#");
      if(index > 0) {
        // url = url.split(0, index);
      }
      // url = encodeURIComponent(url);
      var signText = sign(ticket, url);
      signText.appId = config.appid;
      res.json(signText);
    }
  });
});

server.use(function(req, res, next){
  // res.header("Content-Type", "application/html;charset=utf-8");
  next();
});
server.use(express.static('./public'));

server.use(function(req, res, next){
  res.json({code: 404});
});