<?php 
    require './autoload.php';
?>
<div class="page-wrapper">
<div class="card-img-bottom img-responsive img-responsive-16by9" style="padding-top: 40%; background-image: url(./api/v1/img/main.jpg)"></div>
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div align="center">
                                <h1>ATAO - следи за успеваемостью онлайн!</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                Пользователей зарегистрировано
                            </div>
                        </div>
                        <div class="card-body p-4 text-center">
                            <div class="h1 m-0" style="font-size: 3rem;">
                            <?
                                echo $db->query("SELECT * FROM `users`")->num_rows;
                            ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                 Оценок выставлено
                            </div>
                        </div>
                        <div class="card-body p-4 text-center">
                            <div class="h1 m-0" style="font-size: 3rem;">
                            <?php 
                                echo $db->query("SELECT * FROM `marks`")->num_rows;
                            ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                 Посещений сегодня
                            </div>
                        </div>
                        <div class="card-body p-4 text-center">
                            <div class="h1 m-0" style="font-size: 3rem;">540</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>