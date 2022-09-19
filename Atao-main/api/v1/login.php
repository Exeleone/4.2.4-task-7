<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_POST['login']) {
    $login = $_POST['login'];
    $num = $db->query("SELECT * FROM `users` WHERE `login` = '$login'")->num_rows;
    if ($num == 0) {
        //No user in database
        echo json_encode([
            'type' => 'error',
            'title' => "Ошибка",
            'msg' => 'Такого пользователя не существует!'
        ]);
    } else {
        //have user
        if ($_POST['password']) {
            $password = $_POST['password'];
            //$pHash = password_hash($password, PASSWORD_DEFAULT);
            //$db->query("UPDATE `users` SET `password_hash` = '$pHash' WHERE `login` = '$login'");
            $userRealPassword = $db->query("SELECT `password_hash` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['password_hash'];
            if (password_verify($password, $userRealPassword)) {
                echo json_encode([
                    'type' => 'success',
                    'title' => 'Успешная авторизация!'
                ]);
                $_SESSION['username'] = $login;
            } else {
                echo json_encode([
                    'type' => 'error',
                    'title' => "Ошибка",
                    'msg' => 'Пароль введён неверно!'
                ]);
            }
        } else {
            echo json_encode([
                'type' => 'error',
                'title' => "Ошибка",
                'msg' => 'Пароль не введён!'
            ]);
        }
    }
} else {
    echo json_encode([
        'type' => 'error',
        'title' => "Ошибка",
        'msg' => 'Имя пользователя не введено!'
    ]);
}
