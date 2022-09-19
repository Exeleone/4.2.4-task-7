<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $result = $db->query("SELECT `id` FROM `users` WHERE `login` = '$login' AND `user_type` = 'teacher'")->fetch_assoc();
    $tId = $result['id'];


    $groupId = $_POST['group'];
    $semester = $_POST['semester'];
    $course = $_POST['course'];

    $result = $db->query("SELECT * FROM `disciplines` WHERE `teacher_id` = '$tId' AND `group_id` = '$groupId' AND `course` = '$course' AND `semester` = '$semester' ");
    
    $res = [
        "disc" => [],
        "semesters" => null
    ];

    while($d = $result->fetch_assoc()) {
        array_push($res['disc'], $d);
    }
    echo json_encode($res);
} 


?>