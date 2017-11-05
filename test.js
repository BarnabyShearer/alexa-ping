var alexaTest = require('alexa-skill-test-framework');

alexaTest.initialize(
    require('./index.js'),
    "amzn1.ask.skill.b7dff73d-46e8-4646-941e-bcf41c728280",
    "amzn1.ask.account.VOID"
);

describe("AMAZON.HelpIntent into AMAZON.CancelIntent", function(){
    alexaTest.test([
        {
            "request": alexaTest.getIntentRequest("AMAZON.HelpIntent"),
            "says": "You can say a website name or exit... Which website would you like to ping?",
            "shouldEndSession": false
        },
        {
            "request": alexaTest.getIntentRequest("AMAZON.CancelIntent"),
            "says": "Bye!",
            "shouldEndSession": true
        }
    ]);
});

describe("PingIntent", function(){
    alexaTest.test([
        {
            "request": alexaTest.getIntentRequest("PingIntent", {"website": "zi.is"}),
            "saysLike": "Moved Permanently"
        },
        {
            "request": alexaTest.getIntentRequest("PingIntent", {"website": "example.com"}),
            "saysLike": "OK"
        },
        {
            "request": alexaTest.getIntentRequest("PingIntent", {"website": "fake.example.com"}),
            "saysLike": "fake.example.com not found"
        }
    ]);
});
