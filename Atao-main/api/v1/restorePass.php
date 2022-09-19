<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_POST['login']) {
    $login = $_POST['login'];
    $result = $db->query("SELECT * FROM `users` WHERE `login` = '$login'");
    //check login in db
    if ($result->num_rows == 1) {
        //get secret question
        $sqId = $result->fetch_assoc()['secret_question_id'];
        //no question id
        if (!isset($sqId)) {
            echo json_encode([
                'type' => 'error',
                'msg' => 'Сначала пройдите регистрацию!'
            ]);
        } else {
            if ($_POST['answ']) {
                $answ = $_POST['answ'];
                $result = $db->query("SELECT * FROM `users` WHERE `login` = '$login'");
                $userAnsw = $result->fetch_assoc()['secret_question_answer'];
                if ($answ == $userAnsw) {
                    if ($_POST['newPass']) {
                        $newPass = trim($_POST['newPass']);
                        if (strlen($newPass) < 6 OR strlen($newPass) > 20) {
                            echo json_encode([
                                'type' => 'error',
                                'title' => 'Ошибка',
                                'msg' => 'Новый пароль должен содержать от 6 до 20 символов'
                            ]);
                        } else {
                            $newPassHash = password_hash($newPass, PASSWORD_DEFAULT);
                            $db->query("UPDATE `users` SET `password_hash` = '$newPassHash' WHERE `login` = '$login'");
                            echo json_encode([
                                'type' => 'success',
                                'title' => 'Пароль изменён!',
                                'msg' => 'Теперь пройдите авторизацию, окно закроется автоматически!'
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'type' => 'error',
                            'title' => 'Ошибка!',
                            'msg' => 'Необходимо указать новый пароль'
                        ]);
                    }
                } else {
                    echo json_encode([
                        'type' => 'error',
                        'title' => 'Ошибка!',
                        'msg' => 'Ответ на секретный вопрос введён неверно!'.$userAnsw
                    ]);
                }
            } else {
                echo json_encode([
                    'type' => 'error',
                    'title' => 'Ошибка!',
                    'msg' => 'Ответ на секретный вопрос не может быть пустым!'
                ]);
            }
        }
    } else {
        echo json_encode([
            'type' => 'error',
            'title' => 'Ошибка!',
            'msg' => 'Пользователя с таким логином не существует!'
        ]);
    }
} else {
    echo json_encode([
        'type' => 'error',
        'title' => 'Ошибка!',
        'msg' => 'Логин введён неверно'
    ]);
}

?>