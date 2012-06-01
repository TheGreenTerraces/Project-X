function OnGUI ()
{
	if (Input.GetKey(KeyCode.R))
	{
		Debug.Log("you respawned! WOO");
		transform.position = GameObject.Find("spawnpoint1").transform.position;
	}
}