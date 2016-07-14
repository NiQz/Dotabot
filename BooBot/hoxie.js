function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}
//if copying this command, change these lines:
var quotes = ["http://i.imgur.com/5uMiR0E.png","https://cdn.discordapp.com/attachments/143755095895572481/195968925060562947/Screenshot_607.png","​http://i.imgur.com/praiWNh.png","​http://i.imgur.com/lkSHylD.png","https://cdn.discordapp.com/attachments/184322202143948800/197463459548495888/Screenshot_681.png"];
var quotesText = ["i'm a thirsty hoe","AND THEN HE LANDED ME THE GREATEST BITCH OF THEM ALL","i eat ass","Smash that pasty","nobody loves u aaron u god damn hoe"];
var thisCommand = "~hoxie"; var userName = "hoxieloxie";
//stop changing from here.
var quote = "Quote not found.";
switch(input.substring(0,2))
	{
	case "": case "-h":
		quote = "I will respond with a quote from "+userName+", if you give me some words from that quote or a number. I currently have "+quotes.length+" quotes stored. Examples: `"+thisCommand+" 2`, `"+thisCommand+" landed`. Type `"+thisCommand+" -all` to see a text version of all available quotes. Type `"+thisCommand+" -random` to get a random one.";
	break;
	
	case "-a":
		quote = "Printing text versions of all quotes: ```";
		for(var a = 0; a<quotes.length;a++){
			quote+="\n"+quotesText[a];
		}
		quote += "```";
	break;
	
	case "-r":
		quote = quotes[random(quotes.length)];
	break;
	
	default:
		if(isInt(input))
				quote = quotes[input-1];
			
		if(quote == "Quote not found."){
				for(var a = 0; a<quotes.length; a++){
					if(quotesText[a].toLowerCase().indexOf(input.toLowerCase()) > -1)
						quote = quotes[a];
			}
		}
	break;
	}
print(quote);