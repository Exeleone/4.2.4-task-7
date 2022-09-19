<?php 
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $userRole = $db->query("SELECT `user_type` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['user_type'];
    if ($userRole == 'admin') {
        if ($_POST['name'] AND $_POST['code']) {
            if (strlen($_POST['name']) < 10) {
                echo json_encode([
                    'type' => 'error',
                    'title' => 'Ошибка',
                    'msg' => 'Поле "ФИО" должно содержать минимум 10 символов'
                ]);
            } else {
                if (strlen($_POST['code']) >= 6 AND strlen($_POST['code']) <= 12 AND (int)$_POST['code']){
                    $name = $_POST['name'];
                    $inviteCode = $_POST['code'];
                    $type = $_POST['type'];

                    if ($_POST['type'] == 'student') {
                        if ($_POST['group'] AND $_POST['course']) {
                            if (gettype((int)$_POST['course']) == 'integer') {
                                //приглашаем студента
                                $group = $_POST['group'];
                                $db->query("INSERT INTO `users` SET `user_name` = '$name', `user_type` = 'student' ,`invite_code` = '$inviteCode', `group_id` = '$group'");
                                echo json_encode([
                                    'type' => 'success',
                                    'title' => 'Успех!',
                                    'msg' => 'Студент приглашен! Его код приглашения: '.$inviteCode
                                ]);
                            } else {
                                echo json_encode([
                                    'type' => 'error',
                                    'title' => 'Ошибка',
                                    'msg' => 'Курс студента должен быть числом!'
                                ]);
                            }
                        } else {
                            echo json_encode([
                                'type' => 'error',
                                'title' => 'Ошибка',
                                'msg' => 'Все поля должны быть заполнены'
                            ]);
                        }
                    } else if ($_POST['type'] == 'teacher') {
                        //приглашаем препода
                        $db->query("INSERT INTO `users` (`user_name`, `user_type`, `invite_code`) VALUES ('$name', 'teacher','$inviteCode')");
                        echo json_encode([
                            'type' => 'success',
                            'title' => 'Успех!',
                            'msg' => 'Преподаватель приглашен! Его код приглашения: '.$inviteCode
                        ]);
                    } else {
                        echo json_encode([
                            'type' => 'error',
                            'title' => 'Ошибка',
                            'msg' => 'Кого вы пытаетесь пригласить?'
                        ]);
                    }
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
                'title' => 'Ошибка',
                'msg' => 'Все поля должны быть заполнены'
            ]);
        }
    }
}