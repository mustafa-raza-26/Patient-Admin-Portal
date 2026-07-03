const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');
const togglePassword = document.getElementById('togglePassword');
const loginError = document.getElementById('loginError');

// Toggle Password Visibility
togglePassword.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");
});

// Show Success Message & Redirect
function showSuccess() {
    const msg = document.getElementById("successMessage");
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
        window.location.href = './dashboard.html';
    }, 2000);
}

// Handle Login Submission
login.addEventListener('click', async (e) => {
    e.preventDefault();

    if (email.value === '' && password.value === '') {
        loginError.innerText = 'Validation Error Plz Fill All Fields';
    } 
    else if (email.value === '') {  
        loginError.innerText = 'Validation Error Enter Your Email';
    } 
    else if (password.value === '') {
        loginError.innerText = 'Validation Error Enter Your Password';
    } 
    else {
        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            loginError.innerText = error.message;
        } else {
            showSuccess();   
        }
    }
});

// Check Session on Page Load (Prevents re-login if already authenticated)
window.addEventListener('DOMContentLoaded', async () => {
    const {data: { session }} = await client.auth.getSession();
    if (session) {
        window.location.href = './dashboard.html';
    }
});