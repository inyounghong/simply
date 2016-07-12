<?php
$conn = db_connect();

$query = "SELECT id, firstname, lastname FROM MyGuests";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["journal"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>