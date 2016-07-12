<?php
function db_connect(){
	$hostname = "deviantart.db.11370614.hostedresource.com";
	$database = "deviantart";
	$username = "deviantart";
	$password = "AlfredFJones#7";

	return new mysqli($hostname, $username, $password, $database) OR DIE ("Unable to
	connect to database! Please try again later.");
}