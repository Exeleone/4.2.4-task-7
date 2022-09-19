<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_POST['login']) {
    if ($_POST['invCode']) {
        $invCode = $_POST['invCode'];
        $result = $db->query("SELECT * FROM `users` WHERE `invite_code` = '$invCode'");
        if ($result->num_rows == 0) {
            echo json_encode([
                'type' => 'error',
                'title' => 'Ошибка!',
                'msg' => "По данному коду приглашения никто не приглашён!"
            ]);
        } else {
            $login = $_POST['login'];
            $result = $db->query("SELECT * FROM `users` WHERE `login` = '$login'");
            if ($result->num_rows > 0) {
                echo json_encode([
                    'type' => 'error',
                    'title' => 'Ошибка!',
                    'msg' => "Пользователь с логином $login уже зарегистрирован! Попробуйте другой"
                ]);
            } else {
                if (strlen($_POST['answ']) > 3) {
                    $answ = strtolower($_POST['answ']);
                    if ($_POST['pass']) {
                        $pass = trim($_POST['pass']);
                        $sQ = $_POST['sQ'];
                        if (strlen($pass) < 8 OR strlen($pass) > 20) {
                            echo json_encode([
                                'type' => 'error',
                                'title' => 'Ошибка!',
                                'msg' => "Пароль должен быть больше 8 и меньше 20 символов!"
                            ]);
                        } else {
                            if(!preg_match("#[A-Z]+#", $pass)) {
                                echo json_encode([
                                    'type' => 'error',
                                    'title' => 'Ошибка!',
                                    'msg' => "Пароль должен содержать верхний регистр!"
                                ]);
                            } else {
                                $pHash = password_hash($pass, PASSWORD_DEFAULT);
                                $db->query("UPDATE `users` SET `login` = '$login', `secret_question_id` = '$sQ', `secret_question_answer` = '$answ', `password_hash` = '$pHash' WHERE `invite_code` = '$invCode'");
                                echo json_encode([
                                    'type' => 'success',
                                    'title' => 'Успех!',
                                    'msg' => "Вы успешно зарегистрированы! Можно перейти к авторизации. Это окно закроется автоматически."
                                ]);
                            }
                        }
                    } else {
                        echo json_encode([
                            'type' => 'error',
                            'title' => 'Ошибка!',
                            'msg' => "Пароль не может быть пустым!"
                        ]);
                    }
                } else {
                    echo json_encode([
                        'type' => 'error',
                        'title' => 'Ошибка!',
                        'msg' => "Ответ на секретный вопрос не может быть меньше 3 символов!"
                    ]);
                }
            }
        }
    } else {
        echo json_encode([
            'type' => 'error',
            'title' => 'Ошибка!',
            'msg' => 'Код приглашения должен быть заполнен!'
        ]);
    }
} else {
    echo json_encode([
        'type' => 'error',
        'title' => 'Ошибка!',
        'msg' => 'Логин не может быть пустым'
    ]);
}