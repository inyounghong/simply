<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

function db_connect(){
	$hostname = "deviantart.db.11370614.hostedresource.com";
	$database = "deviantart";
	$username = "deviantart";
	$password = "AlfredFJones#7";

	$mysqli =  new mysqli($hostname, $username, $password, $database);
	if ($mysqli->connect_errno) {
	    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	return $mysqli;
}