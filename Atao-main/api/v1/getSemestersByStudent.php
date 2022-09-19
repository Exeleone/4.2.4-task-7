<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $course = $_POST['course'];
    $login = $_SESSION['username'];

    $gId = $db->query("SELECT `group_id` FROM `users` WHERE `login` = '$login' AND `user_type` = 'student'")->fetch_assoc()['group_id'];
    $sId = $db->query("SELECT `id` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['id'];

    $semList = $db->query("SELECT `semester` FROM `marks` WHERE `student_id` = '$sId' AND `course` = '$course'");
    $semListSecond = $db->query("SELECT `semester` FROM `disciplines` WHERE `group_id` = '$gId' AND `course` = '$course'");

    while($sem = $semList->fetch_assoc()) {
        $allSemesters[] = $sem['semester'];
    }
    while ($semSecond = $semListSecond->fetch_assoc()) {
        $allSemesters[] = $semSecond['semester'];
    }
    if ($allSemesters) {
        $allSem = array_unique($allSemesters);
    } else {
        $allSem = null;
    }
    echo json_encode($allSem);
}
?>