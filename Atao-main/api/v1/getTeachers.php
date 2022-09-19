<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';


if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $userRole = $db->query("SELECT `user_type` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['user_type'];
    if ($userRole == 'admin') {
        $search = $_POST['search'];
        $result = $db->query("SELECT `id`, `user_name` FROM `users` WHERE `user_type` = 'teacher' AND `user_name` LIKE '%$search%'");
        if ($result->num_rows > 0) {
            while($res = $result->fetch_assoc()){
                $teachers[] = $res;
            };
            echo json_encode($teachers);
        } else {
            echo json_encode([
                'type' => 'error',
                'title' => 'Ошибка',
                'msg' => 'Пользователи отсутствуют!'
            ]);
        }
    }
} else {
    echo json_encode([
        'type' => 'error',
        'title' => 'Ошибка',
        'msg' => 'Ошибка авторизации!'
    ]);
}