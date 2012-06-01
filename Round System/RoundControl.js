#pragma strict

//USER FIELDS
var roundMaximum : int = 10000;
var roundLength_minutes = 0.2;
var roundCountdown_seconds = 10;
var postRoundBreak_seconds = 15; //add with countdown to determine the overall post round break

//SCRIPT FIELDS
@System.NonSerialized
var roundNumber : int = 0;

@System.NonSerialized
var results : Result[] = new Result[roundMaximum];

@System.NonSerialized
var currentRound : Round = null;

@System.NonSerialized
var run : boolean = false;

//for Result class
enum ScoreMode { KILLER_kill, KILLER_survive, KILLER_die, 
				  CIVILIAN_killCorrect, CIVILIAN_killIncorrect,
				  CIVILIAN_die, CIVILIAN_findClue };

class Result {
	var owner : NetworkViewID;
	//TODO - dicuss scoring system with group. 
	//This will determine how the Result class is structured.
	//temporary points system
	var localPoints = 0;
	var groupPoints = 0;
	var kills = 0;
	var deaths = 0;
	
	//NOTE: THIS SCORING SYSTEM NEEDS BALANCING AND TESTING
	function Points(scoreMode : ScoreMode) {
		switch (scoreMode) {
			case ScoreMode.KILLER_kill:
				localPoints = localPoints + 100;
				++kills;
				break;
			case ScoreMode.KILLER_survive:
				localPoints = localPoints + (50 * kills);
				groupPoints = groupPoints - 100;
				break;
			case ScoreMode.KILLER_die:
				localPoints = localPoints - 400;
				++deaths;
				//end of round
				break;
			//-----------------------------------
			case ScoreMode.CIVILIAN_killCorrect:
				localPoints = localPoints + 500;
				groupPoints = groupPoints + 500; //given to every civilian (inclusive) after round ended
				++kills;
				//end of round
				break;
			case ScoreMode.CIVILIAN_killIncorrect:
				localPoints = localPoints - 250;
				//either they are now killed
				//or something else, just bigger loss?
				//TODO ^
				break;
			case ScoreMode.CIVILIAN_findClue:
				localPoints = localPoints + 100;
				break;
			case ScoreMode.CIVILIAN_die:
				++deaths;
				break;
		}
	}
}

class Round {
	var roundID : int;
	var killer : NetworkViewID;
	var roundClock : RoundClock;
	var result = new Result();
	
	function UpdateResult(scoreMode : ScoreMode) {
		result.Points(scoreMode);
	}
}

function Update() {
	if (run && roundNumber < roundMaximum) {
		if (currentRound == null) {
			//start new round
			currentRound = new Round();
			currentRound.roundID = roundNumber;
			//currentRound.killer = null; //TODO add select killer function
			currentRound.roundClock = gameObject.AddComponent(RoundClock);
			currentRound.roundClock.StartCountdown();
			Debug.Log("ROUND " + (roundNumber+1) +  " of " + roundMaximum + " has been started.");
		}
		else if (currentRound.roundClock.TimeLeft() == 30) {
			//inform players 30 seconds left
		}
		else if (currentRound.roundClock.TimeLeft() == 10) {
			//inform players 10 seconds left
		}
		else if (currentRound.roundClock.isOver()) {
			//call to calculate scores
			//...
			//...
			//store this round and its results
			results[roundNumber] = currentRound.result;
			++roundNumber;
			//display the results
			//...
			//...
			//start next round countdown
	    	InvokeRepeating("PostRoundTick", 1.0, 1.0);
		}
	}
}

@RPC
function StartRoundControl() {
	run = true;
}

function UpdateResult(scoreMode : ScoreMode) {
	currentRound.UpdateResult(scoreMode);
}

function getCurrentRoundClock() : RoundClock {
	if (currentRound != null) {
		return currentRound.roundClock;
	}
	return null;
}

function PostRoundTick() {
	Debug.Log("RESULT BREAK OVER IN: " + postRoundBreak_seconds.ToString() + " seconds");
	//textMesh.text = postRoundBreak_seconds.ToString();
    if (--postRoundBreak_seconds == 0) {
    	CancelInvoke("PostRoundTick");
    	currentRound = null; //reset for new round
    }
}