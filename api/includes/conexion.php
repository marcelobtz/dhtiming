<?php
$servername = "162.241.253.96";
$database = "dhtiming_tiempos";
$username = "dhtiming_tiempos";
$password = "Godie248@comp";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>