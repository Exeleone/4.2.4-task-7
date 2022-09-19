<?php 
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {

    $id = $_POST['id'];
    $db->query("DELETE FROM `groups` WHERE `id` = '$id'");
}