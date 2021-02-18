window.onload = function () {

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input element 
    // they are initially empty and hidden
    const form = document.getElementById("myForm");

    //Appending child for Email element
    const email = document.getElementById("email");
    email.parentNode.appendChild(createSmallElement("email-alert"));

    //Appending child for password
    const password = document.getElementById("pwd");
    password.parentNode.appendChild(createSmallElement("pwd-alert"));

    //Appending child for confirm password
    const confirmPassword = document.getElementById("confirm");
    confirmPassword.parentNode.appendChild(createSmallElement("confirm-alert"));

    const emailAlert = document.getElementById("email-alert");
    const pwdAlert = document.getElementById("pwd-alert");
    const confirmAlert = document.getElementById("confirm-alert");

    function createSmallElement(id) {
        const smallElement = document.createElement("small");
        smallElement.id = id
        smallElement.style.display = "none";
        return smallElement;
    }

    //Focus and blur events
    function handleOnFocusEvents(alert, message) {
        alert.style.removeProperty("display");
        alert.classList.remove("text-danger");
        alert.classList.add("text-primary")
        alert.innerText = message;
    }

    function handleOnBlurEvents(alert) {
        alert.classList.remove("text-primary")
        alert.classList.remove("text-danger")
        alert.style.display = "none"
    }

    //Email
    email.onfocus = function () {
        email.classList.remove("error");
        handleOnFocusEvents(emailAlert, "A valid Email Address should be of the form <prefix>@<domain_part1>.<domain_part2>");

    }
    email.onblur = function () {
        //emailAlert.classList.remove("alert","alert-info")
        handleOnBlurEvents(emailAlert);
    }

    //Password
    password.onfocus = function () {
        password.classList.remove("error");
        handleOnFocusEvents(pwdAlert, "A valid Password must contain atleast 6 characters");
    }
    password.onblur = function () {
        handleOnBlurEvents(pwdAlert);
    }

    //Confirm Password
    confirmPassword.onfocus = function () {
        confirmPassword.classList.remove("error");
        handleOnFocusEvents(confirmAlert, "Password and Confirm password must be same");
    }
    confirmPassword.onblur = function () {
        confirmAlert.style.display = "none";
    }


    function error(input, message, alert) {
        input.classList.add("error");
        // show the error message
        alert.style.removeProperty("display");
        alert.innerText = message;
        alert.classList.add("text-danger");
        alert.classList.remove("text-primary")
        return false;
    }

    function success(input, alert) {
        input.classList.add('success');
        // hide the error message
        alert.style.display = "none";
        alert.classList.remove("text-danger");
        alert.classList.remove("text-primary");
        alert.innerText = '';
        return true;
    }

    function requireValue(input, message, alert) {
        return input.value.trim() === '' ?
            error(input, message, alert) :
            success(input, alert);
    }

    function validateEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email.value.trim()) ?
            success(email, emailAlert) :
            error(email, 'Invalid email format', emailAlert);
    }

    function validatePasswordMatch() {
        const passValue = password.value.trim();
        const confirmValue = confirmPassword.value.trim();
        if (passValue === confirmValue) {
            success(password, pwdAlert);
            success(confirmPassword, confirmAlert);
            return true;
        }
        password.classList.add("error");
        return error(confirmPassword, "Password and Confirm Password must be the same", confirmAlert);

    }

    function validatePassword() {
        return password.value.trim().length < 6 ?
            error(password, "Password should contain atleast 6 characters", pwdAlert) :
            success(password, pwdAlert);
    }

    form.addEventListener('submit', (event) => {
        //Validating email field
        let isValid;
        let isValidForm = true;
        isValid = requireValue(email, "Email is required", emailAlert);
        if (isValid) {
            isValid = validateEmail();
        }

        if (!isValid) {
            isValidForm = false;
        }

        //Validate password
        isValid = requireValue(password, "Password is required", pwdAlert);
        if (isValid) {
            isValid = validatePassword();
        }

        if (!isValid) {
            isValidForm = false;
        }

        isValid = requireValue(confirmPassword, "Confirm password is required", confirmAlert);
        if (isValid) {
            isValid = validatePasswordMatch();
        }

        if (!isValid) {
            isValidForm = false;
        }

        if (!isValidForm) {
            event.preventDefault();
        } else {
            alert("The form is submitted")
        }

    })
}




