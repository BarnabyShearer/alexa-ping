'use strict';

var Alexa = require('alexa-sdk');
var http = require('http')

exports.handler =  function handler(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = 'amzn1.ask.skill.b7dff73d-46e8-4646-941e-bcf41c728280';
    alexa.registerHandlers({
        'LaunchRequest': function () {
            this.emit('AMAZON.HelpIntent');
        },
        'PingIntent': function() {
            const site = this.event.request.intent.slots.website.value.replace(/^for /i, '').replace(" dot ", ".").replace(" ", "");
            const start = new Date();
            const req = http.request(
                {
                    hostname: site,
                    method: 'HEAD'
                },
                (res) => {
                    const time = new Date() - start;
                    this.emit(':tellWithCard', `${res.statusMessage} ${time} milliseconds`, 'PONG', `☺ ${res.statusMessage}: ${time}ms ☺`);
                }
            )
            req.on('error', (e) => {
                if(e.errno == 'ENOTFOUND') {
                     this.emit(':tellWithCard', `${site} not found`, 'PONG', `😕 ${site} not found 😕`);
                } else {
                    this.emit(':tellWithCard', `${e.message}`, 'PONG', `☹ ${e.message} ☹`);
                }
            })
            req.end();
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'You can say a website name or exit... Which website would you like to ping?', 'Which website would you like to ping?');
        },
        'AMAZON.CancelIntent': function () {
            this.emit(':tell', 'Bye!');
        },
        'AMAZON.StopIntent': function () {
            this.emit(':tell', 'Bye!');
        },
        'Unhandled': function() {
            this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a website name.', 'Try saying a website name.');
        },
        'SessionEndedRequest': function() {
            context.succeed();
        }
    });
    alexa.execute();
};
