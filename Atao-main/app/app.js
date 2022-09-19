const modal = document.createElement('div');
const body = document.body;

if (window.localStorage.getItem('theme') == 'dark') {
  body.classList.add('theme-dark');
}

const closeModal = () => {
    modal.remove();
}

function getQuestions () {
  return $.ajax({
    method: "POST",
    url: "api/v1/getQuestions.php"
  });
}

async function renderRegisterModal () {
    let q = JSON.parse(await getQuestions());
    modal.innerHTML = `
    <div class="modal modal-blur fade show" id="modal-report" tabindex="-1" style="display: block; padding-right: 6px;">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Регистрация</h5>
          <button type="button" class="btn-close" onclick="closeModal()"></button>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger" id="alert" style="display:none;">
                <h4 class="alert-title" id="alertTitle"></h4>
                <div class="text-muted" id="alertText"></div>
            </div>
            <div class="mb-3">
                <label class="form-label">Код приглашения</label>
                <input class="form-control" id="inviteCode" name="invite-code" type="text">
            </div>
            <div class="mb-3">                
                <label class="form-label">Логин</label>
                <input class="form-control" id="login" name="login" type="text">
            </div>
            <div class="mb-3">
                <label class="form-label">Пароль</label>
                <input class="form-control" id="pass" name="pass" type="password">
            </div>
            <div class="mb-3">
                <label class="form-label">Секретный вопрос</label>
                <select class="form-control mb-3" id="secretQuestion" name="secret-quesction">
                </select>
                <input class="form-control" id="answ" name="secret-answer" placeholder="Ответ на секретный вопрос">
            </div>
        </div>
        <div class="modal-footer" align="center">
          <a id="registerHandler" class="btn btn-primary link-secondary"">
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  </div>
    `;
    let sQ = modal.querySelector('#secretQuestion');
    q.forEach(question => {
      let qOption = document.createElement('option');
      qOption.innerText = question.title;
      qOption.value = question.id;
      sQ.appendChild(qOption);
    });
    body.appendChild(modal);
    let inviteCode = modal.querySelector('#inviteCode');
    let login = modal.querySelector('#login');
    let pass = modal.querySelector('#pass');
    let answ = modal.querySelector('#answ');

    let alert = modal.querySelector('#alert');
    let alertTitle = alert.querySelector('#alertTitle');
    let alertText = alert.querySelector('#alertText');
    modal.querySelector('#registerHandler').onclick = () => {
      let data = {
        invCode: inviteCode.value,
        login: login.value,
        pass: pass.value,
        answ: answ.value,
        sQ: sQ.value
      };
      $.ajax({
        method: "POST",
        url: "/api/v1/reg.php",
        data: data,
        beforeSend: function () {
          alert.style.display = 'none';
        },
        success: (data) => {
          console.log(data);
          let res = JSON.parse(data);
          if (res.type == 'error') {
            alertTitle.innerText = res.title;
            alertText.innerText = res.msg;
            alert.style.display = 'block';
          } else if (res.type == 'success') {
            modal.innerHTML = `
            <div class="modal modal-blur fade show" id="modal-success" tabindex="-1" style="display: block; padding-right: 6px;" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-status bg-success"></div>
                <div class="modal-body text-center py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-green icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle><path d="M9 12l2 2l4 -4"></path></svg>
                  <h3>${res.title}</h3>
                  <div class="text-muted">${res.msg}</div>
                </div>
              </div>
            </div>
          </div>
            `;
            setTimeout(function() {
              closeModal();
            }, 2000);
          }
        }
      });
    }
}

const renderLoginModal = () => {
    modal.innerHTML = `
    <div class="modal modal-blur fade show" id="modal-report" tabindex="-1" style="display: block; padding-right: 6px;">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Авторизация</h5>
          <button type="button" class="btn-close" onclick="closeModal()"></button>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger" id="alert" style="display:none;">
                <h4 class="alert-title" id="alertTitle"></h4>
                <div class="text-muted" id="alertText"></div>
            </div>
            <div class="mb-3">
                <label class="form-label">Логин</label>
                <input type="text" id="login" class="form-control" name="login">
            </div>
            <div class="mb-3">
                <label class="form-label">
                    <span class="form-label-description">
                        <a href="#" onclick="renderForgetPasswordModal()">Я забыл пароль!</a>
                    </span>
                    Пароль
                </label>
                <input class="form-control" id="password" name="pass" type="password">
            </div>
        </div>
        <div class="modal-footer" align="center">
          <a onclick="loginHandler()" class="btn btn-primary cursor-pointer"">
            Подтвердить
          </a>
        </div>
      </div>
    </div>
  </div>
    `;
    body.appendChild(modal);
}

async function renderForgetPasswordModal () {
    modal.innerHTML = `
    <div class="modal modal-blur fade show" id="modal-report" tabindex="-1" style="display: block; padding-right: 6px;">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Забыл пароль</h5>
          <button type="button" class="btn-close" onclick="closeModal()"></button>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger" id="alert" style="display:none;">
                <h4 class="alert-title" id="alertTitle"></h4>
                <div class="text-muted" id="alertText"></div>
            </div>
            <div class="mb-3">
                <label class="form-label">Логин</label>
                <input type="text" class="form-control" id="login" name="login">
            </div>
            <div class="mb-3">
                <label class="form-label">Секретный вопрос:</label>
                <div class="form-control-plaintext" id="secretQuestion">
                    Чтобы увидеть секретный вопрос - введите Ваш логин!
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Ответ на секретный вопрос</label>
                <input type="text" class="form-control" id="answer" name="answer">
            </div>
            <div class="mb-3">
                <label class="form-label">Новый пароль</label>
                <input type="password" class="form-control" id="newPass" name="pass">
            </div>
        </div>
        <div class="modal-footer" align="center">
          <a id="changePassHandler" class="btn btn-primary">
            Изменить пароль
          </a>
        </div>
      </div>
    </div>
  </div>
    `;
    let login = modal.querySelector('#login');
    let sq = modal.querySelector('#secretQuestion');
    let answ = modal.querySelector('#answer');
    let nPass = modal.querySelector('#newPass');
    let alert = modal.querySelector('#alert');
    let alertTitle = alert.querySelector('#alertTitle');
    let alertText = alert.querySelector('#alertText');
    login.onblur = () => {
      $.ajax({
        method: "POST",
        url: "/api/v1/checkQuestion.php",
        data: {login: login.value},
        success: (data) => {
          let res = JSON.parse(data);
          console.log(res);
          if (res.type == 'success') {
            sq.innerText = res.msg;
          } else if (res.type == 'error') {
            sq.innerText = res.msg;
          } else {
            console.log(data);
          }
        }
      });
    }
    body.appendChild(modal);
    modal.querySelector('#changePassHandler').onclick = () => {
      let data = {
        login: login.value,
        answ: answ.value,
        newPass: nPass.value,
      };
      $.ajax({
        method: "POST",
        url: "/api/v1/restorePass.php",
        beforeSend: function () {
          alert.style.display = 'none';
        },
        data: data,
        success: (data) => {
          let res = JSON.parse(data);
          if (res.type == 'error') {
            alertTitle.innerText = res.title;
            alertText.innerText = res.msg;
            alert.style.display = 'block';
          } else if (res.type == 'success') {
            modal.innerHTML = `
              <div class="modal modal-blur fade show" id="modal-success" tabindex="-1" role="dialog" aria-modal="true" style="padding-right: 6px; display: block;">
              <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-status bg-success"></div>
                  <div class="modal-body text-center py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-green icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle><path d="M9 12l2 2l4 -4"></path></svg>
                    <h3>${res.title}</h3>
                    <div class="text-muted">${res.msg}</div>
                  </div>
                </div>
              </div>
            </div>
            `;
            setTimeout(function () {
              closeModal();
            }, 2000);
          } else {
            console.log(res);
          }
        }
      });
    }
}

const loginHandler = () => {
  const alert = modal.querySelector('#alert');
  const alertTitle = alert.querySelector('#alertTitle');
  const alertText = alert.querySelector('#alertText');
  alert.style.display = 'none';
  const login = modal.querySelector('#login').value;
  const pass = modal.querySelector('#password').value;
  const data = {
    "login": login,
    "password": pass
  };
  $.ajax({
    method: "POST",
    url: "/api/v1/login.php",
    data: data,
    success: (data) => {
      if (data) {
        let res = JSON.parse(data);
        if (res.type == 'error') {
          alertTitle.innerText = res.title;
          alertText.innerText = res.msg;
          alert.style.display='block';
        }
        if (res.type == 'success') {
          document.location.href = '/';
        }
      }
    }
  });
}