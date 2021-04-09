<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Origin, X-Requested-With, Content-Type, Accept");
    
    include "includes/conexion.php";

    $postData = json_decode(file_get_contents('php://input'), true);

    $eventId = $postData["eventId"];
    $response = array();

    if (!($stmt = $conn->prepare("CALL LISTAR_GRUPOS(?)"))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }
    
    $stmt->bind_param("i", $eventId);

    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }

    $stmt->close();

    mysqli_close($conn);

    echo json_encode($response);

    