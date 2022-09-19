const gList = document.querySelector('#groupsList');
const addGroupBtn = document.querySelector('#addGroupBtn');
const saveBtn = document.querySelector('#saveBtn');

function saveHandler () {
    let inputs = gList.querySelectorAll('input[data-course]');
    let enrollInputs = gList.querySelectorAll('input[data-enroll]')
    inputs.forEach(i => {
        let course = i.value;
        let id = i.id;
        let successText = document.querySelector('#success');
        $.ajax({
            method: "POST",
            url: "/api/v1/updateGroup.php",
            data: {course: course, id: id},
            success: (data) => {
                successText.innerText = 'Сохранение произошло успешно!'
            }
        });
    });
    enrollInputs.forEach(i => {
        let enrollDate = i.value;
        let id = i.id;
        let successText = document.querySelector('#success');
        $.ajax({
            method: "POST",
            url: "/api/v1/updateGroupEnroll.php",
            data: {en: enrollDate, id: id},
            success: (data) => {
                successText.innerText = 'Сохранение произошло успешно!'
            }
        });
    });
}

function addGroupHandler () {
    modal.innerHTML = `
        <div class="modal modal-blur fade show" id="modal-simple" tabindex="-1" role="dialog" aria-modal="true" style="display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Добавить группу</h5>
            <button type="button" class="btn-close" onclick="closeModal()"></button>
            </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <input type="text" id="groupName" class="form-control" placeholder="название группы">
                        </div>
                        <div class="col-4">
                            <input type="number" id="course" class="form-control" placeholder="курс" value="1">
                        </div>
                        <div class="col-4">
                            <input type="number" id="enrollment" class="form-control" placeholder="Год зачисления" value="21">
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn me-auto" onclick="closeModal()">Отмена</button>
                <button type="button" class="btn btn-primary" id="createGroup">Добавить</button>
            </div>
        </div>
        </div>
    </div>
    `;
    modal.querySelector('#createGroup').onclick = () => {
        let course = modal.querySelector('#course').value;
        let groupName = modal.querySelector('#groupName').value;
        let enrollment = modal.querySelector('#enrollment').value;
        if (course.length == 1) {
            if (groupName.length !== 0) {
                $.ajax({
                    method: "POST",
                    url: "/api/v1/createGroup.php",
                    data: {g: groupName, c: course, e: enrollment},
                    success: (data) => {
                        closeModal();
                        renderGroups();
                    }
                })
            }
        }
    }
    body.appendChild(modal);
}

addGroupBtn.addEventListener('click', addGroupHandler);
saveBtn.addEventListener('click', saveHandler);

function getGroups () {
    return $.ajax({
        method: "POST",
        url: "/api/v1/getGroups.php"
    });
}

function removeGroup (id) {
    console.log('TEST');
    modal.innerHTML = `
    <div class="modal modal-blur fade show" id="modal-danger" tabindex="-1" role="dialog" aria-modal="true" style="display: block; padding-left: 6px;">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="btn-close" onclick="closeModal();"></button>
        <div class="modal-status bg-danger"></div>
        <div class="modal-body text-center py-4">
          
          <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-danger icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 9v2m0 4v.01"></path><path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path></svg>
          <h3>Вы действительно хотите удалить эту группу?</h3>
          <div class="text-muted">Это действие необратимо!</div>
        </div>
        <div class="modal-footer">
          <div class="w-100">
            <div class="row">
              <div class="col"><a onclick="closeModal()" class="btn btn-white w-100" data-bs-dismiss="modal">
                  Отмена
                </a></div>
              <div class="col"><a id="confirmDelete" class="btn btn-danger w-100">
                  Удалить
                </a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    body.appendChild(modal);
    modal.querySelector('#confirmDelete').onclick = () => {
        $.ajax({
            method: "POST",
            url: "/api/v1/removeGroup.php",
            data: {id},
            success: (data) => {
                closeModal();
                renderGroups();
            }
        });
    }
}

async function renderGroups () {
    let groups = JSON.parse(await getGroups());
    gList.innerHTML = null;
    groups.forEach(group => {
        let groupTr = document.createElement('tr');
        groupTr.innerHTML = `
            <td>${group.name}</td>
            <td><input type="number" id="${group.id}" data-course class="form-control w-5" value="${group.course}"></td>
            <td><input type="number" id="${group.id}" data-enroll class="form-control w-5" value="${group.enrollment}"></td>
            <td><a class="link cursor-pointer" onclick="removeGroup(${group.id})">Удалить</a></td>
        `;
        gList.appendChild(groupTr);
        groupTr.querySelector('input').addEventListener('input', function (e) {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.substr(0, 1)
            } else if (e.target.value == '0') {
                e.target.value = 1;
            } else {
                e.target.value = e.target.value.trim();
            }
        });
    });
}

window.onload = () => {
    renderGroups();
}