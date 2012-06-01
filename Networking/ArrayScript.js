#pragma strict

class PlayerInfo {
	var number : NetworkViewID;
	var spawnPt : String;
	var name : String;
	var player : NetworkPlayer;
	var me : boolean = false;
	
	function ToString() : String {
		return name + " " + number;
	}
}

@System.NonSerialized
var playerList : Array = new Array();

function addLocalPlayer (p : PlayerInfo) {
	p.me = true;
	playerList.Add(p);
	Debug.Log(GetComponent(ConnectGui).playerName);
	Debug.Log("Added player "+p.number);
	networkView.RPC("setPlayerInfo", RPCMode.OthersBuffered, p.number, p.spawnPt, p.name, p.player);
	networkView.RPC("getPlayerInfo", RPCMode.Server, p.player);
}

@RPC
function setPlayerName(name : String, ID: NetworkViewID){
	for (var p : PlayerInfo in playerList){
		if (p.number.Equals( ID)) {
			p.name = name;
			Debug.Log("Name set to " + p.name +" from "+ ID.ToString());
		}
	}
}

@RPC
function setPlayerInfo(number : NetworkViewID, spawnPt : String, name : String, player : NetworkPlayer){
	var inArray : boolean = false;
	for (var p : PlayerInfo in playerList){
		//if networkid is identical, overwrite player
		if (number == p.number){
			p.spawnPt = spawnPt;
			p. name = name;
			p.player = player;
			inArray = true;
			break;
		}
	}
	var newPlayer : PlayerInfo = new PlayerInfo(); 
	newPlayer.number = number;
	newPlayer.spawnPt = spawnPt;
	newPlayer. name = name;
	newPlayer.player = player;
	playerList.Add(newPlayer);
	Debug.Log("added "+name+ number);
}

@RPC
function getPlayerInfo(sender : NetworkPlayer){
	for (var p : PlayerInfo in playerList){
		if (sender.Equals(p.player) == false){
			Debug.Log("Sending player "+ p.name);
			networkView.RPC("setPlayerInfo", sender, p.number, p.spawnPt, p.name, p.player);
		}
		
	}
}