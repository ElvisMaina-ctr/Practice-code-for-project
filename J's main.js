
"use strict";

// Get elements from the HTML
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.querySelector('input[name="remember"]');
const message = document.getElementById("message");
const loginButton = document.querySelector(".login-button");

// Show or hide the password
togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});

// Display error or success messages
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Remember the user's email address
// Never store the password in localStorage.
const savedEmail = localStorage.getItem("weconnectEmail");

if (savedEmail) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
}

// Handle login form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values entered by the user
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate email
    if (email === "" || !emailInput.validity.valid) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    // Validate password
    if (password.length < 8) {
        showMessage(
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

    // Show login feedback
    showMessage(
        "Login form submitted successfully! Authentication is not connected yet.",
        "success"
    );

    // Update button temporarily
    loginButton.textContent = "Submitted";
    loginButton.disabled = true;

    setTimeout(function () {
        loginButton.textContent = "Log In";
        loginButton.disabled = false;
    }, 2000);
});
