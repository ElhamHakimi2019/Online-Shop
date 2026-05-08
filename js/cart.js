// ================= GET CART =================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= RENDER CART =================
function renderCart() {
  const cart = getCart();

  const itemsContainer = document.getElementById("cart-items");
  const empty = document.getElementById("empty-cart");
  const summary = document.getElementById("cart-summary");

  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    empty.style.display = "block";
    summary.style.display = "none";
    return;
  }

  empty.style.display = "none";
  summary.style.display = "block";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "d-flex align-items-center border p-3 mb-3 rounded";

    div.innerHTML = `
      <img src="${item.img}" width="80" class="me-3">

      <div class="flex-grow-1">
        <h6>${item.name}</h6>
        <p>$${item.price}</p>

        <div>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span class="mx-2">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>

      <div class="text-end">
        <p>$${(item.price * item.qty).toFixed(2)}</p>
        <button onclick="removeItem(${item.id})" class="btn btn-sm btn-danger">X</button>
      </div>
    `;

    itemsContainer.appendChild(div);
  });

  // ✅ totals (FREE shipping)
  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("total").innerText = subtotal.toFixed(2);

  // ✅ update badge
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}
// ✅ update title count
updateCartTitleCount();
// ================= CHANGE QTY =================
function changeQty(id, change) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === id) {
      item.qty += change;
      if (item.qty < 1) item.qty = 1;
    }
    return item;
  });

  saveCart(cart);
  renderCart();
}

// ================= REMOVE ITEM =================
function removeItem(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== id);

  saveCart(cart);
  renderCart();
}

// ================= CHECKOUT =================
function goToCheckout() {
  window.location.href = "checkout.html";
}

// ================= PLACE ORDER (FROM CART) =================
function placeOrderFromCart() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // clear cart
  localStorage.removeItem("cart");

  // update badge
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // go to success page
  window.location.href = "success.html";
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartTitleCount(); // ✅ ADD THIS
});
function updateCartTitleCount() {
  const el = document.getElementById("cart-title-count");
  if (!el) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  el.innerText = total;
}