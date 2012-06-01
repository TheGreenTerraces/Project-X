#pragma strict

var respawnTime_seconds = 10;

@System.NonSerialized
var gameStateController : GameStateController = GameObject.Find("GUI").GetComponent("GameStateController");

@RPC
function Die() {
	//1. DEATH ANIMATION
	//-->
	
	//2. HEAD MOVEMENT/FADE OUT
	//-->
	
	//3. DISABLE MOVEMENT
	ToggleMovement(false);
	
	//4. TRANSFORM TO WAITING ROOM
	transform.position = GameObject.Find("spawnpoint_waitingroom").transform.position;
	
	//5. GAMESTATE >> InRoundDead + Scoring
	gameStateController.SetLocalGameState(GameState.InRoundDead);
	
	//6. STATE RESPAWN TIMER
	InvokeRepeating ("RespawnTimer", 1.0, 1.0);
}

function RespawnTimer() {
	//--> some gui display? TODO
    if (--respawnTime_seconds == 0) {
    	CancelInvoke("RespawnTimer");
    	Respawn();
    }
}

function Respawn() {
	//1. GAME STATE CHANGE
	//if (isKiller) { //TODO
		//gameStateController.SetLocalGameState(GameState.InRoundKiller);
	//else
		gameStateController.SetLocalGameState(GameState.InRound);
		
	//2. RESPAWN PLAYER
	var playerList = GameObject.Find("GUI").GetComponent(ArrayScript).playerList;
	for (var p : PlayerInfo in playerList){
		if (p.number.Equals(networkView.viewID)){
			transform.position = GameObject.Find(p.spawnPt).transform.position;
		}
	}
	
	//3. SPAWNING ANIMATION
	//-->
	
	//4. MOVEMENT ON
	ToggleMovement(true);
	
	//5. GUI TEXT?
	//-->
}

function ToggleMovement(toggleOn : boolean) {
	if (toggleOn) {
		GetComponent(FPSInputController).enabled = true;
		GetComponent(CharacterMotor).enabled = true;
		GetComponent(CharacterController).enabled = true;
		GetComponent(MouseLook).enabled = true;
	}
	else {
		GetComponent(FPSInputController).enabled = false;
		GetComponent(CharacterMotor).enabled = false;
		GetComponent(CharacterController).enabled = false;
		GetComponent(MouseLook).enabled = false;
	}
}