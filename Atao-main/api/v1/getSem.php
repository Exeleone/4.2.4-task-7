<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {

    $course = $_POST['c'];
    $group = $_POST['g'];
    $result = $db->query("SELECT `semester` FROM `disciplines` WHERE `course` = '$course' AND `group_id` = '$group'");

    while($semesterInfo = $result->fetch_assoc()) {
        $res[] = $semesterInfo['semester'];
    }

    if ($res) {
        $semUnique = array_unique($res);
    } else {
        $semUnqique = null;
    }

    echo json_encode($semUnique);
}