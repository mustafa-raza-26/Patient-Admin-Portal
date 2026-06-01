const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click",()=>{

    const type = password.getAttribute("type")==="password" ? "text" : "password";
    password.setAttribute("type",type);

    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");

});

login.addEventListener('click', async (e) => {
    e.preventDefault();

    const { data, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if (error) {
        console.log(error.message);
    }else{
        console.log(data);
    }
    
})