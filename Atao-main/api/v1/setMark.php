<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $teacherId = $db->query("SELECT `id` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['id'];
    $_POST['teacher'] = $teacherId;

    $att = $_POST['att'];
    $value = $_POST['value'];
    $studentId = $_POST['student'];
    $discId = $_POST['discipline'];
    $course = $_POST['course'];
    $semester = $_POST['semester'];

    $db->query("INSERT `marks` SET `value` = '$value', `discipline_id` = '$discId', `teacher_id` = '$teacherId', `semester` = '$semester',
                       `course` = '$course', `student_id` = '$studentId', `attestation` = '$att'");
}