document.addEventListener("DOMContentLoaded", () => {

  loadCheckout();

  // UPDATE CART COUNT
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // REAL-TIME VALIDATION
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    input.addEventListener("keyup", () => {
      const error = input.nextElementSibling;

      if (input.value.trim() !== "") {
        error.innerText = "";
      }
    });
  });

  // ONLY NUMBERS
  ["zip", "card", "cvc"].forEach(id => {
    const input = document.getElementById(id);

    if (input) {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "");
      });
    }
  });

  // EXPIRY FORMAT MM/YY
  const expiry = document.getElementById("expiry");

  if (expiry) {
    expiry.addEventListener("input", () => {
      expiry.value = expiry.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    });
  }

});

// LOAD CART INTO SUMMARY
function loadCheckout() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container || !totalEl) return;

  container.innerHTML = "";

  // EMPTY CART
  if (cart.length === 0) {

    container.innerHTML = "<p>Your cart is empty.</p>";

    const orderBtn = document.querySelector(".summary-box button");

    if (orderBtn) {
      orderBtn.disabled = true;
    }

    return;
  }

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.qty;

    const div = document.createElement("div");

    div.className = "summary-item";

    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    `;

    container.appendChild(div);

  });

  totalEl.innerText = total.toFixed(2);

}

// PLACE ORDER
function placeOrder() {

  let valid = true;

  const fields = [
    { id: "name", err: "err-name" },
    { id: "email", err: "err-email" },
    { id: "address", err: "err-address" },
    { id: "city", err: "err-city" },
    { id: "zip", err: "err-zip" },
    { id: "card", err: "err-card" },
    { id: "expiry", err: "err-expiry" },
    { id: "cvc", err: "err-cvc" }
  ];

  fields.forEach(f => {

    const input = document.getElementById(f.id);
    const error = document.getElementById(f.err);

    if (!input || !error) return;

    // EMPTY CHECK
    if (input.value.trim() === "") {

      error.innerText = "Required";
      valid = false;
      return;

    }

    // EMAIL VALIDATION
    if (f.id === "email") {

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!input.value.match(emailPattern)) {

        error.innerText = "Enter valid email";
        valid = false;
        return;

      }
    }

    // CARD VALIDATION
    if (f.id === "card") {
      input.value = input.value.replace(/\s/g, "");
      const cardPattern = /^[0-9]{16}$/;   

      if (!input.value.match(cardPattern)) {

        error.innerText = "Card must contain 16 digits";
        valid = false;
        return;

      }
    }

    // ZIP VALIDATION
    if (f.id === "zip") {

      const zipPattern = /^[0-9]{5}$/;

      if (!input.value.match(zipPattern)) {

        error.innerText = "ZIP must be 5 digits";
        valid = false;
        return;

      }
    }

    // EXPIRY VALIDATION
    if (f.id === "expiry") {

      const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

      if (!input.value.match(expiryPattern)) {

        error.innerText = "Format MM/YY";
        valid = false;
        return;

      }
    }

    // CVC VALIDATION
    if (f.id === "cvc") {

      const cvcPattern = /^[0-9]{3}$/;

      if (!input.value.match(cvcPattern)) {

        error.innerText = "CVC must be 3 digits";
        valid = false;
        return;

      }
    }

    // CLEAR ERROR
    error.innerText = "";

  });

  // STOP IF INVALID
  if (!valid) return;

  // CLEAR CART
  localStorage.removeItem("cart");

  // RESET FORM
  document.getElementById("checkout-form").reset();

  // HIDE CHECKOUT
  document.querySelector(".checkout-container .row").style.display = "none";

  // SHOW SUCCESS MESSAGE
  document.getElementById("success").classList.remove("d-none");

  // UPDATE CART COUNT
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // SCROLL TO TOP
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}