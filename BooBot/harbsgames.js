// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name default.js
// @js_externs input; server.Users; user.Roles; user.CurrentGame; user.State; user.Name; role.Name;
// ==/ClosureCompiler==

if(new RegExp("\\?|help|how").test(input)) {
	print("Displays some server info and then prints the top X games, where X is the input supplied.\nIf input is ommitted, X = 5.\nIf the input is \"detailed\" then all games are returned.");
} else {
	var players = 0, nullers = 0, offline = 0, Games = {}, user;
	var pattern=/dota ?2/i;
	for (var u = 0; u < server.Users.length; u++) {
		user = server.Users[u];
		name = user.CurrentGame;
		isBot = false;
		for(var z = 0; z < user.Roles.length; z++) {
			var role = user.Roles[z];
			if(role.Name == "Bot") {
				isBot = true;
			}
		}
		
		if(isBot == false) {
			if(name != null) {
				if(pattern.test(name)) {
					name = "DOTA 2";
				}
				players++;
				
				if(Games[name] == undefined) {
					Games[name] = 1;
				} else {
					Games[name]++;
				}
			} else {
				if(user.State != "offline") {
					nullers++;
				} else {
					offline++;
				}
			}
		}
	}

	var games = [];
	for(var a in Games) {
		games.push([a, Games[a]]);
	}
	
	games.sort(
		function(a, b) {
			if(a[1] == b[1]) {
				if(String(a[0]).toLowerCase() < String(b[0]).toLowerCase()) {
					return -1;
				}
				return 1;
			}
			return b[1] - a[1];
		}
	);

	var showAmount;
	var output = "There are currently "+(players+nullers)+ " people online.\n";
	output += players + " people are playing a combined " + games.length + " games.\n";
	output += nullers + " people are not playing anything.\n";
	output += offline + " people are offline.\n";
	output += "\nShowing ";
	if(input >= games.length || input == "detailed") {	
		showAmount = games.length;
		output += "all games";
	} else {
		if (input < games.length && input != 0) {
			showAmount = input;
		} else {
			showAmount = 5;
		}
			
		if(showAmount == 1) {
			output +="the top game";
		} else {
			output += "the top " + showAmount + " games";
		}
	}
	output += ":\n```";
	for(var i = 0; i < showAmount; i++) {
		output += games[i][0] + " : " + games[i][1] + " player";
		if(games[i][1] != 1) {
			output += "s";
		}
		output += "\n";
	}	
	output += "```";	
	print(output);
}
