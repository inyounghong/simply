<?php
include('connect.php');
$conn = db_connect();
deleteJournal($conn);
$conn->close();

function deleteJournal($conn) {
	$input = file_get_contents("php://input");
	// $json = json_decode($input);

	$query = "UPDATE journals SET trash=1 WHERE id='$input'";
	$result = $conn->query($query);

	if (!$result) {
		echo mysqli_error($conn);
	} else {
		echo $result;
	}
}

?>