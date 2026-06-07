const emailInput = document.getElementById('email');
const form = document.getElementById('forgotForm');
const resetFormDiv = document.getElementById("resetForm");
const successBoxDiv = document.getElementById("successBox");
const submitBtn = document.getElementById('forgot_password');

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Page reload hone se rokne ke liye
    
    // Button ko disable kar rahe hain taake user baar baar click na kare
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    try {
        // Yahan 'client' aapki supabase.js se aa raha hai
        const { data, error } = await client.auth.resetPasswordForEmail(emailInput.value, {
            // URL ko hamesha absolute (poora) dena behtar hota hai
            redirectTo: window.location.origin + '/updatepassword.html', 
        });

        if (error) {
            alert("Error: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Reset Link";
        } else {
            console.log("Reset email sent:", data);
            // Agar email sahi chali gayi, toh form chhupao aur success box dikhao
            resetFormDiv.style.display = "none";
            successBoxDiv.style.display = "block";
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Reset Link";
    }
});