
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    if (user) {
        showDashboard(user);
    }
}

// Login function
async function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('weatherUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('weatherUser', JSON.stringify(user));
        showDashboard(user);
    } else {
        alert('Invalid email or password');
    }
}

// Register function
async function register(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Get existing users
    const users = JSON.parse(localStorage.getItem('weatherUsers')) || [];

    // Check if user already exists
    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return false;
    }

    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);

    // Save to localStorage
    localStorage.setItem('weatherUsers', JSON.stringify(users));
    localStorage.setItem('weatherUser', JSON.stringify(newUser));

    showDashboard(newUser);
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('weatherUser');
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('dashboard-container').classList.add('hidden');
}

// Toggle between login and register forms
function toggleForms(form) {
    if (form === 'register') {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
    } else {
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
    }
}

// Show dashboard
function showDashboard(user) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
    document.getElementById('user-name').textContent = `Welcome, ${user.name}!`;
}

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

// Signup functionality
const signupForm = document.getElementById("signup-form");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

// Handle signup form submission
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`User ${user.email} signed up successfully!`);
            signupForm.reset();
            // Redirect to index.html after signup
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById("error-message").textContent = errorMessage;
        });
});

// Login functionality
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Welcome back, ${user.email}!`);
            loginForm.reset();
            // Redirect to index.html after login
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById("error-message").textContent = errorMessage;
        });
});

// Switch to Login form and Signup form
document.addEventListener("DOMContentLoaded", function() {
    const switchToLoginLink = document.getElementById("switch-to-login");
    const switchToSignupLink = document.getElementById("switch-to-signup");

    // Ensure form switching works when the page is loaded
    if (switchToLoginLink && switchToSignupLink) {
        switchToLoginLink.addEventListener("click", (e) => {
            e.preventDefault();  // Prevent default link behavior
            document.getElementById("signup-form-container").style.display = "none";
            document.getElementById("login-form-container").style.display = "block";
        });

        switchToSignupLink.addEventListener("click", (e) => {
            e.preventDefault();  // Prevent default link behavior
            document.getElementById("login-form-container").style.display = "none";
            document.getElementById("signup-form-container").style.display = "block";
        });
    }
});

