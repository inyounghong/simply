<?php
include('connect.php');
$conn = db_connect();

saveJournals($conn);
$conn->close();

function saveJournals($conn) {
	$json = file_get_contents("php://input");
	$journal = json_decode($json);
	$user = $journal->user;
	$journal_str = $conn->real_escape_string($json);

	$query = "INSERT INTO journals (user, journal) VALUES ('$user', '$journal_str')";
	$result = $conn->query($query);

	if (!$result) {
		echo mysqli_error($conn);
	}
}

?>