// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name default.js
// @js_externs server.Users; input; user.Roles; user.CurrentGame; user.State; user.Name; role.Name; role.Position;
// ==/ClosureCompiler==

function pad_right(str, c, len) {
	if(str.length > len) {
		str = str.substr(0, len - 4) + "...";
	}
	while(str.length < len - c.length) {
		str += c;
	}
	return str;
}

var mmrs = [];
if(input != "") {
	mmrs = input.split(" ");
} else {
	print("No input given, friend.");
}

var users = [];
for(var a  = 0; a < mmrs.length; a++) {
	users[a] = [];
}

for(var a = 0; a < server.Users.length; a++) {
	var user = server.Users[a];
	var lowest = 0, mmrSlot = -1, state = -1, game = -1;
	for(var b = 0; b < user.Roles.length; b++) {
		var role = user.Roles[b];
		for(var c = 0; c < mmrs.length;c++) {
			if(role.Name == mmrs[c]) {
				mmrSlot = c;
			}
		}
		if(role.Position < user.Roles[lowest]) {
			lowest = b;
		}
	}
	
	switch(user.State) {
		case "offline": 
			state = 2;
			break;
		case "idle":
			state = 1;
			break;
		case "online":
			state = 0;
			break;
	}
	
	var displayGame;
	if(/dota ?2/i.test(user.CurrentGame)) {
		displayGame = "in dota2";
		game = 0;
	} else if(user.CurrentGame == null) {	
		game = 1;
		if(state == 2) {
			displayGame="//offline";
		} else {
			displayGame="'"+user.State+"'";
		}
	} else {
		displayGame = "'in another game'";
		game = 2;
	}
	
	if(mmrSlot >= 0) {
		var displayName = user.Name.toUpperCase()
		displayName = displayName.replace(/[\u0250-\ue007]/g, "").trim();
		if(displayName.length < user.Name.Length-3) {
			displayName = "<GIBBERISH>";
		}
		users[mmrSlot].push([displayName, user.Roles[lowest].Name, lowest, user.CurrentGame, game, state, displayGame]);
	}
}

var ops = [], totalLength = 0;
for(var a = 0; a < mmrs.length;a++) {
	ops[a] = [];
	users[a].sort(
		function(a, b) {
			if(a[4] == b[4]) {//game
				if(a[5] == b[5]) {
					if(a[2] == b[2]) {//role
						if(String(a[0]).toLowerCase() < String(b[0]).toLowerCase()) {//namecheck
							return -1;
						}
						return 1;
					}
					return a[2] - b[2];
				}
				return a[5] - b[5];
			}
			if(b[5] == 2) {
				return -1;
			} else if(a[5] == 2) {
				return 1;
			} else {
				return a[4] - b[4];
			}
		}
	);
	
	var temp = "";
	if(a != 0) {
		temp += "\n";
	}
	
	temp += "__**" + mmrs[a] + "**__```xl\n";
	temp += pad_right("USER", " ", 25) + "|" + pad_right("INGAME STATUS", " ", 25) + "\n";
	temp += pad_right("─", "─", 25) + "┼" + pad_right("─", "─", 25) + "\n";
	
	ops[a].push(temp);
	ops[a].push([]);
	for(var b = 0; b < users[a].length; b++) {
		user = users[a][b];
		ops[a][1].push(pad_right(user[0], " ", 25) + "│" + user[6] + "\n");
		totalLength += 26 + user[6].length;
	}
	totalLength+=126;
}

var op = "";
var opSize, spaceRemaining;

if(totalLength < 2000) {
	opSize = 3000;
} else {
	opSize = (2000 - (mmrs.length * 126)) / mmrs.length;
}

for(var a = 0; a < ops.length; a++) {
	op += ops[a][0];
	spaceRemaining = opSize;
	for(var b = 0; b < ops[a][1].length && spaceRemaining > 53; b++) {
		spaceRemaining -= ops[a][1][b].length;
		op += ops[a][1][b];
	}
	op += "```";
}
print(op);
