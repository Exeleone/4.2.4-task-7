<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';


if ($_SESSION['username']) {
    $id = $_POST['id'];
    $result = $db->query("SELECT * FROM `disciplines` WHERE `id` = '$id'")->fetch_assoc();
    echo json_encode($result);
}