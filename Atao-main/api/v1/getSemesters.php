<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $result = $db->query("SELECT `id` FROM `users` WHERE `login` = '$login' AND `user_type` = 'teacher'")->fetch_assoc();
    $tId = $result['id'];

    $groupId = $_POST['group'];
    $course = $_POST['course'];

    $semesters = $db->query("SELECT `semester` FROM `disciplines` WHERE `teacher_id` = '$tId' AND `group_id` = '$groupId' AND `course` = '$course' ");
    while ($sem = $semesters->fetch_assoc()) {
        $semArr[] = $sem['semester'];
    }
    if ($semArr) {
        $semUnique = array_unique($semArr);
    } else {
        $semUnqique = null;
    }

    echo json_encode($semUnique);
}