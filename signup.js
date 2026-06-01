const FullName = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const passwordErrorDisplay = document.getElementById('passwordError');
const create_Account = document.getElementById("create_Account");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click",()=>{

    const type = password.getAttribute("type")==="password" ? "text" : "password";
    password.setAttribute("type",type);

    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");

});


create_Account.addEventListener('click', async (e) => {
    e.preventDefault();

    if (password.value != confirm_password.value) {
        passwordErrorDisplay.innerText = 'Password Mismatch'
    }
    else{

        // User Create
        const { data:authData, error:authError } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    FullName: FullName.value,
                }
            }
        })
        if (authError) {
            console.log(authError.message);
        }else{
            console.log(authData);
            alert('user auth')
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
        }else{alert('table data insert')}

        FullName.value = ''
        email.value = ''
        number.value = ''
        password.value = ''
        confirm_password.value = ''

    }
})