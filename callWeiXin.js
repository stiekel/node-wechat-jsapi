var request = require('request');
var ACCESS_TOKEN_API = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID_VALUE&secret=SECRET_VALUE';
var TICKET_API = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN_VALUE&type=jsapi';

var access_token = '';
var expire = 7200000;
var accessTokenGetTime = new Date();
var ticket = '';
var get = function(appid, secret, cb){
  //get token with appid and secret
  getAccessToken(function(err){
    if(err) {
      return cb(err)
    }
    getTicket(function(err){
      if(err) {
        return cb(err);
      }

      cb(null, access_token, ticket);
    });
  });

  function getAccessToken(atcb){
    //check is this access_token expire
    if(access_token && new Date().getTime() - accessTokenGetTime.getTime() < expire) {
      console.log('get access_token from local cache');
      return atcb(null);
    }
    //get from weixin
    request.get(ACCESS_TOKEN_API.replace('APPID_VALUE', appid).replace('SECRET_VALUE', secret), function(err, response, body){
      if(err) {
        return atcb(err);
      }

      try{
        body = JSON.parse(body);
      } catch(e) {
        return atcb(new Error('json from weixin con NOT parse, body: ' + body));
      }

      if(!body.access_token) {
        return atcb(new Error('can NOT get access_toke from weixin server.'));
      } else {
        access_token = body.access_token;
        accessTokenGetTime = new Date();
      }
      if(body.expire) expire = Number(body.expire)*1000;
      console.log('get access_token from weixin server');
      atcb(null);
    });
  }

  function getTicket(tcb){
    request.get(TICKET_API.replace('ACCESS_TOKEN_VALUE', access_token), function(err, response, body) {
      if(err) {
        return tcb(err);
      }

      try{
        body = JSON.parse(body);
      } catch(e) {
        return tcb(new Error('json from weixin con NOT parse, body: ' + body));
      }

      console.log('body, typeof: ', body, typeof body);
      if('ok' === body.errmsg && body.ticket) {
        ticket = body.ticket;
        return tcb(null);
      } else {
        return tcb(new Error('get ticket failed'));
      }
    });
  }
};


exports.get = get;