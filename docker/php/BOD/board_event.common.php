<?php
// board_event.common.php
require_once './BoardEvent.php';

header('Content-Type: application/json');

try {
    $db = new PDO("mysql:host=db;dbname=mall;charset=utf8mb4", "testuser", "testpw", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $event = new BodEvent($db);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

function validateInput($methodOrCmd, $idOrData, $input = []) {
    // REST 방식: $methodOrCmd = HTTP_METHOD, $idOrData = id
    // Callback 방식: $methodOrCmd = COMMAND, $idOrData = data
    if (in_array($methodOrCmd, ['POST', 'PUT'])) {
        if (empty($input['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'title is required']);
            exit;
        }
    }
    if (in_array($methodOrCmd, ['PUT', 'DELETE']) && $idOrData === null) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit;
    }
    if (in_array($methodOrCmd, ['CREATE', 'UPDATE'])) {
        if (empty($idOrData['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'title is required']);
            exit;
        }
    }
    if (in_array($methodOrCmd, ['VIEW', 'DELETE']) && empty($idOrData['evt_idx'])) {
        http_response_code(400);
        echo json_encode(['error' => 'evt_idx is required']);
        exit;
    }
}