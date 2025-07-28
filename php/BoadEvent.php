<?php
class BodEvent {
    private $conn;

    public function __construct($db_conn) {
        $this->conn = $db_conn;
    }

    public function create($title, $writer = '', $begin_dt = null, $close_dt = null, $contents = '', $active_yn = 'Y') {
        if (empty(trim($title))) {
            throw new InvalidArgumentException("title is required");
        }

        $sql = "INSERT INTO BOD_Event (title, writer, begin_dt, close_dt, contents, active_yn)
                VALUES (:title, :writer, :begin_dt, :close_dt, :contents, :active_yn)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(compact('title', 'writer', 'begin_dt', 'close_dt', 'contents', 'active_yn'));
        return $this->conn->lastInsertId();
    }

    public function update($idx, $title, $writer = '', $begin_dt = null, $close_dt = null, $contents = '', $active_yn = 'Y') {
        if (empty(trim($title))) {
            throw new InvalidArgumentException("title is required");
        }

        $sql = "UPDATE BOD_Event
                   SET title = :title,
                       writer = :writer,
                       begin_dt = :begin_dt,
                       close_dt = :close_dt,
                       contents = :contents,
                       active_yn = :active_yn
                 WHERE ntc_idx = :idx";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute(compact('idx', 'title', 'writer', 'begin_dt', 'close_dt', 'contents', 'active_yn'));
    }

    public function delete($idx) {
        $sql = "DELETE FROM BOD_Event WHERE ntc_idx = :idx";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute(['idx' => $idx]);
    }

    public function get($idx) {
        $sql = "SELECT * FROM BOD_Event WHERE ntc_idx = :idx";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['idx' => $idx]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function list($search = '', $page = 1, $rows = 10) {
        $offset = ($page - 1) * $rows;
        $sql = "SELECT * FROM BOD_Event
                WHERE title LIKE :search
                ORDER BY ntc_idx DESC
                OFFSET :offset ROWS FETCH NEXT :rows ROWS ONLY";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':search', "%$search%", PDO::PARAM_STR);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->bindValue(':rows', (int)$rows, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>