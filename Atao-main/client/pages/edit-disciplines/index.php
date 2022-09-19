<?php 
    require './autoload.php';
?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        Редактор дисциплин
                    </div>
                    <div class="col-auto ms-auto">
                        Группа:
                        <div class="ms-2 d-inline-block">
                            <select class="form-select" id="groupList">
                            </select>
                        </div>
                    </div>
                    <div class="col-auto ms-auto">
                        Курс:
                        <div class="ms-2 d-inline-block">
                            <select class="form-select" id="courseList">
                            </select>
                        </div>
                    </div>
                    <div class="col-auto ms-auto">
                        Семестр:
                        <div class="ms-2 d-inline-block">
                            <select class="form-select" id="semesterList">
                            </select>
                        </div>
                    </div>
                    <div class="col-auto ms-auto">
                        <div class="btn-list">
                            <a onclick="addDiscipline()" class="btn btn-primary cursor-pointer">
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
                                <th>Группа</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="disciplinesList">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>