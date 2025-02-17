const BASE_URL = "http://localhost:8080"; // Backend API URL

const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

// Toggle between login & signup
registerbtn.addEventListener("click", () => container.classList.add("active"));
loginbtn.addEventListener("click", () => container.classList.remove("active"));

// Handle Sign Up
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role")?.value || "user"; // Default role

  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration Successful!");
      window.location.href = "http://127.0.0.1:5500/Sign/Dashboard.html"; // Redirect to login page
    } else {
      alert("Error: " + (data.message || "Signup failed"));
    }
  } catch (error) {
    console.error("Signup Error:", error);
    alert("Something went wrong! Please try again.");
  }
});

// Handle Sign In
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await fetch(`${BASE_URL}/user/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // if (!data.token) {
      //   alert("Login failed! No token received.");
      //   return;
      // }

      // alert("Login Successful!");
      // localStorage.setItem("token", data.token); // Store token for authentication
      window.location.replace("http://127.0.0.1:5500/Sign/Dashboard.html"); // Redirect to dashboard
    } else {
      alert("Error: " + (data.message || "Invalid credentials"));
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Something went wrong! Please try again.");
  }
});

// Function to fetch user data (Protected Route)
async function fetchUserData() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized! Please log in.");
    window.location.replace("http://127.0.0.1:5500/Sign/index.html"); // Redirect to login page
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log("User Data:", data);
      document.getElementById("user-name").innerText = data.name; // Show user data on dashboard
    } else {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "http://127.0.0.1:5500/Sign/index.html";
    }
  } catch (error) {
    console.error("User Data Fetch Error:", error);
  }
}
