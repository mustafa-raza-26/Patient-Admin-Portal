// Show / Hide Password

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((icon)=>{

    icon.addEventListener("click",()=>{

        const target = document.getElementById(icon.dataset.target);
        if(target.type === "password"){

            target.type = "text";
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

        }
        else{
            target.type = "password";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
        }
    });

});

// Update Password

const update_btn = document.getElementById("update_btn");

update_btn.addEventListener("click", async () => {

    const password =
    document.getElementById("password");

    const confirmPassword =
    document.getElementById("confirmPassword");

    if(!password.value || !confirmPassword.value){

        alert("Please fill all fields");
        return;

    }

    if(password.value !== confirmPassword.value){

        alert("Passwords do not match");
        return;

    }

    const { error } =
    await client.auth.updateUser({
        password: password.value
    });

    if(error){
        alert(error.message);
    }else{
        alert("Password Updated Successfully");
        window.location.href = "./index.html";
    }

});