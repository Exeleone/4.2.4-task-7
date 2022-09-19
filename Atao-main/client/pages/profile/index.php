<?php 
    require './autoload.php';
    if ($login) {
        $userInfo = $db->query("SELECT * FROM `users` WHERE `login` = '$login'")->fetch_assoc();
    }
?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row">
                <div class="col-3">
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                Личный кабинет
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Логин</label>
                                <input type="text" class="form-control" id="login" value="<?=$userInfo['login']?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ФИО</label>
                                <input type="text" class="form-control" id="userName" value="<?=$userInfo['user_name']?>">
                            </div>
                            <?php if($userRole == 'student'): ?>
                                <div class="mb-3">
                                    <?php
                                        $groupId = $userInfo['group_id'];
                                        $result = $db->query("SELECT * FROM `groups` WHERE `id` = '$groupId'")->fetch_assoc();
                                    ?>
                                    <label class="form-label">Курс</label>
                                    <div class="form-control-plaintext h3"><?=$result['course']?></div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Группа</label>
                                    <div class="form-control-plaintext h3">
                                    <?=$result['name']?>
                                    </div>
                                </div>
                            <?php endif;?>
                        </div>
                        <div class="card-footer">
                            <a onclick="changeUserInfo()" class="btn btn-primary cursor-pointer">
                                Сохранить изменения
                            </a>
                        </div>
                        <div class="card-header">
                            <div class="card-title">
                                Изменить пароль
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Старый пароль</label>
                                <input type="password" id="oldPassword" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Новый пароль</label>
                                <input type="password" id="newPassword" class="form-control">
                            </div>
                        </div>
                        <div class="card-footer">
                            <a onclick="changePassword()" class="btn btn-primary cursor-pointer">
                                Изменить пароль
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="alert" role="alert" id="alert" style="display:none;">
                        <h4 class="alert-title" id="alertTitle"></h4>
                        <div class="text-muted" id="alertMsg"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>