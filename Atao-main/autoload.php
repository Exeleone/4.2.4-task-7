<?php
//session
session_start();
$_SESSION['id'] = $_COOKIE['PHPSESSID'];

//config
$config = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/config.json'));

//bd
$db = new mysqli(
    $config->mysql->db_host,
    $config->mysql->db_user,
    $config->mysql->db_password,
    $config->mysql->db_name
);
$db->set_charset('utf8');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
} 

//route
$route = key($_GET);

?>