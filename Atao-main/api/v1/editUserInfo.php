<?php 
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    if ($_POST['login'] && $_POST['userName']) {
        $l = $_POST['login'];
        $u = $_POST['userName'];
        $db->query("UPDATE `users` SET `login` = '$l', `user_name` = '$u' WHERE `login` = '$login'");
        $_SESSION['username'] = $l;
        echo json_encode([
            'type' => 'success',
            'title' => 'Успех!',
            'msg' => 'Данные изменены успешно!'
        ]);
    } else {
        echo json_encode([
            'type' => 'error',
            'title' => 'Ошибка!',
            'msg' => 'Все поля должны быть заполнены'
        ]);
    }
} else {
    echo json_encode([
        'type' => 'error',
        'title' => 'Ошибка!',
        'msg' => 'Ошибка авторизации!'
    ]);
}

?>