//DontDestroyOnLoad(this);
var remoteIP = "130.195.44.48";
var remotePort = 25000;
var listenPort = 25000;
var remoteGUID = "";
var useNat = false;

// Server variables
var maxPlayers = 1;
private var playerCount : int = 0;

private var isInitialized : boolean = false;
private var gameStarted : boolean = false;
public var playerName : String = "Tester";

private var playerWindow = Rect (10,105,110,50);

private var serverWindow = Rect (130,105,110,50);

private var playerNumbers : String[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];



private var connectionInfo = "";

function Awake() 
{
	if (FindObjectOfType(ConnectGuiMasterServer))
		this.enabled = false;
		
	GUI.enabled = false;
}

function OnGUI ()
{
	var menu_button = GUILayout.Button("Menu");
	
	if (menu_button) {
		Application.LoadLevel(0);
	}
	GUILayout.Space(10);
	GUILayout.BeginHorizontal();
	GUILayout.Space(10);
	
	if (Network.peerType == NetworkPeerType.Disconnected)
	{
		useNat = GUILayout.Toggle(useNat, "Use NAT punchthrough");
		GUILayout.EndHorizontal();
		GUILayout.BeginHorizontal();
		GUILayout.Space(10);

		GUILayout.BeginVertical();
		if (GUILayout.Button ("Connect"))
		{
			if (useNat)
			{
				if (!remoteGUID)
					Debug.LogWarning("Invalid GUID given, must be a valid one as reported by Network.player.guid or returned in a HostData struture from the master server");
				else
					Network.Connect(remoteGUID);
			}
			else
			{
				Network.Connect(remoteIP, remotePort);
			}
		}
		if (GUILayout.Button ("Start Server"))
		{
			Network.InitializeServer(32, listenPort, useNat);
			// Notify our objects that the level and the network is ready
			for (var go in FindObjectsOfType(GameObject))
				go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);		
				
		}
		GUILayout.EndVertical();
		if (useNat)
		{
			remoteGUID = GUILayout.TextField(remoteGUID, GUILayout.MinWidth(145));
		}
		else
		{
			remoteIP = GUILayout.TextField(remoteIP, GUILayout.MinWidth(100));
			remotePort = parseInt(GUILayout.TextField(remotePort.ToString()));
		}
		playerWindow = GUILayout.Window(1, playerWindow, MakePlayerWindow, "Player Info");
		serverWindow = GUILayout.Window(2, serverWindow, MakeServerWindow, "Server Info");
	}
	else
	{
		
		if (useNat)
			GUILayout.Label("GUID: " + Network.player.guid + " - ");
		GUILayout.Label("Local IP/port: " + Network.player.ipAddress + "/" + Network.player.port);
		GUILayout.Label(" - External IP/port: " + Network.player.externalIP + "/" + Network.player.externalPort);
		GUILayout.EndHorizontal();
		GUILayout.BeginHorizontal();
		if (GUILayout.Button ("Disconnect"))
			Network.Disconnect(200);
		if (!gameStarted) {
			GUI.contentColor = Color.blue;
			GUI.Label(new Rect(20, Screen.height-60, 250, 20), "Ghost mode, waiting for more players");
		}	
		//FIX THIS
		//GUI.Label(new Rect(Screen.width-150, 20, 140, 50), "Player name: "+ playerList[0].name + "\nPlayer number: " + playerList[0].number);
		
	}
	GUILayout.FlexibleSpace();
	GUILayout.EndHorizontal();
	
	//used to switch between menu and no menu
	if (Input.GetKey(KeyCode.Escape)) {
		Debug.Log("Menu up");
		GUI.enabled = false;
	}
}
function MakePlayerWindow(id : int) {
	GUILayout.Label("Name:");
	playerName = GUILayout.TextField(playerName);


	
}

function MakeServerWindow(id : int) {
	GUILayout.Label("Max Players:");
	var tmp = GUILayout.SelectionGrid(maxPlayers-2, playerNumbers, 5);
	maxPlayers = tmp + 2;
}
function OnServerInitialized()
{
	if (useNat)
		Debug.Log("==> GUID is " + Network.player.guid + ". Use this on clients to connect with NAT punchthrough.");
	Debug.Log("==> Local IP/port is " + Network.player.ipAddress + "/" + Network.player.port + ". Use this on clients to connect directly.");
}

function OnConnectedToServer() {
	// Notify our objects that the level and the network is ready
	for (var go in FindObjectsOfType(GameObject))
		go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);	
	
}

function OnDisconnectedFromServer () {
	if (this.enabled != false)
		Application.LoadLevel(Application.loadedLevel);
	else
		FindObjectOfType(NetworkLevelLoad).OnDisconnectedFromServer();
}