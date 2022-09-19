<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $groupName = $_POST['g'];
    $course = $_POST['c'];
    $enroll = $_POST['e'];
    $db->query("INSERT INTO `groups` SET `name` = '$groupName', `course` = '$course', `enrollment` = '$enroll'");
}