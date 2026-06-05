const email = document.getElementById('email');
const forgot_password = document.getElementById('forgot_password');
const form = document.getElementById('forgotForm');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("resetForm").style.display = "none";
    document.getElementById("successBox").style.display = "block";
});

forgot_password.addEventListener('click', async () => {
    const { data, error } = await client.auth.resetPasswordForEmail(email.value, {
        redirectTo: './reset.html',
    })
    if (error) {
        console.log(error.message);
    }else{
        console.log(data);
    }
})