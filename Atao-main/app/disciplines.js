const dList = document.querySelector('#disciplinesList');
const gList = document.querySelector('#groupList');
const cList = document.querySelector('#courseList');
const semList = document.querySelector('#semesterList');

function getGroups () {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getGroups.php",
    }); 
}

async function renderSemesters () {
    let semesters = $.ajax({
        method: "POST",
        url: "/api/v1/getSemesters.php",
        data: {group: gList.value, course: cList.value}
    });
    let sem = JSON.parse(await semesters);

    if (sem !== null) {
        semList.innerHTML = null;
        Object.values(sem).forEach(sem => {
            let semOption = document.createElement('option');
            semOption.value = sem;
            semOption.innerText = sem;
            semList.appendChild(semOption);
        });
    } else {
        semList.innerHTML = '<option value="null">-</option>'
    }
}

function renderCourses () {
    let selectedCourse = gList.options[gList.selectedIndex].dataset.course;
    cList.innerHTML = null;
    for (let i = 1; i <= selectedCourse; i++) {
        let cOption = document.createElement('option');
        cOption.innerText = i;
        cOption.value = i;
        if (i == selectedCourse) {
            cOption.selected =  true;
        }
        cList.appendChild(cOption);
    }
}

async function renderGroups() {
    let groups = JSON.parse(await getGroups());
    groups.forEach(group => {
        let gOption = document.createElement('option');
        gOption.innerText = group.name;
        gOption.value = group.id;
        gOption.dataset.course = group.course;
        gList.appendChild(gOption);
    });
}


gList.addEventListener('change', async function onchange () {
    renderCourses();
    await renderSemesters();
    renderDisc();
});
cList.addEventListener('change', async function onchange () {
    await renderSemesters();
    renderDisc();
});

semList.addEventListener('change', renderDisc);

async function getDisciplines() {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getDisciplinesByTeacher.php",
        data: { group: gList.value, course: cList.value , semester: semList.value},
        beforeSend: function () {
            for (let i = 0; i < 10; i++) {
                let skeletonTr = document.createElement('tr');
                skeletonTr.innerHTML = `
                    <td><div class="skeleton-line"></div></td>
                    <td><div class="skeleton-line"></div></td>
                `;
                dList.appendChild(skeletonTr);
            }
        }
    });
}

function getGroup (id) {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getGroupByDisc.php",
        data: {id}
    });
}

function setMark(input, dId) {
    let semester = modal.querySelector('#semesterList').value;
    let course = modal.querySelector('#courseList').value;
    let groupId = modal.querySelector('#groupList').value;
    let thisAtt = input.dataset.att;
    let thisValue = input.value;
    let thisStudent = input.dataset.student;
    let thisMarkId = input.id;
    let disciplineId = dId;

    let data = {
        att: thisAtt,
        value: thisValue,
        student: thisStudent,
        mark: thisMarkId,
        discipline: disciplineId,
        course,
        semester
    };

    //if input have id -> we have mark in database
    if (thisMarkId) {
        $.ajax({
            method: "POST",
            url: "/api/v1/changeMark.php",
            data: data,
            success: (data) => {
                renderStudents(groupId,disciplineId)
            }
        });
    } else {
        //else we need to make new mark
        $.ajax({
            method: "POST",
            url: "/api/v1/setMark.php",
            data: data,
            success: (data) => {
                renderStudents(groupId,disciplineId)
            }
        });
    }
    
}

async function renderStudents (groupId, discId) {
    const studentList = modal.querySelector('#sList');
    let getMarkSystem = $.ajax({
        method: "POST",
        url: "/api/v1/getDiscipline.php",
        data: {id: discId}
    });
    let mSys = JSON.parse(await getMarkSystem).marks_system;
    await $.ajax({
        method: "POST",
        url: "/api/v1/getStudentsByGroup.php",
        data: {group_id: groupId, disc_id: discId},
        success: (data) => {
            studentList.innerHTML = '';
            let res = JSON.parse(data);
            if (res !== null) {
                res.forEach(student => {
                    let sTr = document.createElement("tr");
                    let studentId = student.id;
                    sTr.innerHTML = `
                        <td>${student.user_name}</td>
                    `;
                    for (let i = 1; i <= 4; i++) {
                        let attTd = document.createElement('td');

                        //standart input
                        attTd.innerHTML = '<input type="number" data-student="'+studentId+'" data-att="'+i+'" class="form-control" maxlength="1" value="null">';
                        

                        //select if mark system == pass
                        if (i == 4 && mSys == 'pass') {
                            attTd.innerHTML = `
                                <select class="form-select w-10" data-student="`+studentId+`" data-att="`+i+`" id="">
                                    <option value="null"></option>
                                    <option value="зачтено">зачтено</option>
                                    <option value="незачтено">незачтено</option>
                                </select>
                            `;
                        }
                        sTr.appendChild(attTd);
                    }

                    //if student have marks we show it
                    student.marks.forEach(mark => {
                        let markField = sTr.querySelector(`[data-att="${mark.att}"]`);
                        markField.value = mark.value;
                        markField.id = mark.id;
                    });


                    studentList.appendChild(sTr);
                });
            }
        }
    });
    let allInputs = modal.querySelectorAll('input[type="number"]');
    allInputs.forEach(input => {
        input.addEventListener('blur', function () {
            setMark(input, discId)
        });
    });
    let allSelect = modal.querySelectorAll('select');
    allSelect.forEach(select => {
        select.addEventListener('change', function () {
            setMark(select, discId)
        });
    });
}

async function putMarks (dId) {
    let group = JSON.parse(await getGroup(dId));
    //render modal
    modal.innerHTML = `
    <div class="modal modal-blur fade show" id="modal-large" tabindex="-1" style="display: block; padding-right: 6px;" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-full-width modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Выставить оценки</h5>
                    <button type="button" class="btn-close" onclick="closeModal()"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-4">
                                            <div class="ms-2">
                                            Группа:
                                                <div class="ms-2 d-inline-block">
                                                    <select class="form-select" id="groupList" disabled>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="ms-2">
                                            Курс:
                                                <div class="ms-2 d-inline-block">
                                                    <select class="form-select" id="courseList" disabled>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="ms-2">
                                            Семестр:
                                                <div class="ms-2 d-inline-block">
                                                    <select class="form-select" id="semesterList" disabled>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-table table-responsive">
                                <table class="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ФИО</th>
                                            <th>1 атт</th>
                                            <th>2 атт</th>
                                            <th>3 атт</th>
                                            <th>Итоговая</th>
                                        </tr>
                                    </thead>
                                    <tbody id="sList">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
                    <span class="text-muted">
                        Все изменения будут сохранены автоматически.
                    </span>
                </div>
            </div>
        </div>
    </div>
    `;
    //get all from modal
    let sList = modal.querySelector('#sList');
    let semesterList = modal.querySelector('#semesterList');
    let courseList = modal.querySelector('#courseList');
    let groupList = modal.querySelector('#groupList');

    //render group
    let gOption = document.createElement('option');
    gOption.value = group.id;
    gOption.innerText = group.name;
    groupList.appendChild(gOption);
    
    //make courses great again!
    let currentCourse = group.course;
    //create course option
    let courseOption = document.createElement('option');
    courseOption.innerText = currentCourse;
    courseOption.value = currentCourse;   
    courseOption.selected = true;
    courseList.appendChild(courseOption);
    
    //semester
    let currentSemester = group.semester;
    sOption = document.createElement('option');
    sOption.value = currentSemester;
    sOption.innerText = currentSemester;
    semesterList.appendChild(sOption);

    await renderStudents(group.id, dId);

    body.appendChild(modal);
}


async function renderDisc () {
    let discList = JSON.parse(await getDisciplines());
    dList.innerHTML = null;
    if (discList !== null) {
        discList.disc.forEach(disc => {
           let dTr = document.createElement('tr');
           dTr.innerHTML = `
            <td>${disc.title}</td>
            <td> <a class="link cursor-pointer" onclick="putMarks(${disc.id})">выставить оценки</a></td>
           `;
           dList.appendChild(dTr);
        });
    } else {
        let nullTr = document.createElement('tr');
        nullTr.innerHTML = `
            <td>Ошибка!</td>
            <td>При данных условиях дисциплин не найдено!</td>
        `;
    }
}

window.onload = async function onload () {
    await renderGroups();
    renderCourses();
    await renderSemesters();
    renderDisc();
}