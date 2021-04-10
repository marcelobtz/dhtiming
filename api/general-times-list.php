<?php
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}
    
    include "includes/conexion.php";

    $postData = json_decode(file_get_contents('php://input'), true);

    $eventId = $postData["eventId"];
    $groupName = $postData["groupName"];
    $className = $postData["className"];
    $stageName = $postData["stageName"];
    $response = array();

    if (!($stmt = $conn->prepare("CALL LISTAR_TIEMPOS_GENERAL(?, ?, ?, ?)"))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }
    
    $stmt->bind_param("isss", $eventId, $groupName, $className, $stageName);

    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }

    $stmt->close();

    mysqli_close($conn);

    echo json_encode($response);

    