function pd_r(s, c, n) {
  if(s.length>n)
	  s = s.substr(0,n-4)+"...";
  while(s.length<n-c.length)
  {s+=c;}
  return s;
}

var mrs =[];
if(input!=""){var mrs = input.split(" ");}else{print("No input given, dumbass.")}
var users = [];
for(var a  = 0; a<mrs.length;a++)
{users[a] = [];}
for(var a = 0; a<server.Users.length;a++)
{
	var user = server.Users[a];
	var lowest = 0,mrSlot = -1;var state = -1;var game = -1;
	for(var b = 0; b < user.Roles.length;b++)
	{
		var role = user.Roles[b];
		for(var c = 0; c< mrs.length;c++)
		{
			if(role.Name==mrs[c])
				mrSlot = c;
		}
		if(role.Position<user.Roles[lowest])
			lowest = b;
	}
	switch(user.State){
		case "offline": state = 2;break;
		case "idle": state = 1;break;
		case "online": state = 0; break;
	}
	var dspgm;
	if(/dota ?2/i.test(user.CurrentGame))
	{
		dspgm = "in dota2";
		game = 0;
	}
	else
		if(user.CurrentGame == null)
		{	
			game = 1;
			if(state==2)
				dspgm="//offline";
			else
				dspgm="'"+user.State+"'";
		}
		else
		{
			dspgm = "'in another game'";
			game = 2;
		}
	if(mrSlot>=0)
	{
		var tmp1 = user.Name.toUpperCase()
		tmp1 = tmp1.replace(/[\u0250-\ue007]/g, "").trim();
		if(tmp1.length<user.Name.Length-3)
			tmp1 = "<GIBBERISH>";
		users[mrSlot].push([tmp1,user.Roles[lowest].Name,lowest,user.CurrentGame,game,state,dspgm]);
	}
}
var ops=[];var totalLength = 0;
for(var a = 0; a<mrs.length;a++)
{
	ops[a]=[];
	users[a].sort(
		function(a,b){
			if(a[4]==b[4]){//game
				if(a[5]==b[5]){
					if(a[2]==b[2]){//role
						if(String(a[0]).toLowerCase()<String(b[0]).toLowerCase())//namecheck
							return -1;
						return 1;
					}
					return a[2]-b[2];
				}
				return a[5]-b[5];
			}
			if(b[5]==2)
				return -1;
			if(a[5]==2)
				return 1;
			return a[4]-b[4];
		}
	);
	var tmp = "";
	if(a!=0)
		tmp+="\n";
	tmp += "__**"+mrs[a]+"**__```xl\n";
	tmp+= pd_r("USER"," ",25)+"|"+pd_r("INGAME STATUS"," ",25)+"\n";
	tmp+= pd_r("─","─",25)+"┼" + pd_r("─","─",25)+"\n";
	
	ops[a].push(tmp);ops[a].push([]);
	for(var b = 0; b<users[a].length;b++)
	{
		user = users[a][b];
		ops[a][1].push(pd_r(user[0]," ",25)+"│"+user[6]+"\n");
		totalLength+=26+user[6].length;
	}
	totalLength+=126;
}

var op= "";var opSize,spaceRemaining;
if(totalLength<2000)
	opSize = 3000;
else
	opSize = (2000-(mrs.length*126))/mrs.length;
for(var a=0;a<ops.length;a++)
{
	op+= ops[a][0];
	spaceRemaining = opSize;
	for(var b=0;b<ops[a][1].length&&spaceRemaining > 53;b++)
	{
		spaceRemaining-=ops[a][1][b].length;
		op+=ops[a][1][b];
	}
	op+="```";
}
print(op);