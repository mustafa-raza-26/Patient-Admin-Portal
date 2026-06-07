update_btn.addEventListener("click", async () => {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (!password.value || !confirmPassword.value) {
        alert("Please fill all fields");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    update_btn.disabled = true;
    update_btn.innerText = "Updating...";

    try {
        // 1. Pehle Supabase Auth ka password update karein (Main Login ke liye)
        const { data: authData, error: authError } = await client.auth.updateUser({
            password: password.value
        });

        if (authError) {
            alert("Auth Error: " + authError.message);
            update_btn.disabled = false;
            update_btn.innerText = "Update Password";
            return; // Agar yahan error aaya toh aage nahi chalega
        }

        // 2. Ab aapke custom table mein password update karein (Sir ko dikhane ke liye)
        // Yahan se logged-in user ki ID mil jayegi
        const userId = authData.user.id; 

        const { error: dbError } = await client
            .from('your_table_name') // 👈 Yahan apne table ka sahi naam likhein (e.g., 'users' ya 'patients')
            .update({ 
                password: password.value // 👈 Yahan aapke table ka column naam (e.g., 'password')
            })
            .eq('id', userId); // User ki ID match kar rahe hain

        if (dbError) {
            alert("Database Table Error: " + dbError.message);
            update_btn.disabled = false;
            update_btn.innerText = "Update Password";
        } else {
            alert("Zabardast! Auth aur Table dono mein password update ho gaya.");
            window.location.href = "./index.html";
        }

    } catch (err) {
        console.error(err);
        alert("An unexpected error occurred.");
        update_btn.disabled = false;
        update_btn.innerText = "Update Password";
    }
});