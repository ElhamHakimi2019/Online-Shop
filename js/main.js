// ================= CART HELPERS =================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const cart = getCart();

  // FIX: prevent NaN if qty is undefined
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  el.style.display = total === 0 ? "none" : "block";
  el.innerText = total;
}

// ================= ADD TO CART =================
function addToCart(id) {
  let cart = getCart();

  // FIX: check if products exists
  if (!Array.isArray(products)) {
    console.error("Products array not found");
    return;
  }

  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

// ================= BUTTON FEEDBACK =================
function handleAdd(button, id) {
  addToCart(id);

  button.classList.add("added");
  button.innerHTML = "✓ Added";

  setTimeout(() => {
    button.classList.remove("added");
    button.innerHTML =
      '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
  }, 1200);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // ================= DARK MODE =================
  const toggle = document.getElementById("darkToggle");

  if (toggle) {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
          ? "enabled"
          : "disabled"
      );
    });
  }

});
// ================= ACTIVE NAV LINK =================
const links = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".category-card").forEach(c =>
      c.classList.remove("active")
    );
    card.classList.add("active");
  });
});
// ================= NEWSLETTER =================
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

newsletterForm.addEventListener("submit", (e) => {

  e.preventDefault();

  newsletterMsg.classList.remove("d-none");

  newsletterForm.reset();

  setTimeout(() => {
    newsletterMsg.classList.add("d-none");
  }, 3000);

});