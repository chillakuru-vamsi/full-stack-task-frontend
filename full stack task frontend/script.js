const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();

    const email = document.getElementById("email").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      alert("Email already registered");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const user = {
      id: Date.now(),
      fullname,
      email,
      mobile,
      password,
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");

    window.location.href = "login.html";
  });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      window.location.href = "home.html";
    } else {
      alert("Invalid Credentials");
    }
  });
}


const userName = document.getElementById("userName");

if (userName) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    window.location.href = "login.html";
  } else {
    userName.innerText = `Welcome, ${loggedInUser.fullname}`;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html";
}