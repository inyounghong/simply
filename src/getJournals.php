<?php
include("connect.php");

$conn = db_connect();
getJournals($conn);
$conn->close();

function getJournals($conn) {
	$user = $_GET['username'];

	$query = "SELECT * FROM journals WHERE user='$user'";
	$result = $conn->query($query);

	$array = array();
	while($row = $result->fetch_array()) {
	    $array[] = json_decode($row['journal']);
	}

	header('Content-type: application/json');
	echo json_encode($array);
}

?>