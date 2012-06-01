#pragma strict

var roundLength_minutes = GetComponent(RoundControl).roundLength_minutes; //round length, in minutes
var roundCountdown_seconds = GetComponent(RoundControl).roundCountdown_seconds; //10 seconds for round start countdown

@System.NonSerialized
private var textMesh : TextMesh;

//round length, in seconds
@System.NonSerialized
private var roundLength_seconds = roundLength_minutes * 60;

//boolean to start countdown at first round, or after previous round's scoreBreak
@System.NonSerialized
private var beginCountdown = false; 

//boolean to start roundLength_seconds after countdown
@System.NonSerialized
private var beginGameTime = false; 

//boolean to signal roundOver
@System.NonSerialized
private var roundOver = false; 

// - - - - - - - - -

function Update() {
	if (beginCountdown) {
		//begin initial countdown
    	InvokeRepeating("CountdownTick", 1.0, 1.0);
    	beginCountdown = false; //reset
	}
	else if (beginGameTime) {
		//countdown main round time
    	InvokeRepeating("RoundLengthTick", 1.0, 1.0);
    	beginGameTime = false; //reset
	}
}

function CountdownTick() {
	Debug.Log("ROUND STARTING IN: " + roundCountdown_seconds.ToString() + " seconds");
	//textMesh.text = roundCountdown.ToString();
    if (--roundCountdown_seconds == 0) {
    	CancelInvoke("CountdownTick");
    	//call to inform users -> start round >>> TODO
    	beginGameTime = true;
    }   
}

function RoundLengthTick() {
	Debug.Log("TIME LEFT: " + roundLength_seconds.ToString() + " seconds");
	//textMesh.text = roundLength_seconds.ToString();
    if (--roundLength_seconds == 0) {
    	CancelInvoke("RoundLengthTick");
    	roundOver = true;
    }
}

//??unused??
function StartCountdown() {
	beginCountdown = true;
}

function TimeLeft() : int {
	return roundLength_seconds;
}

function isOver() : boolean {
	return roundOver;
}

function isDuringCountdown() : boolean {
	if (roundCountdown_seconds > 0) {
		return true;
	}
	return false;
}

function isDuringRoundTime() : boolean {
	if (roundCountdown_seconds == 0 && roundLength_seconds > 0) {
		return true;
	}
	return false;
}