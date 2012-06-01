#pragma strict

@System.NonSerialized
var alpha : int = 1;

@System.NonSerialized
var onHoverAlpha : int = 2;

function Start() {
	renderer.material.color = Color.gray;
}

function OnMouseEnter() {
//on hover:
	renderer.material.color.a = onHoverAlpha;
	gameObject.GetComponent(AudioSource).Play();
}

function OnMouseExit() {
//normalize:
	renderer.material.color = Color.gray;
}

function OnMouseDown() {
//on click:
	GUI.enabled = true;
	Application.LoadLevel(1);
}