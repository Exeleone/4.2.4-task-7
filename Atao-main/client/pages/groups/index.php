<?php 
    require './autoload.php';
?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Редактор групп</div>
                    <div class="col-auto ms-auto">
                        <div class="btn-list">
                            <a id="addGroupBtn" class="btn btn-primary cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Добавить
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-table table-responsive">
                    <table class="table table-vcenter">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Курс</th>
                                <th>Год зачисления</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="groupsList">
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <a class="btn btn-primary cursor-pointer" id="saveBtn">
                        Сохранить
                    </a>
                    <div class="col-auto ms-auto text-muted" id="success">

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>