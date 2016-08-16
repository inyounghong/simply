<?php
include('connect.php');
$conn = db_connect();

saveJournals($conn);
$conn->close();

function saveJournals($conn) {
	$json = file_get_contents("php://input");
	$postData = json_decode($json);
	$user = $postData->user;
	$name = $postData->name;
	$journal = $postData->journal;
	$journal_str = $conn->real_escape_string(json_encode($journal));

	$query = "INSERT INTO journals (user, journal, name, trash) VALUES ('$user', '$journal_str', '$name', 0)";
	$result = $conn->query($query);

	if (!$result) {
		echo mysqli_error($conn);
	} else {
		echo $result;
	}
}

?>