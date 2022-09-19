<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $userRole = $db->query("SELECT `user_type` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['user_type'];
    if ($userRole == 'admin') {
        $code = $_POST['code'];
        $name = $_POST['name'];
        $id = $_POST['id'];
        $group_id = $_POST['group'];
        if ($id) {
            if (strlen($name) < 10) {
                echo json_encode([
                    'type' => 'error',
                    'title' => 'Ошибка!',
                    'msg' => 'ФИО не может быть меньше 10 символов'
                ]);
            } else {
                if (strlen($code) >= 6 AND strlen($code) <= 12 AND (int)$code) {
                    $db->query("UPDATE `users` SET `user_name` = '$name', `invite_code` = '$code', `group_id` = '$group_id' WHERE `id` = '$id'");
                    echo json_encode([
                        'type' => 'success',
                        'title' => 'Успех!',
                        'msg' => 'Данные изменены успешно!'
                    ]);
                } else {
                    echo json_encode([
                        'type' => 'error',
                        'title' => 'Ошибка',
                        'msg' => 'Код приглашения должен состоять из цифр, от 6 до 12 символов'
                    ]);
                }
            }
        } else {
            echo json_encode([
                'type' => 'error',
                'title' => 'Ошибка!',
                'msg' => 'Кого редактируем?'
            ]);
        }
    }
}