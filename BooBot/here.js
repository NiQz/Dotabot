~createjs ~here|
var output = "**"+channel.name+"**\n";
switch(channel.name)
{
	case "lobby":
		output += "Welcome new users, mourn left users, get spammed by streambot here.";
		break;
	case "lounge":
		output+= "You may talk about any topic here (as long as it abides by server rules), but it is preferred that you talk about things that have their own channel, in that respective channel.";
		break;
	case "setup":
	case "info":
	case "news":
	case "logs":
	case"secret":
		output+="If you are able to talk here, you should know what this channel is.";
		break;
	case "comms":
		output+= "Text channel for voice channels, use this to communicate with your current voice partners, link images, etc. Basically this a no context channel.";
		break;
	case "archive":
		output+= "Here we store our dankest of memes, ask a moderator or admin to remove this message as this isn't a dank meme.";
		break;
	case "admin":
		output+= "Here officer+ can talk about issues currently happening on the server, joking is allowed, but keep it on topic.";
		break;
	case "cmd":
		output+="Test bot commands, spam, play trivia (`t), talk about computer science stuff here.";
		break;
	case "dota":
		output += "Talk about meta, strats or something on dota here. Complain about your latest game, etc. Harb wrote this description and he doesn't play, so he doesn't know what you guys do in here.";
		break;
	case "dota-lfg":
		output += "Find party members here. You are only allowed to use @here if it hasn't been used in this channel by **anyone** in the past 15 minutes. Don't forget to get useufl commands like `.me`, `~harbsmmr`, and `.iam`";
		break;
	case "anime":
		output += "Actually a discussion for anything japanese, including but not limited to: anime, manga, novels, etc. And don't forget memes are strictly allowed.";
		break;
	case "dev":
		output+= "The channel for the cool kids and Admins.";
		break;
	default: output+="This is the channel for "+channel.name+". Feel free to use @here to find party members (if applicable).";
		break;
}
print(output);