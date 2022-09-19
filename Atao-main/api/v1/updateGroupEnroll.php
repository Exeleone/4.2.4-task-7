<?php 

require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    $id = $_POST['id'];
    $en = $_POST['en'];
    $db->query("UPDATE `groups` SET `enrollment` = '$en' WHERE `id` = '$id'");
}