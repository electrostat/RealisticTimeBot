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
	number = number * 2;
	
	bot.reply(message, "They really mean " + number + ' minutes');

});

controller.hears(['(.*) hours'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	number = number * 3;
	
	bot.reply(message, "They really mean " + number + ' hours');
});

controller.hears(['(.*) days'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	number = number * 2.5;
	
	bot.reply(message, "They really mean " + number + ' days');
});

controller.hears(['(.*) weeks'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	number = number * 3;
	
	bot.reply(message, "They really mean " + number + ' weeks');
});

controller.hears(['(.*) months'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var thisMessage = message.match[1];
	var words = thisMessage.split(" ");
	var number = words[words.length-1];
	number = number * 1.5;
	
	bot.reply(message, "They really mean " + number + ' months');
});
