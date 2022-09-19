const tList = document.querySelector('#teachersList');
const sList = document.querySelector('#studentsList');
const searchStudent = document.querySelector('#searchStudent');
const searchTeacher = document.querySelector('#searchTeacher');

const inviteUser = (type) => {
    let modalTitle = 'пользователя';
    if (type == 'student') {
        modalTitle = 'студента';
    }
    let inviteCode = function (min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
    if (type == 'teacher') {
        modalTitle = 'преподавателя';
    }
    $.ajax({
        method: "POST",
        url: "/api/v1/getGroups.php",
        success: (data) => {
            let groups = JSON.parse(data);
            modal.innerHTML = `
            <div class="modal modal-blur fade show" tabindex="-1" style="display: block; padding-right: 6px;">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Пригласить ${modalTitle}</h5>
                <button type="button" class="btn-close" onclick="closeModal()"></button>
            </div>
            <div class="modal-body">
                <div class="alert" id="alert" style="display:none;">
                    <h4 class="alert-title" id="alertTitle">I'm so sorry…</h4>
                    <div class="text-muted" id="alertMsg">Your account has been deleted and can't be restored.</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">ФИО</label>
                    <input id="name" type="text" name="name" class="form-control" placeholder="Иванов Иван Иванович">
                </div>
                <div class="mb-3">
                    <label class="form-label">Код приглашения:</label>
                    <input id="invite-code" type="text" name="invite-code" class="form-control" value=${inviteCode(111111,999999)}>
                </div>
                `
                + (type == 'student' ? `
                <div class="mb-3">
                    <label class="form-label">Группа</label>
                    <select id="group" type="text" name="group" class="form-select">
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Курс</label>
                    <input id="course" type="number" name="course" class="form-control" min="1" max="6" step="1" disabled>
                </div>
                ` : "") + 
                `
            </div>
            <div class="modal-footer">
                <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
                <button type="button" class="btn btn-primary" onclick="sendInvite('${type}')">Пригласить</button>
            </div>
        </div>
        </div>
    </div>
    `;
    if (type == 'student') {
        const groupSelector = modal.querySelector('#group');
        const courseInput = modal.querySelector('#course');
        courseInput.value = groups[0].course;
            groups.forEach(e => {
            let option = document.createElement('option');
            option.innerText = e.name;
            option.value = e.id;
            option.dataset.course = e.course;
            groupSelector.appendChild(option);
        });
        groupSelector.addEventListener('change', function () {
            let selectedOption = groupSelector.options[groupSelector.selectedIndex];
            courseInput.value = selectedOption.dataset.course;
        });
    }
    body.appendChild(modal);
    }
    })
} 

function sendInvite(type) {
    const name = modal.querySelector('#name').value;
    const inviteCode = modal.querySelector('#invite-code').value;
    const alert = modal.querySelector('#alert');
    alert.style.display = 'none';
    const alertTitle = alert.querySelector('#alertTitle');
    const alertText = alert.querySelector('#alertMsg');

    let course = null;
    let group = null;
    if (modal.querySelector('#course')) {
        course  = modal.querySelector('#course').value;
    }
    if (modal.querySelector('#group')) {
        group = modal.querySelector('#group').value;
    }
    const data = {
        name: name,
        code: inviteCode,
        course: course ? course : null,
        group: group ? group : null,
        type: type,
    };
    $.ajax({
        method: "POST",
        url: "/api/v1/inviteUser.php",
        data: data,
        success: (data) => {
            if (data) {
                console.log(data);
                let res = JSON.parse(data);
                if (res.type == 'error') {
                    alert.classList.add('alert-danger');
                    alert.style.display = 'block';
                    alertTitle.innerText = res.title;
                    alertMsg.innerHTML = res.msg;
                } else if (res.type == 'success') {
                    alert.classList.add('alert-success');
                    alert.style.display = 'block';
                    alertTitle.innerText = res.title;
                    alertMsg.innerHTML = res.msg;
                    setTimeout(function() {
                        closeModal();
                        renderUsers();
                    }, 2000);
                }

            }
        }
    });
}

const editTeacher = (tId) => {
    $.ajax({
        method: "POST",
        url: "/api/v1/getTeacher.php",
        data: {id: tId},
        success: (data) => {
            if (data) {
                let res = JSON.parse(data);
                if (res) {
                    modal.innerHTML = `
                        <div class="modal modal-blur fade show" id="modal-simple" tabindex="-1" style="padding-right: 6px; display: block;">
                        <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title">Редактор преподавателя - ${res.user_name}</h5>
                            <button type="button" class="btn-close" onclick="closeModal()"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert" id="alert" style="display:none;">
                                    <h4 class="alert-title" id="alertTitle">I'm so sorry…</h4>
                                    <div class="text-muted" id="alertMsg">Your account has been deleted and can't be restored.</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ФИО</label>
                                    <input class="form-control" id="name" type="text" value="${res.user_name}">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Код приглашения</label>
                                    <input class="form-control" id="code" type="text" value="${res.invite_code}">
                                </div>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveTeacher">Сохранить</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;
                    body.appendChild(modal);
                    modal.querySelector('#saveTeacher').onclick = () => {
                        let newFIO = modal.querySelector('#name').value;
                        let code = modal.querySelector('#code').value;
                        $.ajax({
                            method: "POST",
                            url: "/api/v1/editTeacher.php",
                            data: {code: code, name: newFIO, id: tId},
                            success: (data) => {
                                if(data) {
                                    console.log(data);
                                    let res = JSON.parse(data);
                                    const alert = modal.querySelector('#alert');
                                    alert.style.display = 'none';
                                    const alertTitle = alert.querySelector('#alertTitle');
                                    const alertText = alert.querySelector('#alertMsg');
                                    if(res.type == 'success') {
                                        alert.classList.add('alert-success');
                                        alertTitle.innerText = res.title;
                                        alertText.innerText = res.msg;
                                        alert.style.display = 'block';
                                        setTimeout(function () {
                                            closeModal();
                                            renderTeachers();
                                        }, 2000);
                                    } else if (res.type == 'error') {
                                        alert.classList.add('alert-danger');
                                        alertTitle.innerText = res.title;
                                        alertText.innerText = res.msg;
                                        alert.style.display = 'block';
                                    } else {
                                        console.log(data);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
    });
}

const removeTeacher = (tId) => {
    modal.innerHTML = `
        <div class="modal modal-blur fade show" id="modal-small" tabindex="-1" role="dialog" style="padding-right: 6px; display: block;" aria-modal="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
            <div class="modal-title" id="modalTitle">Вы уверены, что хотите удалить этого преподавателя?</div>
            <div id="modalText">Сделав это, все его данные удалятся</div>
            </div>
            <div class="modal-footer" id="modalFooter">
                <button type="button" class="btn btn-link link-secondary me-auto" onclick="closeModal()">Отмена</button>
                <button type="button" class="btn btn-danger" id="confirmRemove">Удалить</button>
            </div>
        </div>
        </div>
    </div>
    `;
    let btnConfirmRemove = modal.querySelector('#confirmRemove');
    body.appendChild(modal);
    btnConfirmRemove.onclick = () => {
        $.ajax({
            method: "POST",
            url: "/api/v1/removeUser.php",
            data: {id:tId},
            success: (data) => {
                modal.querySelector('#modalTitle').innerText = 'Преподаватель удалён!';
                modal.querySelector('#modalText').innerText = 'Окно закроется автоматически';
                modal.querySelector('#modalFooter').innerHTML = '';
                setTimeout(() => {
                    closeModal();
                    renderTeachers();
                }, 2000);
            }
        });
    }
}

const removeStudent = (sId) => {
    modal.innerHTML = `
        <div class="modal modal-blur fade show" id="modal-small" tabindex="-1" role="dialog" style="padding-right: 6px; display: block;" aria-modal="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
            <div class="modal-title" id="modalTitle">Вы уверены, что хотите отчислить этого студента?</div>
            <div id="modalText">Сделав это, все его данные удалятся</div>
            </div>
            <div class="modal-footer" id="modalFooter">
                <button type="button" class="btn btn-link link-secondary me-auto" onclick="closeModal()">Отмена</button>
                <button type="button" class="btn btn-danger" id="confirmRemove">Удалить</button>
            </div>
        </div>
        </div>
    </div>
    `;
    let btnConfirmRemove = modal.querySelector('#confirmRemove');
    body.appendChild(modal);
    btnConfirmRemove.onclick = () => {
        $.ajax({
            method: "POST",
            url: "/api/v1/removeUser.php",
            data: {id:sId},
            success: (data) => {
                modal.querySelector('#modalTitle').innerText = 'Студент отчислен';
                modal.querySelector('#modalText').innerText = 'Окно закроется автоматически';
                modal.querySelector('#modalFooter').innerHTML = '';
                setTimeout(() => {
                    closeModal();
                    renderStudents();
                }, 2000);
            }
        });
    }
}

const editStudent = (sId) => {
    $.ajax({
        method: "POST",
        url: "/api/v1/getStudent.php",
        data: {id: sId},
        success: (data) => {
            if (data) {
                let res = JSON.parse(data);
                if (res) {
                    modal.innerHTML = `
                        <div class="modal modal-blur fade show" id="modal-simple" tabindex="-1" style="padding-right: 6px; display: block;">
                        <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title">Редактор студента - ${res.user_name}</h5>
                            <button type="button" class="btn-close" onclick="closeModal()"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert" id="alert" style="display:none;">
                                    <h4 class="alert-title" id="alertTitle">I'm so sorry…</h4>
                                    <div class="text-muted" id="alertMsg">Your account has been deleted and can't be restored.</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ФИО</label>
                                    <input class="form-control" id="name" type="text" value="${res.user_name}">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Код приглашения</label>
                                    <input class="form-control" id="code" type="text" value="${res.invite_code}">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Группа</label>
                                    <select class="form-select" id="group"> 
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveStudent">Сохранить</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;
                    body.appendChild(modal);
                    let groupSelector = modal.querySelector('#group');
                    $.ajax({
                        method: "POST",
                        url: "/api/v1/getGroups.php",
                        success: (data) => {
                            let groups = JSON.parse(data);
                            groups.forEach(group => {
                                let gOption = document.createElement('option');
                                gOption.innerText = group.name;
                                gOption.value = group.id;
                                gOption.dataset.course = group.course;
                                if (group.id == res.group_id) {
                                    gOption.selected = true;
                                }
                                groupSelector.appendChild(gOption);
                            });
                            modal.querySelector('#saveStudent').onclick = () => {
                                let newFIO = modal.querySelector('#name').value;
                                let code = modal.querySelector('#code').value;
                                $.ajax({
                                    method: "POST",
                                    url: "/api/v1/editStudent.php",
                                    data: {code: code, name: newFIO, id: sId, group: groupSelector.value},
                                    success: (data) => {
                                        if(data) {
                                            console.log(data);
                                            let res = JSON.parse(data);
                                            const alert = modal.querySelector('#alert');
                                            alert.style.display = 'none';
                                            const alertTitle = alert.querySelector('#alertTitle');
                                            const alertText = alert.querySelector('#alertMsg');
                                            if(res.type == 'success') {
                                                alert.classList.add('alert-success');
                                                alertTitle.innerText = res.title;
                                                alertText.innerText = res.msg;
                                                alert.style.display = 'block';
                                                setTimeout(function () {
                                                    closeModal();
                                                    renderStudents();
                                                }, 2000);
                                            } else if (res.type == 'error') {
                                                alert.classList.add('alert-danger');
                                                alertTitle.innerText = res.title;
                                                alertText.innerText = res.msg;
                                                alert.style.display = 'block';
                                            } else {
                                                console.log(data);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });
}


const renderTeachers = () => {
    $.ajax({
        method: "POST",
        url: "/api/v1/getTeachers.php",
        beforeSend: () => {
            tList.innerHTML = null;
            for (let i = 0; i < 7; i++) {
                let skeletonTr = document.createElement('tr');
                skeletonTr.innerHTML = `
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
            `;
            tList.appendChild(skeletonTr);
            }
        },
        data: {search: searchTeacher.value},
        success: (data) => {
            tList.innerHTML = null;
            const res = JSON.parse(data);
            if (res.type) {
                if (res.type == 'error') {
                    let errorTr = document.createElement('tr');
                    errorTr.innerHTML = '<td>'+res.title+'</td><td>'+res.msg+'</td><td></td>'
                    tList.appendChild(errorTr);
                } 
            } else {
                res.map(teacher => {
                    let tTr = document.createElement('tr');
                    tTr.innerHTML = `
                        <td>${teacher.user_name}</td>
                        <td><a class="link cursor-pointer" onclick="editTeacher(${teacher.id})">редактировать</a></td>
                        <td><a class="link cursor-pointer" onclick="removeTeacher(${teacher.id})">исключить</a></td>
                    `;
                    tList.appendChild(tTr);
                });
            }
        }
    });
}

const renderStudents = () => {
    $.ajax({
        method: "POST",
        url: "/api/v1/getStudents.php",
        beforeSend: () => {
            sList.innerHTML = null;
            for (let i = 0; i < 7; i++) {
                let skeletonTr = document.createElement('tr');
                skeletonTr.innerHTML = `
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
            `;
            sList.appendChild(skeletonTr);
            }
        },
        data: {search: searchStudent.value},
        success: (data) => {
            sList.innerHTML = null;
            const res = JSON.parse(data);
            if (res.type) {
                if (res.type == 'error') {
                    let errorTr = document.createElement('tr');
                    errorTr.innerHTML = '<td>'+res.title+'</td><td>'+res.msg+'</td><td></td>'
                    sList.appendChild(errorTr);
                } 
            } else {
                res.map(student => {
                    let sTr = document.createElement('tr');
                    sTr.innerHTML = `
                        <td>${student.user_name}</td>
                        <td><a class="link cursor-pointer" onclick="editStudent(${student.id})">редактировать</a></td>
                        <td><a class="link cursor-pointer" onclick="removeStudent(${student.id})">исключить</a></td>
                    `;
                    sList.appendChild(sTr);
                });
            }
        }
    });
}

const renderUsers = () => {
    renderStudents();
    renderTeachers();
}

window.onload = () => {
    renderUsers();
}

searchTeacher.addEventListener("input", function() {
    renderTeachers();
});
searchStudent.addEventListener("input", function() {
    renderStudents();
});