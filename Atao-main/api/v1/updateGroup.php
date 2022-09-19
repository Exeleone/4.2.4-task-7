<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $id = $_POST['id'];
    $course = $_POST['course'];
    $db->query("UPDATE `groups` SET `course` = '$course' WHERE `id` = '$id'");
}