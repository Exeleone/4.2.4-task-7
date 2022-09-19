<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    if ($_POST['old'] && $_POST['new']) {
        $old = $_POST['old'];
        $new = $_POST['new'];
        $userOld = $db->query("SELECT `password_hash` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['password_hash'];
        if (password_verify($old, $userOld)) {
            $userNew = password_hash($new, PASSWORD_DEFAULT);
            $db->query("UPDATE `users` SET `password_hash` = '$userNew' WHERE `login` = '$login'");
            echo json_encode([
                'type' => 'success',
                'title' => 'Успех!',
                'msg' => 'Пароль успешно изменён'
            ]);
        } else {
            echo json_encode([
                'type' => 'error',
                'title' => 'Ошибка!',
                'msg' => 'Старый пароль введён неверно!'
            ]);
        }
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