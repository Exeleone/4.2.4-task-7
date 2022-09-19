<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    if ($_POST['id']) {
        $id = $_POST['id'];
        $group =  $db->query("SELECT `group_id`,`semester` FROM `disciplines` WHERE `id` = '$id'")->fetch_assoc();
        $gId = $group['group_id'];
        $semester = $group['semester'];
        $getGroup = $db->query("SELECT * FROM `groups` WHERE `id` = '$gId'")->fetch_assoc();
        $getGroup['semester'] = $semester;
        echo json_encode($getGroup);
    }
}

?>