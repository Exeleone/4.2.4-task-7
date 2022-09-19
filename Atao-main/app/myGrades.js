const marksList = document.querySelector('#marksTable');
const courseList = document.querySelector('#courseList');
const semestersList = document.querySelector('#semesterList')

courseList.addEventListener('change', async function update () {
    await renderSemestersList();
    renderMarksList();
});
semestersList.addEventListener('change', async function update () {
    renderMarksList();
});

function getStudentCourse() {
    return $.ajax({
        method: "POST",
        url: "/api/v1/studentGetCourse.php"
    });
}

function getStudentSemesters() {
    let currentCourse = courseList.value;
    return $.ajax({
        method: "POST",
        url: "/api/v1/getSemestersByStudent.php",
        data: {course: currentCourse}
    });
}

async function renderCoursesList () {
    let studentCourse = await getStudentCourse();
    
    //render current course
    let courseOption = document.createElement('option');
    courseOption.innerText = studentCourse;
    courseOption.value = studentCourse;
    courseOption.selected = true;
    courseList.appendChild(courseOption);

    //render previous courses
    if (studentCourse > 1) {
        for (let i = studentCourse-1; i >= 1; i--) {
            let courseOption = document.createElement('option');
            courseOption.innerText = i;
            courseOption.value = i;
            courseList.appendChild(courseOption);
        }
    }
}

async function renderSemestersList() {
    let currentSemesters = JSON.parse(await getStudentSemesters());
    semestersList.innerHTML = '';
    //render semesters
    if (currentSemesters) {
        Object.values(currentSemesters).forEach(sem => {
            let semesterOption = document.createElement('option');
            semesterOption.innerText = sem;
            semesterOption.value = sem;
            semestersList.appendChild(semesterOption);
        });
    } else {
        let semesterOption = document.createElement('option');
            semesterOption.innerText = '-';
            semesterOption.value = null;
            semesterOption.selected = true;
            semestersList.appendChild(semesterOption);
    }
}


const renderMarksList = () => {
    let c = courseList.value;
    let s = semestersList.value;
    let data = {
        course: c,
        sem: s
    };
    $.ajax({
        method: 'POST',
        url: "/api/v1/getStundetMarks.php",
        data: data,
        beforeSend: function () {
            marksList.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                let skeletTr = document.createElement('tr');
                skeletTr.innerHTML = `
                    <td><div class="skeleton-line"></div></td>
                    <td><div class="skeleton-line"></div></td>
                    <td><div class="skeleton-line"></div></td>
                    <td><div class="skeleton-line"></div></td>
                    <td><div class="skeleton-line"></div></td>
                `;
                marksList.appendChild(skeletTr);
            }
        },
        success: (data) => {
            marksList.innerHTML = '';
            if (data !== 'null') {
                let res = JSON.parse(data);
                let getDiscList = Object.keys(res);
                getDiscList.forEach(discId => {
                    $.ajax({
                        method: "POST",
                        url: "/api/v1/getDiscipline.php",
                        data: {id : discId},
                        success: (data) => {
                            let discData = JSON.parse(data);
                            console.log(discData);
                            let discName = discData.title;
                            let discMarks = res[discId];

                            //create tr for mark
                            let markTr = document.createElement('tr');
                            markTr.innerHTML = `<td>${discName}</td>`;
                            //get marks
                            for (let i = 1; i <= 4; i++) {
                                let attTd = document.createElement('td');
                                attTd.dataset.att = i;
                                attTd.innerText = '-';
                                markTr.appendChild(attTd);
                            }
                            if (discMarks) {
                                discMarks.forEach(mark => {
                                    let attestation = Object.keys(mark);
                                    let value = mark[attestation];
                                    markTr.querySelector(`td[data-att="${attestation}"]`).innerText = value;
                                    if (value == '') {
                                    markTr.querySelector(`td[data-att="${attestation}"]`).innerText = '-';
                                    }
                                });
                            }
                            marksList.appendChild(markTr);
                        }
                    });
                });
            } else {
                let nullTr = document.createElement('tr');
                nullTr.innerHTML = `
                    <td>Ошибка!</td>
                    <td>Оценок в этом курсе и семестре не выставлено!</td>
                    <td></td>
                    <td></td>
                    <td></td>
                `;
                marksList.appendChild(nullTr);
            }
        }
    });
}

window.onload = async function () {
    //wait to get current course
    await renderCoursesList();
    await renderSemestersList();
    renderMarksList();
}