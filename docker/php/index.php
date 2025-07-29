<?php
$mysqli = new mysqli("db", "testuser", "testpw", "testdb");

if ($mysqli->connect_error) {
    die("MySQL 연결 실패: " . $mysqli->connect_error);
}
echo "MySQL 연결 성공!";