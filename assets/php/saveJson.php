<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

include('connect.php');



  // $json = file_get_contents("php://input");
  // $file = fopen("/Users/inyoung/mamp/new_simply/app/basic_journal/data/form2.json",'w+');
  // $bytes = fwrite($file, $json);
  // fclose($file);

$json = file_get_contents("php://input");

$query = "SELECT * FROM journals";
$result = $conn->query($query);

while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["journal"]. "<br>";
}

// if ($result->num_rows > 0) {
//     // output data of each row
//     while($row = $result->fetch_assoc()) {
//         echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["journal"]. "<br>";
//     }
// } else {
//     echo "0 results";
// }
// $conn->close();
?>