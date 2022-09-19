<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $userRole = $db->query("SELECT `user_type` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['user_type'];
    if ($userRole == 'admin') {
        if ($_POST['id']) {
            $id = $_POST['id'];
            $result = $db->query("SELECT `user_name`, `invite_code`,`id`,`group_id` FROM `users` WHERE `user_type` = 'student' AND `id` = '$id'")->fetch_assoc();
            echo json_encode($result);
        }
    }
}