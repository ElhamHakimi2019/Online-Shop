// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

if (form) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    // INPUTS
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // SIMPLE VALIDATION
    if (
      name.value.trim() === "" ||
      email.value.trim() === "" ||
      message.value.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // EMAIL VALIDATION
    if (!email.value.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    // SHOW SUCCESS MESSAGE
    msg.classList.remove("d-none");

    // RESET FORM
    form.reset();

    // HIDE MESSAGE AFTER 3 SEC
    setTimeout(() => {
      msg.classList.add("d-none");
    }, 3000);

  });

}


// ================= ACTIVE NAV LINK =================
const navLinks = document.querySelectorAll(".nav-link");

const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {

  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }

});



