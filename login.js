const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');
const togglePassword = document.getElementById('togglePassword');
const forgot_password = document.getElementById('forgot_password');
const loginError = document.getElementById('loginError');

togglePassword.addEventListener("click",()=>{

    const type = password.getAttribute("type")==="password" ? "text" : "password";
    password.setAttribute("type",type);

    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");

});

function showSuccess() {
  const msg = document.getElementById("successMessage");

  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
    window.location.href = './dashboard.html';
}, 2000);
}

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
        })
        if (error) {
            loginError.innerText = error.message;
        }else{
            showSuccess();   
        }
    }
})

window.onload = async () => {
    const { data:{session}, error } = await client.auth.getSession();

    if (error) {
        console.log(error.message);
        return;
    }

    console.log(session);

    if (session) {
        window.location.href = './dashboard.html';
    }
}

forgot_password.addEventListener('click', async () => {
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://example.com/update-password',
    })
    
})