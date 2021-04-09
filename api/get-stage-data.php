<?php
    header("Access-Control-Allow-Origin: *");
    
    include "includes/conexion.php";

    $postData = json_decode(file_get_contents('php://input'), true);

    $eventId = $postData["eventId"];
    $groupName = $postData["groupName"];
    $stageName = $postData["stageName"];
    $response = array();

    if (!($stmt = $conn->prepare("CALL EXTRAER_NOMBRE_PRUEBA(?, ?, ?)"))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }
    
    $stmt->bind_param("iss", $eventId, $groupName, $stageName);

    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }

    $stmt->close();

    mysqli_close($conn);

    echo json_encode($response);

    