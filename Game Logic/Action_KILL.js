#pragma strict

function Update () {
	if (Input.GetKey(KeyCode.F)) {
		networkView.RPC("KillPlayer", RPCMode.AllBuffered);
	}
}

//TODO (below) create psuesdocode ordering of events and implement
@RPC
function KillPlayer() {
	var origin = GetComponentInChildren(Camera).transform.position;
	var direction = transform.TransformDirection(Vector3.forward);
	var hit : RaycastHit;
	var distance : float = 4;
	var roundControl : RoundControl = GameObject.Find("GUI").GetComponent(RoundControl);
	
	if (Physics.Raycast(origin, direction, hit, distance)){
		Debug.Log(hit.collider.tag);
		//---
		if (hit.collider.tag == "Civilian") {
			hit.collider.networkView.RPC("Die", RPCMode.AllBuffered);
			//if (youARE.theKiller) TODO
				//roundControl.UpdateResult(ScoreMode.KILLER_kill);
			//else
				roundControl.UpdateResult(ScoreMode.CIVILIAN_killIncorrect);
		}
		else if (hit.collider.tag == "Killer") {
			hit.collider.networkView.RPC("Die", RPCMode.AllBuffered);
			roundControl.UpdateResult(ScoreMode.CIVILIAN_killCorrect);
		}
	}
}

