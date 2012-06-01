#pragma strict

var footstep_WALK : AudioClip; //walking
var footstep_RUN : AudioClip; //running

@System.NonSerialized
var footstep_audio_default : AudioClip; //current clip

@System.NonSerialized
var audio_src : AudioSource; //leave empty

@System.NonSerialized
var lastPos: Vector3; //movement tracking

@System.NonSerialized
var clipPlaying : boolean = false; //ready for audio

function Start () {
	lastPos = transform.position;
	footstep_audio_default = footstep_WALK;
	//setup footsteps audio component
	audio_src = gameObject.AddComponent(AudioSource);
	audio_src.clip = footstep_audio_default;
	audio_src.playOnAwake = false;
	audio_src.loop = true;
	audio_src.minDistance = 1;
	audio_src.maxDistance = 10;
	audio_src.dopplerLevel = 0.2;
	audio_src.volume = 0.2;
	audio_src.priority = 250;
}

function Update () {
	if (CharMoved() && !Input.GetKey(KeyCode.LeftControl)) {
	//if char is moving, if stealth not enabled and if footsteps are not already playing...
		if (!clipPlaying) {
			//Debug.Log("playing clip");
			Play();
		}
	}
	else {
		clipPlaying = false;
		//Debug.Log("stopping clip");
		audio_src.Stop();
	}
}

function Play() {
	clipPlaying = true;
	audio_src.Play();
	yield WaitForSeconds(audio_src.clip.length);
}

function SetRunning(isRunning : boolean) {
	if (isRunning == null) {
		Debug.Log("isRunning (func:SetRunning(boolean):Footsteps.js) == null - error");
		return;
	}
	else if (isRunning) {
		footstep_audio_default = footstep_RUN;
		audio_src.volume = 0.4;
	}
	else {
		footstep_audio_default = footstep_WALK;
		audio_src.volume = 0.2;
	}
	audio_src.clip = footstep_audio_default;
}

// Any time you call this function, it will return true if the character
// has moved 1 milimeter or more since the last time the function was called
function CharMoved(): boolean {
  var displacement = transform.position - lastPos;
  lastPos = transform.position;
  return displacement.magnitude > 0.000001; // return true if char moved 1mm
}
