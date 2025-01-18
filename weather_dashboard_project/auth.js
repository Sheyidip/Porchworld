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
