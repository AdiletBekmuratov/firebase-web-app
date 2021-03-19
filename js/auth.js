//Login 
function checkInputsLogin(email_log, password_log) {
    const email_value = email_log.value.trim();
    const password_value = password_log.value.trim();

    if (email_value === '') {
        setErrorFor(email_log, 'Email cannot be blank');
        return false;
    } else if (!validateEmail(email_value)) {
        setErrorFor(email_log, 'Not a valid email');
        return false;
    } else {
        setSuccessFor(email_log);
    }

    if (password_value === '') {
        setErrorFor(password_log, 'Password cannot be blank');
        return false;
    } else {
        setSuccessFor(password_log);
    }

    return true;
}

function signIn() {
    var userEmail = document.getElementById("InputEmailLog");
    var userPass = document.getElementById("InputPasswordLog");

    if (checkInputsLogin(userEmail, userPass)) {
        firebase.auth().signInWithEmailAndPassword(userEmail.value, userPass.value).then((userCredential)  => {
            window.location.replace("index.html");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error : " + errorMessage);
        });
    }
}


// SignUp
function checkInputs(dispName, email, password, password2) {
    const dispNameValue = dispName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (dispNameValue === '') {
        setErrorFor(dispName, 'Username cannot be blank');
        return false;
    } else {
        setSuccessFor(dispName);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        return false;
    } else if (!validateEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        return false;
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        return false;
    } else if (validatePassword(passwordValue) == false) {
        setErrorFor(password, 'Password should contain one capital letter, number, special symbol and be 8 characters in length');
        return false;
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password Confirmation cannot be blank');
        return false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        return false;
    } else {
        setSuccessFor(password2);
    }

    return true;
}

function signUp() {
    var dispName = document.getElementById("InputDispNameSign");
    var userEmail = document.getElementById("InputEmailSign");
    var userPass = document.getElementById("InputPasswordSign1");
    var userPass2 = document.getElementById("InputPasswordSign2");

    if (checkInputs(dispName, userEmail, userPass, userPass2)) {
        firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPass.value).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            user.updateProfile({
                displayName: dispName.value
            }).then(function () {
                // Update successful.
                console.log("username set successfully");
                window.location.replace("index.html");
            }).catch(function (error) {
                window.alert("Error: " + error.message)
            });
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage)
        });
    }
}


// Validations
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regex.test(password);
}

// setting Errors of Successes
function setErrorFor(input, message) {
    const formControl = input;
    const small = formControl.parentElement.querySelector('.error-message');
    small.style.display = 'block';
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input;
    const small = formControl.parentElement.querySelector('.error-message');
    small.style.display = 'none';
    formControl.className = 'form-control success';
}