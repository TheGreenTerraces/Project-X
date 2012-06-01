#pragma strict

function OnGUI() {
	GUILayout.Label("BOMBER");
	var start_game = GUILayout.Button("Enter Game");
	GUI.enabled = true;
	
	if (start_game) {
		GUI.enabled = false;
		Application.LoadLevel(1);	
	}
}