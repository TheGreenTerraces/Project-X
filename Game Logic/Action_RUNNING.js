#pragma strict

var running_speed : float = 6.0;
var walking_speed : float = 3.0;
var stealth_speed : float = 2.0;

@System.NonSerialized
var characterMotor : CharacterMotor;

@System.NonSerialized
var movement : CharacterMotorMovement;

@System.NonSerialized
var footsteps : Footsteps;

function Start() {
	footsteps = GetComponent("Footsteps");
	characterMotor = GetComponent("CharacterMotor");
	movement = characterMotor.movement;
	if (GetComponent("Footsteps") == null) {
		Debug.Log("Footsteps == null");
	}
}

var defaultSidewaysSpeedModifier : float = 1.35;
var defaultBackwardsSpeedModifier : float = 2.35;

function Update () {
	if (Input.GetKey(KeyCode.LeftShift)) {
		movement.maxForwardSpeed = running_speed;
		movement.maxSidewaysSpeed = running_speed-defaultSidewaysSpeedModifier;
		movement.maxBackwardsSpeed = running_speed-defaultBackwardsSpeedModifier;
		try {
			footsteps.SetRunning(true);
		}
		catch (err) {
			Debug.Log("[0] Caught: NullReferenceException");
		}
	}
	else if (Input.GetKey(KeyCode.LeftControl)) {
		movement.maxForwardSpeed = stealth_speed;
		movement.maxSidewaysSpeed = stealth_speed;
		movement.maxBackwardsSpeed = stealth_speed;
	}
	else {
		movement.maxForwardSpeed = walking_speed;
		movement.maxSidewaysSpeed = walking_speed-defaultSidewaysSpeedModifier;
		movement.maxBackwardsSpeed = walking_speed-defaultBackwardsSpeedModifier;
		try {
			footsteps.SetRunning(false);
		}
		catch (err) {
			Debug.Log("[1] Caught: NullReferenceException");
		}
	}
}