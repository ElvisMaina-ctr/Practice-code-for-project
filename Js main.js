
"use strict";

// =====================================
// GET HTML ELEMENTS
// =====================================

const signInScreen = document.getElementById("signInScreen");
const signUpScreen = document.getElementById("signUpScreen");

const showSignUp = document.getElementById("showSignUp");
const showSignIn = document.getElementById("showSignIn");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");

const toggleLoginPassword =
    document.getElementById("toggleLoginPassword");

const toggleRegisterPassword =
    document.getElementById("toggleRegisterPassword");

const rememberMe = document.getElementById("rememberMe");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");


// =====================================
// SWITCH BETWEEN SIGN IN AND SIGN UP
// =====================================

showSignUp.addEventListener("click", function (event) {
    event.preventDefault();

    signInScreen.hidden = true;
    signUpScreen.hidden = false;

    registerEmail.value = loginEmail.value;

    registerMessage.textContent = "";
    registerMessage.className = "";

    window.location.hash = "signUp";
});

showSignIn.addEventListener("click", function (event) {
    event.preventDefault();

    signUpScreen.hidden = true;
    signInScreen.hidden = false;

    loginMessage.textContent = "";
    loginMessage.className = "";

    window.location.hash = "signIn";
});


// =====================================
// SHOW OR HIDE PASSWORD
// =====================================

function setupPasswordToggle(passwordInput, toggleButton) {

    toggleButton.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            toggleButton.textContent = "Hide";

        } else {

            passwordInput.type = "password";
            toggleButton.textContent = "Show";

        }

        // Update accessibility attributes
        toggleButton.setAttribute(
            "aria-label",
            passwordInput.type === "password"
                ? "Show password"
                : "Hide password"
        );

        toggleButton.setAttribute(
            "aria-pressed",
            passwordInput.type === "text"
        );

    });

}

setupPasswordToggle(loginPassword, toggleLoginPassword);

setupPasswordToggle(registerPassword, toggleRegisterPassword);


// =====================================
// DISPLAY ERROR OR SUCCESS MESSAGE
// =====================================

function showMessage(element, text, type) {

    element.textContent = text;
    element.className = type;

}


// =====================================
// REMEMBER EMAIL
// =====================================

// Restore saved email address
const savedEmail = localStorage.getItem("weconnectEmail");

if (savedEmail) {
    loginEmail.value = savedEmail;
    rememberMe.checked = true;
}


// =====================================
// SIGN IN FORM
// =====================================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    // Validate email
    if (!loginEmail.validity.valid) {

        showMessage(
            loginMessage,
            "Please enter a valid email address.",
            "error"
        );

        return;

    }

    // Validate password
    if (password.length < 8) {

        showMessage(
            loginMessage,
            "Password must contain at least 8 characters.",
            "error"
        );

        return;

    }

    // Remember email if selected
    if (rememberMe.checked) {

        localStorage.setItem("weconnectEmail", email);

    } else {

        localStorage.removeItem("weconnectEmail");

    }

    showMessage(
        loginMessage,
        "Login form submitted successfully! Authentication is not connected yet.",
        "success"
    );

});


// =====================================
// SIGN UP FORM
// =====================================

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();

    const email = registerEmail.value.trim();

    const memberType = document.getElementById("memberType").value;

    const password = registerPassword.value;

    const confirm = confirmPassword.value;

    // Validate full name
    if (fullName === "") {

        showMessage(
            registerMessage,
            "Please enter your full name.",
            "error"
        );

        return;

    }

    // Validate email
    if (!registerEmail.validity.valid) {

        showMessage(
            registerMessage,
            "Please enter a valid email address.",
            "error"
        );

        return;

    }

    // Validate membership type
    if (memberType === "") {

        showMessage(
            registerMessage,
            "Please select your membership type.",
            "error"
        );

        return;

    }

    // Validate password
    if (password.length < 8) {

        showMessage(
            registerMessage,
            "Your password must contain at least 8 characters.",
            "error"
        );

        return;

    }

    // Confirm password
    if (password !== confirm) {

        showMessage(
            registerMessage,
            "Your passwords do not match.",
            "error"
        );

        return;

    }

    // Show success message
    showMessage(
        registerMessage,
        "Registration details submitted successfully! Account verification is not connected yet.",
        "success"
    );

    // Clear password fields
    registerPassword.value = "";
    confirmPassword.value = "";

});


// =====================================
// OPEN THE CORRECT SCREEN FROM URL
// =====================================

if (window.location.hash === "#signUp") {

    signInScreen.hidden = true;
    signUpScreen.hidden = false;

} else {

    signInScreen.hidden = false;
    signUpScreen.hidden = true;

}
