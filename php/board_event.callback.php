<?php
require_once './board_event.common.php';

$cmd = strtoupper($_REQUEST['cmd'] ?? '');

switch ($cmd) {
    case 'CREATE':
        validateInput($cmd, $_POST);
        echo json_encode([
            'result' => $event->create(
                $_POST['title'],
                $_POST['writer'] ?? '',
                $_POST['begin_dt'] ?? null,
                $_POST['close_dt'] ?? null,
                $_POST['contents'] ?? '',
                $_POST['active_yn'] ?? 'Y'
            )
        ]);
        break;

    case 'UPDATE':
        validateInput($cmd, $_POST);
        echo json_encode([
            'result' => $event->update(
                $_POST['evt_idx'],
                $_POST['title'],
                $_POST['writer'] ?? '',
                $_POST['begin_dt'] ?? null,
                $_POST['close_dt'] ?? null,
                $_POST['contents'] ?? '',
                $_POST['active_yn'] ?? 'Y'
            )
        ]);
        break;

    case 'DELETE':
        validateInput($cmd, $_POST);
        echo json_encode([
            'result' => $event->delete($_POST['evt_idx'])
        ]);
        break;

    case 'VIEW':
        validateInput($cmd, $_GET);
        echo json_encode($event->get($_GET['evt_idx']));
        break;

    case 'LIST':
        echo json_encode($event->list(
            $_GET['keyword'] ?? '',
            $_GET['page_count'] ?? 1,
            $_GET['page_size'] ?? 10
        ));
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid command']);
}

/*
수신 결과
_________________________________________________________________
GET /Board_Event.php?cmd=list&keyword=test&page_count=1&page_size=2

[
  {
    "ntc_idx": 1234,
    "title": "Test Event",
    "writer": "admin",
    "begin_dt": "2025-07-28 10:00:00",
    "close_dt": "2025-07-29 18:00:00",
    "contents": "This is a test event.",
    "active_yn": "Y"
  },
  {
    "ntc_idx": 1233,
    "title": "Another Event",
    "writer": "admin",
    "begin_dt": "2025-07-25 10:00:00",
    "close_dt": "2025-07-26 18:00:00",
    "contents": "Old event",
    "active_yn": "N"
  }
]

_________________________________________________________________
POST /Board_Event.php HTTP/1.1
Content-Type: application/x-www-form-urlencoded

cmd=create&
title=Test Event&
writer=admin&
begin_dt=2025-07-28 10:00:00&
close_dt=2025-07-29 18:00:00&
contents=This is a test event.
active_yn=Y

{
  "result": 1234
}
_________________________________________________________________
*/