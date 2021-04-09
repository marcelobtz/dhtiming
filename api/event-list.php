<?php
    header("Access-Control-Allow-Origin: *");

    include "includes/conexion.php";
    $response = array();

    if (!($stmt = $conn->prepare("CALL LISTAR_EVENTOS()"))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }

    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }

    $stmt->close();

    mysqli_close($conn);

    echo json_encode($response);

    