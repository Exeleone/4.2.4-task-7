<?php 
require_once $_SERVER['DOCUMENT_ROOT'].'/autoload.php';

$login = $_POST['login'];

if ($login) {
    $result = $db->query("SELECT * FROM `users` WHERE `login` = '$login'");
    if ($result->num_rows == 1) {
        $sqId = $result->fetch_assoc()['secret_question_id'];
        if (!isset($sqId)) {
            echo json_encode([
                'type' => 'error',
                'msg' => 'Сначала пройдите регистрацию!'
            ]);
        } else {
            $qTitle = $db->query("SELECT `title` FROM `secret_questions` WHERE `id` = '$sqId'")->fetch_assoc()['title'];
            echo json_encode([
                'type' => 'success',
                'msg' => $qTitle
            ]);
        }
    } else {
        echo json_encode([
            'type' => 'error',
            'msg' => 'Пользователя с таким логином не существует!'
        ]);
    }
} else {
    header('Location: /');
}

?>