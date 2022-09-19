<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

$group = $_POST['group_id'];
$discipline = $_POST['disc_id'];


if ($_SESSION['username']) {
    $result = $db->query("SELECT * FROM `users` WHERE `user_type` = 'student' AND `group_id` = '$group'");
    while ($student = $result->fetch_assoc()) {
        $studentId = $student['id'];
        $student['marks'] = [];
        $marks = $db->query("SELECT * FROM `marks` WHERE `student_id` = '$studentId' AND `discipline_id` = '$discipline'");
        while ($mark = $marks->fetch_assoc()) {
            $markInfo = [
                'value' => $mark['value'],
                'att' => $mark['attestation'],
                'id' => $mark['id']
            ];
            array_push($student['marks'], $markInfo);
        }
        $res[] = $student;
    }
    echo json_encode($res);
}