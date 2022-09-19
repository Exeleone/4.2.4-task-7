<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $gId = $db->query("SELECT `group_id` FROM `users` WHERE `login` = '$login' AND `user_type` = 'student'")->fetch_assoc()['group_id'];
    $thisCourse = $db->query("SELECT `course` FROM `groups` WHERE `id` = '$gId'")->fetch_assoc()['course'];
    echo $thisCourse;
}
?>