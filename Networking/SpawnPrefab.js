var playerPrefab : Transform;
var spawnPtString;
function OnNetworkLoadedLevel ()
{
	var spawnpointNum = Mathf.CeilToInt(Random.value*10);
	spawnPtString = "spawnpoint"+ spawnpointNum.ToString();
	//Debug.Log(spawnPtString);
	var spawnLoc = GameObject.Find(spawnPtString);
	Debug.Log(spawnLoc.ToString()+" ");
	playerPrefab.GetComponent(PlayerNetworkInit).spawnPtString = spawnPtString;
	var playerInfoScript : PrefabPlayerInfo = playerPrefab.GetComponent(PrefabPlayerInfo);
	playerInfoScript.setName(GameObject.Find("GUI").GetComponent(ConnectGui).playerName);
	playerInfoScript.setSpawnPt(spawnPtString);
	
	
	Network.Instantiate(playerPrefab, spawnLoc.transform.position, spawnLoc.transform.rotation, 0);
	
}
function OnPlayerConnected(player : NetworkPlayer){
	Debug.Log("onplayerConnected:"+player);
	playerPrefab.GetComponent(PrefabPlayerInfo).setPlayer(player);
}
function OnPlayerDisconnected (player : NetworkPlayer)
{
		Debug.Log("Server destroying player");
	Network.RemoveRPCs(player, 0);
	Network.DestroyPlayerObjects(player);
}
