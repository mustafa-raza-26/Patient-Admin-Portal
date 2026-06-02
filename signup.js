const FullName = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const signupError = document.getElementById('passwordError');
const create_Account = document.getElementById("create_Account");
const togglePassword = document.getElementById("togglePassword");

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
    window.location.href = './index.html';
}, 3000);
}

create_Account.addEventListener('click', async (e) => {
    e.preventDefault();

    if (FullName.value === '' && email.value === '' && number.value === '' && password.value === '' && confirm_password.value === '') {
    signupError.innerText = 'Validation Error Plz Fill All Fields';
    } 
    else if (FullName.value === '') {  
        signupError.innerText = 'Validation Error Enter Your Full Name';
    } 
    else if (email.value === '') {  
        signupError.innerText = 'Validation Error Enter Your Email';
    } 
    else if (number.value === '') {  
        signupError.innerText = 'Validation Error Enter Your Phone Number';
    } 
    else if (password.value === '') {
        signupError.innerText = 'Validation Error Enter Your Password';
    } 
    else if (confirm_password.value === '') {
        signupError.innerText = 'Validation Error Confirm Your Password';
    } 
    else if (password.value !== confirm_password.value) {
        signupError.innerText = 'Validation Error Passwords Do Not Match';
    } 
    else {

        const { data:authData, error:authError } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    full_name: FullName.value,
                    phone_number: number.value
                }
            }
        })
        if (authError) {
            console.log(authError.message);
        }

        // Data in Table
        const { error } = await client
        .from('Admin_Portal_User')
        .insert({
            name : FullName.value,
            email : email.value,
            number : number.value,
            password : password.value,
        })
        if (error) {
            console.log(error.message);
        }else{
            showSuccess();
        }
    }
})