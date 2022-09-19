<?php 
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if ($_SESSION['username']) {
    if ($_POST) {
        if ($_POST['page']) {
            if ($_POST['content']) {
                $page = $_POST['page'];
                $content = $_POST['content'];
                $login = $_SESSION['username'];
                $userType = $db->query("SELECT `user_type` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['user_type'];
                if ($userType == 'admin') {
                    if ($page == '/about') {
                        $toPage = 'about';
                    } elseif ($page =='/contacts') {
                        $toPage = 'contacts';
                    } else {
                        $toPage = null;
                    }
                    if ($toPage) {
                        $db->query("UPDATE `page_content` SET `page_content` = '$content' WHERE `page_name` = '$toPage'");
                    }
                }
            }
        }
    }
}

?>