let emailValue = document.getElementById('email');
let passwordValue = document.getElementById('password');
let eye = document.getElementById('eye');
let loginBtn = document.getElementById('logBtn');
let loginbut = document.getElementById('login');
let logoutBtn = document.getElementById('log');

// ================= PASSWORD TOGGLE =================
if (eye) {
    eye.addEventListener('click', () => {
        passwordValue.type = passwordValue.type === "password" ? 'text' : 'password';
    });
}

// ================= CHECK AUTH =================
async function checkAuth() {
  const { data, error } = await client.auth.getSession();
  const session = data?.session;

  if (!loginbut || !logoutBtn) return;

  if (session) {
    loginbut.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginbut.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

checkAuth();

// ================= LOGIN =================
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {

    if (!emailValue.value || !passwordValue.value) {
      alert("Fill all fields");
      return;
    }

    const { data, error } = await client.auth.signInWithPassword({
      email: emailValue.value,
      password: passwordValue.value
    });

    if (error) {
      alert(error.message);
      console.error(error);
      return;
    }

    alert('You have logged in successfully!');
    window.location.href = "./index.html";
    // window.location.href = "https://mustafa-raza-26.github.io/Final-Test";
  });
}

// ================= LOGOUT =================
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      console.error('Logout Error:', error.message);
      return;
    }
    alert('You have logged out.');
    window.location.href = "./login.html";
    // window.location.href = "https://mustafa-raza-26.github.io/Final-Test/login.html";
  });
}

// ================= REAL-TIME AUTH LISTENER =================
client.auth.onAuthStateChange((event, session) => {
  if (!loginbut || !logoutBtn) return;

  if (session) {
    loginbut.style.display = "none";
    logoutBtn.style.display = "inline-block";
    
  } else {
    loginbut.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
