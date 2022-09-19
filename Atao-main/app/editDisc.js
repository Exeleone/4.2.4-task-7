const dList = document.querySelector('#disciplinesList');
const groupsList = document.querySelector('#groupList');
const courseList = document.querySelector('#courseList');
const semesterList = document.querySelector('#semesterList');


function getTeachers () {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getTeachers.php"
    });
}

function getGroups () {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getGroups.php"
    });
}

function getSem () {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getSem.php",
        data: {c: courseList.value, g: groupsList.value}
    });
}

async function addDiscipline () {
    let teachers = JSON.parse(await getTeachers());
    let groups = JSON.parse(await getGroups());
    modal.innerHTML = `
        <div class="modal modal-blur fade show" id="modal-simple" tabindex="-1" style="display: block; padding-right: 6px;">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Добавить дисциплину</h5>
            <button type="button" class="btn-close" onclick="closeModal()"></button>
            </div>
            <div class="modal-body">
                <div class="alert" id="alert" style="display:none;">
                    <h4 class="alert-title" id="alertTitle"></h4>
                    <div class="text-muted" id="alertMsg"></div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Преподаватель</label>
                    <select class="form-select" id="tSelector"></select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Название</label>
                    <input class="form-control" id="title">
                </div>
                <div class="mb-3" id="groupList">
                    <div class="mb-3">
                        <label class="form-label">Группа</label>
                        <select class="form-select" id="gSelector"></select>
                    </div>
                </div>
                <div class="mb-3">
                    <a id="addGroup" class="cursor-pointer link">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Добавить группу
                    </a>
                </div>
                <div class="mb-3">
                    <label class="form-label">Курс</label>
                    <input class="form-control" id="course">
                </div>
                <div class="mb-3">
                    <label class="form-label">Семестр</label>
                    <input class="form-control" id="semester">
                </div>
                <div class="mb-3">
                    <label class="form-label">Система оценивания</label>
                    <select class="form-select" id="mSelector">
                        <option value="exam">Экзамен</option>
                        <option value="pass">Зачет</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
            <button type="button" class="btn btn-primary" id="addDisc">Добавить</button>
            </div>
        </div>
        </div>
    </div>
    `;
    let gSelector = modal.querySelector('#gSelector');
    let tSelector = modal.querySelector('#tSelector');
    let dTitle = modal.querySelector('#title');
    let course = modal.querySelector('#course');
    let semester = modal.querySelector('#semester');
    let mSelector = modal.querySelector('#mSelector');
    modal.querySelector('#addGroup').onclick = () => {
        let gL = modal.querySelector('#groupList');
        let gDiv = document.createElement('div');
        gDiv.classList.add('mb-3');
        gDiv.innerHTML = `
            <div class="mb-3">
                <label class="form-label">Группа</label>
                <select class="form-select" id="gSelector"></select>
            </div>
        `;
        groups.forEach(g => {
            let gSelector = gDiv.querySelector('#gSelector');
            let gOption = document.createElement('option');
            gOption.innerText = g.name;
            gOption.value = g.id;
            gOption.dataset.course = g.course;
            gSelector.appendChild(gOption);
        });
        gL.appendChild(gDiv);
    }
    //let i = 0;
    groups.forEach(g => {
        //i++
        let gOption = document.createElement('option');
        gOption.innerText = g.name;
        gOption.value = g.id;
        gOption.dataset.course = g.course;
        // if (i == 1) {
        //     course.value = g.course;
        // }
        gSelector.appendChild(gOption);
    });
    // gSelector.addEventListener('change', function () {
    //     let selectedOption = gSelector.options[gSelector.selectedIndex];
    //     course.value = selectedOption.dataset.course;
    // });
    teachers.forEach(t => {
        let gOption = document.createElement('option');
        gOption.innerText = t.user_name;
        gOption.value = t.id;
        tSelector.appendChild(gOption);
    });
    body.appendChild(modal);
    let alert = modal.querySelector('#alert');
    let alertTitle = alert.querySelector('#alertTitle');
    let alertMsg = alert.querySelector('#alertMsg');
    alert.style.display = 'none';
    modal.querySelector('#addDisc').onclick = () => {
        let gSelectors = modal.querySelectorAll('#gSelector');
        let gs = [];

        gSelectors.forEach(select => {
            gs.push(select.value);
        });
        
        let data = {
            title: dTitle.value,
            course: course.value,
            groupList: gs,
            teacher: tSelector.value,
            semester: semester.value,
            mark_sys: mSelector.value
        };
        $.ajax({
            method: "POST",
            url: "/api/v1/addDisc.php",
            data: data,
            success: (data) => {
                if(data) {
                    let res = JSON.parse(data);
                    alert.style.display = 'none';
                    if (res.type == 'error') {
                        alert.classList.add('alert-danger');
                        alertTitle.innerText = res.title;
                        alertMsg.innerText = res.msg;
                        alert.style.display = 'block';
                    } else if (res.type == 'success') {
                        alert.classList.add('alert-success');
                        alertTitle.innerText = res.title;
                        alertMsg.innerText = res.msg;
                        alert.style.display = 'block';
                        setTimeout(function() {
                            closeModal();
                            renderDiscList();
                        }, 2000);
                    }
                }
            }
        });
    }
}

async function renderSemesters () {
    semesterList.innerHTML = '';
    let semesters = JSON.parse(await getSem());
    if (semesters) {
        Object.values(semesters).forEach(sem => {
            console.log(sem);
            let semesterOption = document.createElement('option');
            semesterOption.innerText = sem;
            semesterOption.value = sem;
            semesterList.appendChild(semesterOption);
        });
    } else {
        let semesterOption = document.createElement('option');
            semesterOption.innerText = '-';
            semesterOption.value = null;
            semesterOption.selected = true;
            semesterList.appendChild(semesterOption);
    }
}

async function renderCourses () {
    courseList.innerHTML = '';
    let currentCourse = groupsList.options[groupList.selectedIndex].dataset.course;
    for(let i = 1; i <= currentCourse; i++) {
        let courseOption = document.createElement('option');
        courseOption.innerText = i;
        courseOption.value = i;
        if (i == currentCourse) {
            courseOption.selected = true;
        }
        courseList.appendChild(courseOption)
    }
}

async function renderGroups () {
    let g = JSON.parse(await getGroups());
    g.forEach(group => {
        let gOption = document.createElement('option');
        gOption.innerText = group.name;
        gOption.value = group.id;
        gOption.dataset.course = group.course;
        groupList.appendChild(gOption);
    });
}

function renderDiscList () {
    $.ajax({
        method: "POST",
        url: "/api/v1/getDisciplines.php",
        data: {group: groupsList.value, course: courseList.value, semester: semesterList.value},
        beforeSend: () => {
            dList.innerHTML = null;
            for (let i = 0; i < 10; i++) {
                let skeletonTr = document.createElement('tr');
                skeletonTr.innerHTML = `
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line"></div></td>
            `;
            dList.appendChild(skeletonTr);
            }
        },
        success: (data) => {
            dList.innerHTML = null;
            if(data) {
                let res = JSON.parse(data);
                if (res.type) {
                    if (res.type == 'error') {
                        let errorTr = document.createElement('tr');
                        errorTr.innerHTML = `
                            <td>`+res.title+`</td>
                            <td>`+res.msg+`</td>
                            <td></td>
                            <td></td>
                        `;
                        dList.appendChild(errorTr);
                    }
                } else {
                    res.forEach(disc => {
                        let dTr = document.createElement('tr');
                        dTr.innerHTML = `
                            <td>`+disc.title+`</td>
                            <td>`+disc.group+`</td>
                            <td><a class="link cursor-pointer" onclick="editDisc(${disc.id})">изменить</a></td>
                            <td><a class="link cursor-pointer" onclick="removeDisc(${disc.id})">удалить</a></td>
                        `;
                        dList.appendChild(dTr);
                    });
                }
            }
        }
    });
}

const removeDisc = (id) => {
    modal.innerHTML = `
        <div class="modal modal-blur fade show" id="modal-danger" tabindex="-1" role="dialog" aria-modal="true" style="padding-right: 6px; display: block;">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-status bg-danger"></div>
            <div class="modal-body text-center py-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-danger icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 9v2m0 4v.01"></path><path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path></svg>
                <h3 id="title">Вы уверены что хотите удалить дисциплину?</h3>
                <div class="text-muted" id="msg">Это действие нельзя будет отменить.</div>
            </div>
            <div class="modal-footer" id="footer">
                <div class="w-100">
                <div class="row">
                    <div class="col"><a onclick="closeModal()" class="btn btn-white w-100" data-bs-dismiss="modal">
                        Отмена
                    </a></div>
                    <div class="col"><a id="deleteDisc" class="btn btn-danger w-100" data-bs-dismiss="modal">
                        Удалить
                    </a></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
    let mFooter = modal.querySelector('#footer');
    let title = modal.querySelector('#title');
    let msg = modal.querySelector('#msg');

    modal.querySelector('#deleteDisc').onclick = () => {
        $.ajax({
            method: "POST",
            url: "/api/v1/deleteDisc.php",
            data: {id},
            success: (data) => {
                mFooter.remove();
                title.innerText = 'Дисциплина удалена!';
                msg.innerText = 'Это окно закроется автоматически';
                setTimeout(function() {
                    closeModal();
                    renderDiscList();
                }, 2000);
            }
        });
    }
    body.appendChild(modal);
}

async function editDisc (id) {
    let teachers = JSON.parse(await getTeachers());
    let groups = JSON.parse(await getGroups());
    $.ajax({
        method: "POST",
        url: "/api/v1/getDiscipline.php",
        data: {id},
        success: (data) => {
            let res = JSON.parse(data);
            console.log(res);
            modal.innerHTML = `
                <div class="modal modal-blur fade show" id="modal-simple" tabindex="-1" style="display: block; padding-right: 6px;">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title">Редактировать дисциплину</h5>
                    <button type="button" class="btn-close" onclick="closeModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert" id="alert" style="display:none;">
                            <h4 class="alert-title" id="alertTitle"></h4>
                            <div class="text-muted" id="alertMsg"></div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Преподаватель</label>
                            <select class="form-select" id="tSelector"></select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Название</label>
                            <input class="form-control" id="title" value="`+res.title+`">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Группа</label>
                            <select class="form-select" id="gSelector"></select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Курс</label>
                            <input class="form-control" id="course" value="${res.course}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Семестр</label>
                            <input class="form-control" id="semester" value="`+res.semester+`">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Система оценивания</label>
                            <select class="form-select" id="mSelector">
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
                        <button type="button" class="btn btn-primary" id="saveChanges">Изменить</button>
                    </div>
                </div>
                </div>
            </div>
            `;
            let gSelector = modal.querySelector('#gSelector');
            let tSelector = modal.querySelector('#tSelector');
            let dTitle = modal.querySelector('#title');
            let course = modal.querySelector('#course');
            let semester = modal.querySelector('#semester');
            let mSelector = modal.querySelector('#mSelector');
            let markSys = {};
            markSys['exam'] = 'Экзамен';
            markSys['pass'] = 'Зачет';
            //create mark options
            Object.keys(markSys).forEach(key => {
                let mOption = document.createElement('option');
                mOption.value = key;
                mOption.innerText = markSys[key];
                if (key == res.marks_system) {
                    mOption.selected = true;
                }
                mSelector.appendChild(mOption);
            });

            let i = 0;
            groups.forEach(g => {
                i++
                let gOption = document.createElement('option');
                gOption.innerText = g.name;
                gOption.value = g.id;
                gOption.dataset.course = g.course;
                if (g.id == res.group_id) {
                    gOption.selected = true;
                    //course.value = g.course;
                }
                gSelector.appendChild(gOption);
            });
            gSelector.addEventListener('change', function () {
                let selectedOption = gSelector.options[gSelector.selectedIndex];
                course.value = selectedOption.dataset.course;
            });
            teachers.forEach(t => {
                let gOption = document.createElement('option');
                gOption.innerText = t.user_name;
                gOption.value = t.id;
                if (t.id == res.teacher_id) {
                    gOption.selected = true;
                }
                tSelector.appendChild(gOption);
            });
            body.appendChild(modal);
            let alert = modal.querySelector('#alert');
            let alertTitle = alert.querySelector('#alertTitle');
            let alertMsg = alert.querySelector('#alertMsg');
            alert.style.display = 'none';

            //saveChanges
            modal.querySelector('#saveChanges').onclick = () => {
                let data = {
                    title: dTitle.value,
                    course: course.value,
                    group: gSelector.value,
                    teacher: tSelector.value,
                    semester: semester.value,
                    mark_sys: mSelector.value,
                    id: id
                };
                $.ajax({
                    method: "POST",
                    url: "/api/v1/editDisc.php",
                    data: data,
                    success: (data) => {
                        if(data) {
                            let res = JSON.parse(data);
                            alert.style.display = 'none';
                            if (res.type == 'error') {
                                alert.classList.add('alert-danger');
                                alertTitle = res.title;
                                alertMsg = res.msg;
                                alert.style.display = 'block';
                            } else if (res.type == 'success') {
                                alert.classList.add('alert-success');
                                alertTitle = res.title;
                                alertMsg = res.msg;
                                alert.style.display = 'block';
                                setTimeout(function() {
                                    closeModal();
                                    renderDiscList();
                                }, 2000);
                            }
                        }
                    }
                });
            }
        }
    });
}

groupsList.addEventListener('change', async function onchange() {
    await renderCourses();
    await renderSemesters();
    renderDiscList();
});

courseList.addEventListener('change', async function onchange() {
    await renderSemesters();
    renderDiscList();
});

semesterList.addEventListener('change', async function onchange() {
    renderDiscList();
});

window.onload = async function onload () {
    await renderGroups();
    await renderCourses();
    await renderSemesters();
    renderDiscList();
}