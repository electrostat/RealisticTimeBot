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

controller.hears(['sunday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 0;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
});

controller.hears(['monday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 1;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
});

controller.hears(['tuesday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 2;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
});

controller.hears(['wednesday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 3;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
});

controller.hears(['thursday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 4;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
});

controller.hears(['friday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 5;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
	// bot.reply(message, "They really mean " + wordDay + ": today-" + today + ", theDay- " + theDay + ", newDay- " + newDay);
});

controller.hears(['saturday'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
    var date = new Date();
	var today = date.getDay();
	var theDay = 6;
	
	var newDay = adjustDay(today, theDay);
	
	var wordDay = translateDay(newDay);
	
	bot.reply(message, "They really mean " + wordDay);
});

//actual time listener
controller.hears(['(.*):(.*)'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
	
	var before = message.match[1];
	var after = message.match[2];
	var words = before.split(" ");
	var words2 = after.split(" ");
	
	var firstNumber = words[words.length-1];
	var secondNumber = words2[0];
	
	
	//convert word to number
	var type = typeof firstNumber;
	if(type == "string"){
		firstNumber = Number(convertWord(firstNumber));
	}
	
	var type2 = typeof secondNumber;
	if(type2 == "string"){
		secondNumber = Number(convertWord(secondNumber));
	}
	
	//add 20 minutes to the time
	secondNumber = secondNumber + 20;
	
	var secondString = "";
	
	if(secondNumber > 60){
		secondNumber = secondNumber - 60;
		firstNumber = firstNumber + 1;
		
		if(firstNumber > 12){
			firstNumber = firstNumber - 12;
		}
	}
	
	var newTime = "";
	
	if(secondNumber < 10){
		newTime = firstNumber + ":0" + secondNumber;
	}else{
		newTime = firstNumber + ":" + secondNumber;
	}
	
	bot.reply(message, "They'll be ready at " + newTime);
});

// controller.hears(['test (.*)'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
//
// 	var word = message.match[1];
//
// 	var type = typeof word;
//
// 	var number = convertWord(word);
// 	var typeNum = typeof number;
//
// 	bot.reply(message, "Converted " + word + " = " + number + " types: " + type + " = " + typeNum);
// });


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
	        num = word;
	}
	
	return num;	
}

function adjustDay(today, theDay){
	if(today > theDay){
		theDay = theDay + 7;
	}
	
	var diff = theDay - today;
	var adjust = diff * 2;
	
	var newDay = today + adjust;
	
	if(newDay > 6){
		newDay = newDay - 7;
	}
	
	return newDay;
}


function translateDay(dayNum){
	var day = "Sunday";
	
	switch(dayNum) {
	    case 0:
	        day = "Sunday";
	        break;
	    case 1:
	        day = "Monday";
	        break;
	    case 2:
	        day = "Tuesday";
	        break;
	    case 3:
	        day = "Wednesday";
	        break;
	    case 4:
	        day = "Thursday";
	        break;
	    case 5:
	        day = "Friday";
	        break;
	    case 6:
	        day = "Saturday";
	        break;
	    default:
	        day = translateDay(dayNum - 7);
	}
	return day;
}

