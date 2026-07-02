let user_name = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let number = document.getElementById('num');
let signupBtn = document.getElementById('signBtn');
let googleBtn = document.getElementById('googleBtn');
let fbBtn = document.getElementById('fbBtn');

if (signupBtn) {
  signupBtn.addEventListener('click', async () => {

    if (!user_name.value || !email.value || !password.value) {
      alert('Fill all required fields before signup');
      return;
    }

    // Sign up with Supabase Auth
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: "./login.html",
        // emailRedirectTo: "https://mustafa-raza-26.github.io/Final-Test/login.html",
        data: {
          displayName: user_name.value,
          number: number.value
        }
      }
    });

    if (error) {
      alert("Signup Error: " + error.message);
      console.error("Signup Error:", error.message);
      return;
    }

    const { error: dbError } = await client
      .from('user')
      .insert({
        name: user_name.value,
        email: email.value,
        number: number.value
      });

    if (dbError) {
      console.error("Error:", dbError.message);
      alert("Error storing user info: " + dbError.message);
      return;
    }

    alert('Your account has been created successfully!');
    window.location.href = "./login.html";
    // window.location.href = "https://mustafa-raza-26.github.io/Final-Test/login.html";

    user_name.value = "";
    email.value = "";
    password.value = "";
    number.value = "";

  });
}

// -------------------- GOOGLE LOGIN --------------------
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://mustafa-raza-26.github.io/Final-Test"
      }
    });
    if (error) {
      console.error("Google Login Error:", error.message);
      alert("Google Login Error: " + error.message);
    }
  });
}

// -------------------- FACEBOOK LOGIN --------------------
if (fbBtn) {
  fbBtn.addEventListener('click', async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "https://mustafa-raza-26.github.io/Final-Test"
      }
    });
    if (error) {
      console.error("Facebook Login Error:", error.message);
      alert("Facebook Login Error: " + error.message);
    }
  });
}
