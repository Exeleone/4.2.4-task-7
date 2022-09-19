const alert = document.querySelector('#alert');
const alertTitle = alert.querySelector('#alertTitle');
const alertMsg = alert.querySelector('#alertMsg');

const createAlert = (res) => {
    if (res.type == 'success') {
        alert.classList.add('alert-success');
    }
    if(res.type == 'error') {
        alert.classList.add('alert-danger');
    }
    alertTitle.innerText = res.title;
    alertMsg.innerText = res.msg;
    alert.style.display = 'block';
}

const changeUserInfo = () => {
    const login = document.querySelector('#login').value;
    const userName = document.querySelector('#userName').value;
    alert.style.display = 'none';
    $.ajax({
        method: "POST",
        url: "/api/v1/editUserInfo.php",
        data: {
            login: login,
            userName: userName
        },
        success: (data) => {
            const res = JSON.parse(data);
            createAlert(res);
        }
    });
}

const changePassword = () => {
    const oldPass = document.querySelector('#oldPassword').value;
    const newPass = document.querySelector('#newPassword').value;
    alert.style.display = 'none';
    $.ajax({
        method: "POST",
        url: "/api/v1/editUserPass.php",
        data: {
            old: oldPass,
            new: newPass
        },
        success: (data) => {
            const res = JSON.parse(data);
            createAlert (res);
        }
    });
}