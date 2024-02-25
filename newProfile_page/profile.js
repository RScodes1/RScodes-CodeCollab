const fetchbtn = document.getElementById("fetchbtn");
const logoutbtn = document.getElementById("logoutbtn");
const logoutuser = document.getElementById("logout");
const typingbtn =document.getElementById("typingbtn");

logoutuser.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

// Function to log out the user
async function logout() {
  try {
    // Make a POST request to the logout endpoint
    const response = await fetch("http://localhost:4000/users/logout", {
      method: "GET", // or 'POST' depending on how your backend is configured
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      // Remove token from localStorage or any other cleanup you need to do
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      // Redirect or perform any other action after successful logout
      window.location.href = "../home_page/index.html"; // Redirect to home page
    } else {
      // Handle error response from the server
      const responseData = await response.json();
      console.error("Logout failed:", responseData.msg);
      // You can display an error message or handle the error in any other way
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
    // Handle unexpected errors
  }
}

logoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});


const fetchcodes = () => {
  fetch("http://localhost:4000/code", {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // displayNotes(data.notes);
      console.log(data);
    })
    .catch((err) => console.log(err));
};

fetchbtn.addEventListener("click", () => {
  fetchcodes();
});



typingbtn.addEventListener('click', () => {
  window.location.href ="../typing_speed/typing.html";
})


//footer js
// Toggle the visibility of the contact form
function toggleContactForm() {
  const contactForm = document.querySelector('.contact-form');
  contactForm.classList.toggle('show');
}

// Validate and submit the contact form
function submitContactForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Basic validation
  if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
      alert('Please fill in all fields.');
      return;
  }

  // You can add additional validation logic here

  // Example: Sending form data to a backend endpoint using fetch
  const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
  };

  fetch('https://example.com/submit-contact-form', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
      if (response.ok) {
          alert('Form submitted successfully!');
          // Reset form fields
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
      } else {
          throw new Error('Failed to submit form.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again later.');
  });
}

// Event listeners
document.querySelector('.toggle-contact-form').addEventListener('click', toggleContactForm);
document.querySelector('.submit-contact-form').addEventListener('click', submitContactForm);
