<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

$allDiscList = [];
$allMarksList = [];

if ($_SESSION['username']) {
    $login = $_SESSION['username'];

    //student id
    $student = $db->query("SELECT `id`,`group_id` FROM `users` WHERE `login` = '$login'")->fetch_assoc();
    $sId = $student['id'];
    $groupId = $student['group_id'];
    //get post values
    $course = ($_POST['course']) ? $_POST['course'] : 1;
    $semester = ($_POST['sem']) ? $_POST['sem'] : 1;

    //make request to db
        //its marks
    $result = $db->query("SELECT * FROM `marks` WHERE `student_id` = '$sId' AND `course` = '$course' AND `semester` = '$semester'");

        //all disc
    $disc = $db->query("SELECT * FROM `disciplines` WHERE `course` = '$course' AND `semester` = '$semester' AND `group_id` = '$groupId'");

    $res = [];
    while($mark1 = $result->fetch_assoc()) {
        $discId = $mark1['discipline_id'];
        $res[$discId] = [];
    }

    $result = $db->query("SELECT * FROM `marks` WHERE `student_id` = '$sId' AND `course` = '$course' AND `semester` = '$semester'");

    while($mark = $result->fetch_assoc()) {
        $discId = $mark['discipline_id'];
        $attMark = [$mark['attestation'] => $mark['value']];
        array_push($res[$discId], $attMark);
    }
    $getAllDisc = $db->query("SELECT `id` FROM `disciplines` WHERE `course` = '$course' AND `semester` = '$semester' AND `group_id` = '$groupId'");
    while($discId = $getAllDisc->fetch_assoc()) {
        $dId = $discId['id'];
        if (!$res[$dId]) {
            $res[$dId] = [];
        }
    }
    echo json_encode($res);
}

