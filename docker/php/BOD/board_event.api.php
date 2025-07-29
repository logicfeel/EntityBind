<?php
require_once './board_event.common.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$endpoint = array_pop($uri);
$id = is_numeric($endpoint) ? intval($endpoint) : null;

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        validateInput($method, $id, $input);
        echo json_encode(['id' => $event->create(
            $input['title'],
            $input['writer'] ?? '',
            $input['begin_dt'] ?? null,
            $input['close_dt'] ?? null,
            $input['contents'] ?? '',
            $input['active_yn'] ?? 'Y'
        )]);
        break;

    case 'GET':
        echo json_encode($id !== null ? $event->get($id) : $event->list(
            $_GET['keyword'] ?? '', $_GET['page'] ?? 1, $_GET['size'] ?? 10
        ));
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        validateInput($method, $id, $input);
        echo json_encode(['success' => $event->update(
            $id,
            $input['title'],
            $input['writer'] ?? '',
            $input['begin_dt'] ?? null,
            $input['close_dt'] ?? null,
            $input['contents'] ?? '',
            $input['active_yn'] ?? 'Y'
        )]);
        break;

    case 'DELETE':
        validateInput($method, $id);
        echo json_encode(['success' => $event->delete($id)]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
}

/*
_________________________________________________________________
GET board_event.api.php/1
{
  "rows": [
    {
      "evt_idx": 1,
      "title": "신규 이벤트 등록",
      "writer": "관리자",
      "begin_dt": "2025-08-01",
      "close_dt": "2025-08-15",
      "contents": "이벤트 내용입니다.",
      "active_yn": "Y",
      "create_dt": "2025-07-28 12:00:00"
    }
  ],
  "row_total": 1
}
_________________________________________________________________
POST /board_event.api.php HTTP/1.1
Content-Type: application/json
{
  "title": "신규 이벤트 등록",
  "writer": "관리자",
  "begin_dt": "2025-08-01",
  "close_dt": "2025-08-15",
  "contents": "이벤트 내용입니다.",
  "active_yn": "Y"
}

{
  "idresult": 123
}
*/