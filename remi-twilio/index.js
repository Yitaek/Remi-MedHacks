
require('dotenv').load();

var twilio = require('twilio');
var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;  

var client = twilio(accountSid, authToken);
var cronJob = require('cron').CronJob;

var textJob = new cronJob( '11 18 * * *', function(){
  client.sendMessage( { to:'+14254718076', from:'+14252875544', body:'Hello! Hope you’re having a good day!' }, function( err, data ) {});
},  null, true);