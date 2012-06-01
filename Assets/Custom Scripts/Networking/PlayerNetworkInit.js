

// The playerList is used by both server and client, the client sets his offical server approved info here.

var spawnPtString : String;

function OnNetworkInstantiate (msg : NetworkMessageInfo) {
	// This is our own player
	GetComponent(PrefabPlayerInfo).setNumber(networkView.viewID);
	if (networkView.isMine)
	{
		Debug.Log("ID:"+ networkView.viewID);
		transform.Find("Camera").camera.enabled = true;
		GetComponent("NetworkInterpolatedTransform").enabled = false;
		transform.Find("Camera").GetComponent(AudioListener).enabled = true;
		GetComponent(PrefabPlayerInfo).setIsMe(true);
		GetComponent(PrefabPlayerInfo).setIsMe(true);
		//networkView.RPC("setPlayerName", RPCMode.OthersBuffered, GetComponent(PrefabPlayerInfo).player.name, networkView.viewID );
		GameObject.Find("GUI").GetComponent(ArrayScript).addLocalPlayer(GetComponent(PrefabPlayerInfo).player);
		tag = "LocalPlayer";
		
		
	}
	// This is just some remote controlled player
	else
	{
		Debug.Log("ID:"+ networkView.viewID);
		name += "Remote";
		GetComponent(FPSInputController).enabled = false;
		GetComponent(CharacterMotor).enabled = false;
		GetComponent(CharacterController).enabled = false;
		GetComponent(MouseLook).enabled = false;
		GetComponent(Action_KILL).enabled = false;
		GetComponent(Action_RESPAWN).enabled = false;
		GetComponent(Reaction_DEATH).enabled = false;
		transform.Find("Camera").camera.enabled = false;
		transform.Find("Camera").GetComponent(AudioListener).enabled = false;
		GetComponent("NetworkInterpolatedTransform").enabled = true;
		tag = "RemotePlayer";
		GetComponent(PrefabPlayerInfo).setIsMe(false);
	}
}
function OnGUI(){
	if(networkView.isMine)GUI.Label(new Rect(20, Screen.height-100, 250, 20), "ViewID: "+ networkView.viewID);
}