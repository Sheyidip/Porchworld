// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Firebase Configuration (Replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyABQEO9trAspyRxUkESB3317Aj3mp85CiA",
    authDomain: "weather-dashboard-d3829.firebaseapp.com",
    projectId: "weather-dashboard-d3829",
    storageBucket: "weather-dashboard-d3829.firebasestorage.app",
    messagingSenderId: "710138944776",
    appId: "1:710138944776:web:ae88c2688b177b715960bd",
    measurementId: "G-W8QLJ30028"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Utility Functions
function toggleVisibility(elementIdToShow, elementIdToHide) {
    document.getElementById(elementIdToShow).style.display = "block";
    document.getElementById(elementIdToHide).style.display = "none";
}

function displayError(message) {
    const errorMessageContainer = document.getElementById("error-message");
    if (errorMessageContainer) {
        errorMessageContainer.textContent = message;
    } else {
        alert(message);
    }
}

// Signup functionality
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert(`User ${user.email} signed up successfully!`);
                signupForm.reset();
                window.location.href = 'auth.html';
            })
            .catch((error) => {
                displayError(error.message);
            });
    });
}

// Login functionality
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert(`Welcome back, ${user.email}!`);
                loginForm.reset();
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                displayError(error.message);
            });
    });
}

// Logout functionality
function logout() {
    localStorage.removeItem('weatherUser');
    toggleVisibility('auth-container', 'dashboard-container');
}

// Form switching functionality
document.addEventListener("DOMContentLoaded", function() {
    const switchToLoginLink = document.getElementById("switch-to-login");
    const switchToSignupLink = document.getElementById("switch-to-signup");

    if (switchToLoginLink && switchToSignupLink) {
        switchToLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            toggleVisibility("login-form-container", "signup-form-container");
        });

        switchToSignupLink.addEventListener("click", (e) => {
            e.preventDefault();
            toggleVisibility("signup-form-container", "login-form-container");
        });
    }
});

// Authentication check
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    if (user) {
        showDashboard(user);
    }
}

// Show dashboard functionality
function showDashboard(user) {
    toggleVisibility('dashboard-container', 'auth-container');
    document.getElementById('user-name').textContent = `Welcome, ${user.name}!`;
}

// Run checkAuth on page load
checkAuth();
