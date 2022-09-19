<?php 
require './autoload.php';
$pageContent = $db->query("SELECT `page_content` FROM `page_content` WHERE `page_name` = 'about'")->fetch_assoc()['page_content'];
?>
<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title h1">
                                О нас
                            </div>
                        </div>
                        <div class="card-body">
                            <?=$pageContent?>
                        </div>
                    </div>
                </div>
                <?php if ($userRole == 'admin'): ?>
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                Редактор страницы "О нас"
                            </div>
                        </div>
                        <div class="card-body">
                            <textarea id="pageEditor">
                                <?=$pageContent?>
                            </textarea>
                        </div>
                        <div class="card-footer">
                            <div class="m-0">
                                <a onclick="saveNewContent()" class="btn btn-primary">
                                    Сохранить изменения
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>