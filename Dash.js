const BASE_URL = "http://localhost:8080";

const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

// Toggle between Register & Search
registerbtn.addEventListener("click", () => container.classList.add("active"));
loginbtn.addEventListener("click", () => container.classList.remove("active"));

// Handle Donor Registration
document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const donorData = {
      name: document.getElementById("register-name").value,
      email: document.getElementById("register-email").value,
      phone: document.getElementById("register-phone").value,
      bloodGroup: document.getElementById("register-bloodgroup").value,
      age: document.getElementById("register-age").value,
      address: document.getElementById("register-address").value,
    };

    try {
      const response = await fetch(`${BASE_URL}/donors/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });

      if (response.ok) {
        alert("Registration Successful!");
        document.getElementById("register-form").reset();
        container.classList.remove("active");
      } else {
        const errorData = await response.json();
        alert("Error: " + (errorData.message || "Registration Failed!"));
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong! Please try again.");
    }
  });

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const bloodGroup = document.getElementById("search-bloodgroup").value;
  const age = document.getElementById("search-age").value;

  try {
    const response = await fetch(
      `${BASE_URL}/donors/search?bloodGroup=${encodeURIComponent(
        bloodGroup
      )}&age=${age}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const donors = await response.json();
      console.log("API Response:", donors);
      if (donors.length === 0) {
        alert("No donors found!");
        return;
      }

      let resultHTML = "<h2  class = 'donor-list'>Matching Donors</h2><ul>";
      donors.forEach((donor) => {
        resultHTML += `<li class="donor-item">${
          "Donor Name :" + donor.name
        }  - ${"Donor's Bloodgroup:" + donor.bloodGroup} - ${
          "Donor's Age:" + donor.age
        } - ${"Donor' Phone Number:" + donor.phone} - ${
          "Donor' Address:" + donor.address
        }</li>`;
      });
      resultHTML += "</ul>";

      document.querySelector(".search").innerHTML = resultHTML;
    } else {
      alert("Error fetching donors!");
    }
  } catch (error) {
    console.error("Search Error:", error);
    alert("Something went wrong! Please try again.");
  }
});
