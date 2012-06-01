#pragma strict

/** SCRIPT GameStateController to sync the
state of the game with other scripts that 
rely on this information.
**/

enum GameState { MainTitle, GameOptions, ShowInGameMenu, StartedServer,
				 JoinedServer, WaitingForPlayers, RoundCountdown, InRound,
				 InRoundDead, ResultsBreak, ExitGame };


@System.NonSerialized
var curGameState : GameState = GameState.MainTitle;

@System.NonSerialized
private var roundControl : RoundControl = GetComponent(RoundControl);

//---

function GetCurrentGameState() : GameState {
	return curGameState;
}

function SetLocalGameState(newState : GameState) {
	curGameState = newState;
} 

function CallRPCSetGameState(newState : GameState) {
	networkView.RPC("SetGameState", RPCMode.AllBuffered, newState);
}

@RPC
function SetGameState(newState : GameState) {
	curGameState = newState;
}

function Update() {
	//for event driven gameState change
	switch(curGameState) {
		case GameState.MainTitle:
			break;
		case GameState.GameOptions:
			break;
		case GameState.ShowInGameMenu:
			break;
		case GameState.StartedServer:
			break;
		case GameState.JoinedServer:
			break;
		case GameState.WaitingForPlayers:
			break;
		case GameState.RoundCountdown: 
			break;
		case GameState.InRound:
			break;
		case GameState.InRoundDead: 
			//if (isKiller) //TODO
				roundControl.UpdateResult(ScoreMode.KILLER_die); 
			//else
				roundControl.UpdateResult(ScoreMode.CIVILIAN_die);
			break;
		case GameState.ResultsBreak:
			//send RPC call to collect results?
			//OR activate this idea from roundControl
			break;
		case GameState.ExitGame:
			break;
	}
}