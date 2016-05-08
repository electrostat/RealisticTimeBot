var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
	token: <YOUR TOKEN>
})
bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

//standard hello mechanic
controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

//commands for altering time
controller.hears(['(.*) minutes'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
		
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	
	//convert word to number
	var type = typeof number;
	if(type == "string"){
		number = convertWord(number);
	}
	
	number = number * 2;
	
	bot.reply(message, "They really mean " + number + ' minutes');

});

controller.hears(['(.*) hours'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	
	//convert word to number
	var type = typeof number;
	if(type == "string"){
		number = convertWord(number);
	}
	
	number = number * 3;
	
	bot.reply(message, "They really mean " + number + ' hours');
});

controller.hears(['(.*) days'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	
	//convert word to number
	var type = typeof number;
	if(type == "string"){
		number = convertWord(number);
	}
	
	number = number * 2.5;
	
	bot.reply(message, "They really mean " + number + ' days');
});

controller.hears(['(.*) weeks'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	
	//convert word to number
	var type = typeof number;
	if(type == "string"){
		number = convertWord(number);
	}
	
	number = number * 3;
	
	bot.reply(message, "They really mean " + number + ' weeks');
});

controller.hears(['(.*) months'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	
	//convert word to number
	var type = typeof number;
	if(type == "string"){
		number = convertWord(number);
	}
	
	number = number * 1.5;
	
	bot.reply(message, "They really mean " + number + ' months');
});

controller.hears(['test (.*)'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var word = message.match[1];
	
	var type = typeof word;
	
	var number = convertWord(word);
	var typeNum = typeof number;
	
	bot.reply(message, "Converted " + word + " = " + number + " types: " + type + " = " + typeNum);
});


//number to word replacement code
function convertWord(word){
	var num = 0;
	
	switch(word) {
	    case "one":
	        num = 1;
	        break;
	    case "two":
	        num = 2;
	        break;
	    case "three":
	        num = 3;
	        break;
	    case "four":
	        num = 4;
	        break;
	    case "five":
	        num = 5;
	        break;
	    case "six":
	        num = 6;
	        break;
	    case "seven":
	        num = 7;
	        break;
	    case "eight":
	        num = 8;
	        break;
	    case "nine":
	        num = 9;
	        break;
	    case "ten":
	        num = 10;
	        break;
	    case "eleven":
	        num = 11;
	        break;
	    case "twelve":
	        num = 12;
	        break;
	    case "thirteen":
	        num = 13;
	        break;
	    case "fourteen":
	        num = 14;
	        break;
	    case "fifteen":
	        num = 15;
	        break;
	    case "sixteen":
	        num = 16;
	        break;
	    case "seventeen":
	        num = 17;
	        break;
	    case "eighteen":
	        num = 18;
	        break;
	    case "nineteen":
	        num = 19;
	        break;
	    case "twenty":
	        num = 20;
	        break;
	    case "thirty":
	        num = 30;
	        break;
	    default:
	        num = 0;
	}
	
	return num;	
}

