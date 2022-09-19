<?php 
    require './autoload.php';
?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row">
                <div class="col-6">
                    <div class="card">
                        <div class="card-header rows">
                            <div class="card-title col-3">
                                Преподаватели
                            </div>
                            <div class="col-5 ms-auto">
                                <input placeholder="Поиск" class="form-control" type="text" id="searchTeacher">
                            </div>
                            <div class="col-3 ms-auto">
                                <div class="btn-list">
                                    <a onclick="inviteUser('teacher')" class="btn btn-primary cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        Пригласить
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-table table-responsive">
                            <table class="table table-vcenter">
                                <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="teachersList">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                Студенты
                            </div>
                            <div class="col-5 ms-auto">
                                <input placeholder="Поиск" class="form-control" type="text" id="searchStudent">
                            </div>
                            <div class="col-auto ms-auto">
                                <div class="btn-list">
                                    <a onclick="inviteUser('student')" class="btn btn-primary cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        Пригласить
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-table table-responsive">
                            <table class="table table-vcenter">
                                <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Группа</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="studentsList">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
