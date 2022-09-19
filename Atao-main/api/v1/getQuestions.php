<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

$q = [];

$result = $db->query("SELECT * FROM `secret_questions`");
while($res = $result->fetch_assoc()) {
    $q[] = $res;
}

echo json_encode($q);

?>