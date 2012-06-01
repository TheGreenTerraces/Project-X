#pragma strict
var player : PlayerInfo;
function setName(name : String){
	player.name = name;
}

function setNumber(num : NetworkViewID){
	player.number = num;
}

function setSpawnPt(spawnPt : String){
	player.spawnPt = spawnPt;
}

function setPlayer(pl : NetworkPlayer){
	player.player = pl;
}

function setIsMe(isme : boolean){
	player.me = isme;
}
