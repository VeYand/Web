function clickPasswordEye() {
    let passwordInput = document.querySelector('.password-field__password-input');
    let passwordEye = document.querySelector('.password-control__image');
    if (passwordInput.type == "password") {
        passwordInput.type = 'text';
        passwordEye.src = PasswordEyeOff;
    }
    else if (passwordInput.type == "text") {
        passwordInput.type = 'password';
        passwordEye.src = PasswordEyeOn;
    }
}


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}

function alertError(text) {
    if (!document.querySelector('.login-status-block')) {
        let loginBlock__Title = document.querySelector('.login-block__title');
        loginBlock__Title.insertAdjacentHTML("afterend", `<div class="login-status-block login-status-block_error">
                                                                <img src="${AlertIconURL}" alt="Status icon" class="login-status-block__icon">
                                                                <span class="login-status-block__text"></span>
                                                            </div>`);
        loginStatusBlock = document.querySelector('.login-status-block');
        setTimeout(() => {
            loginStatusBlock.style.height = '44px';
            loginStatusBlock.style.marginBottom = '31px';
        }, 100);
    }
    document.querySelector('.login-status-block__text').textContent = text;
}

function checkEmail(input) {
    let emailAlertBlock = input.parentNode.querySelector('.alert-text');
    if (isEmailValid(input.value)) {
        if (emailAlertBlock.style.fontSize == '12px')
            setTimeout(() => {
                emailAlertBlock.style.fontSize = '0px';
                emailAlertBlock.style.marginTop = '0px';
            }, 100);
        return true;
    }
    else {
        if (emailAlertBlock.style.fontSize !== '12px')
            setTimeout(() => {
                emailAlertBlock.style.fontSize = '12px';
                emailAlertBlock.style.marginTop = '5px';
            }, 100);
        alertError("A-Ah! Check all fields");
        return false;
    }
}

function checkPassword(input) {
    let passwordAlertBlock = document.querySelector('.login-block__password-field').querySelector('.alert-text');
    if ((input.value !== '') && (input.value !== null)) {
        if (passwordAlertBlock.style.fontSize == '12px')
            setTimeout(() => {
                passwordAlertBlock.style.fontSize = '0px';
                passwordAlertBlock.style.marginTop = '0px';
            }, 100);
        return true;
    }
    else {
        if (passwordAlertBlock.style.fontSize !== '12px')
            setTimeout(() => {
                passwordAlertBlock.style.fontSize = '12px';
                passwordAlertBlock.style.marginTop = '5px';
            }, 100);
        alertError("A-Ah! Check all fields");
        return false;
    }
}

function getEmail() {
    return document.querySelector('.email-field__email-input').value;
}

function getPassword() {
    return document.querySelector('.password-field__password-input').value;
}

let XHR = new XMLHttpRequest();
function logIn() {
    let validEmail = checkEmail(document.querySelector('.email-field__email-input'));
    let validPassword = checkPassword(document.querySelector('.password-field__password-input'));
    if (validEmail && validPassword) {
        let userInfo = {
            "email": getEmail(),
            "password": getPassword()
        }
        let json = JSON.stringify(userInfo);
        console.log(json);
        console.log("Пытаемся зайти");

        XHR.open("POST", "/api/login");
        XHR.send(json);
        XHR.onload = function() {
            if (XHR.status != 200){
                alertError("Incorect email or password!");
            }
            else {
                window.location.href = "/admin"
            }
        }
    }
}