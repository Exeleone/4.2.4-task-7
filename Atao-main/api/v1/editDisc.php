<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

if (!$_POST) {
    header('Location: /');
}

if ($_SESSION['username']) {
    $login = $_SESSION['username'];
    $userRole = $db->query("SELECT `user_type` FROM `users` WHERE `login` = '$login'")->fetch_assoc()['user_type'];
    if ($userRole == 'admin') {
        if ($_POST['id']) {
            if ($_POST['title']) {
                if ($_POST['course']) {
                    if($_POST['semester']) {
                        $title = $_POST['title'];
                        $course = $_POST['course'];
                        $semester = $_POST['semester'];
                        $group_id = $_POST['group'];
                        $teacher_id = $_POST['teacher'];
                        $mark_sys = $_POST['mark_sys'];
                        $id = $_POST['id'];
                        $db->query("UPDATE `disciplines` SET `title` = '$title', `teacher_id` = '$teacher_id',`semester` = '$semester', 
                                           `course` = '$course', `group_id` = '$group_id' ,`marks_system` = '$mark_sys' WHERE `id` = '$id'");
                        echo json_encode([
                            'type' => 'success',
                            'title' => 'Успех!',
                            'msg' => 'Дисциплина изменена, это окно закроется автоматически!'
                        ]);
                    } else {
                        echo json_encode([
                            'type' => 'error',
                            'title' => 'Ошибка!',
                            'msg' => 'Семестр должен быть заполнен!'
                        ]);
                    }
                } else {
                    echo json_encode([
                        'type' => 'error',
                        'title' => 'Ошибка!',
                        'msg' => 'Курс не может быть пустым'
                    ]);
                }
            } else {
                echo json_encode([
                    'type' => 'error',
                    'title' => 'Ошибка!',
                    'msg' => 'Название дисциплины должно быть заполнено'
                ]);
            }
        } else {
            echo json_encode([
                'type' => 'error',
                'title' => 'Ошибка!',
                'msg' => 'Какую дисциплину вы пытаетесь редактировать?'
            ]);
        }
    }
}