<?php
include("connect.php");

$conn = db_connect();
getJournals($conn);
$conn->close();

function getJournals($conn) {
	$user = $_GET['username'];
	$trash = $_GET['trash'];

	$query = "SELECT * FROM journals WHERE user='$user' AND trash='$trash'";
	$result = $conn->query($query);

	$array = array();
	while($row = $result->fetch_array()) {
		$data = array(
		    'id' => $row['id'],
		    'name' => $row['name'],
		    'trash' => $row['trash'],
		    'journal' => json_decode($row['journal'])
		);
	    $array[] = $data;
	}

	header('Content-type: application/json');
	echo json_encode($array);
}

?>