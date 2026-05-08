document.addEventListener("DOMContentLoaded", () => {

  const categories = [
    { label: "All", value: "all" },
    { label: "Bags", value: "bags" },
    { label: "Shoes", value: "shoes" },
    { label: "Accessories", value: "accessories" }
  ];

  // ================= STATE =================
  let currentCategory = new URLSearchParams(window.location.search).get("category") || "all";
  let searchValue = "";

  // ================= ELEMENTS =================
  const grid = document.getElementById("productGrid");
  
  const filtersDiv = document.getElementById("filters");
  const searchInput = document.getElementById("searchInput");
  const empty = document.getElementById("empty");

  if (!grid || !filtersDiv || !searchInput || !empty) return;

  // ================= FILTERS =================
  categories.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.label;
    btn.className = "filter-btn";

    if (c.value === currentCategory) btn.classList.add("active");

    btn.onclick = () => {
      currentCategory = c.value;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    };

    filtersDiv.appendChild(btn);
  });

  // ================= SEARCH =================
  searchInput.addEventListener("input", e => {
    searchValue = e.target.value.toLowerCase();
    render();
  });

  // ================= CART =================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addToCart(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;

    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    el.innerText = count;
  }

  // ================= RENDER =================
  function render() {
    grid.innerHTML = "";

    const filtered = products.filter(p => {
      const catMatch = currentCategory === "all" || p.category === currentCategory;
      const searchMatch = p.name.toLowerCase().includes(searchValue);
      return catMatch && searchMatch;
    });

    if (!filtered.length) {
      empty.classList.remove("d-none");
      return;
    }

    empty.classList.add("d-none");

    filtered.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";

col.innerHTML = `
  <a href="product1.html" class="text-decoration-none text-dark">

    <div class="card h-100 shadow-sm product-card">

      <div class="img-box">
        <img src="${p.img}" class="card-img-top">

        <button class="add-cart-overlay">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>

      <div class="card-body text-center">
        <small class="text-muted text-capitalize">${p.category}</small>
        <h6 class="mt-2">${p.name}</h6>
        <p class="fw-bold mb-0">$${p.price}</p>
      </div>

    </div>

  </a>
`;


    const btn = col.querySelector(".add-cart-overlay");
    // ================= BUTTON FEEDBACK =================
function handleAdd(button, id) {
  addToCart(id);
  animateFlyToCart(button);

  const original = button.innerHTML;

  button.classList.add("added");
  button.innerHTML = "✓ Added";

  setTimeout(() => {
    button.classList.remove("added");
    button.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
  }, 1200);
}

btn.onclick = (e) => {
  e.preventDefault();   // stops opening product page
  e.stopPropagation();  // extra safety
  handleAdd(btn, p.id);
};

      grid.appendChild(col);
    });
  }

  // ================= ANIMATION =================
  function animateFlyToCart(button) {
    const img = button.closest(".card").querySelector("img");
    const cartIcon = document.querySelector(".fa-bag-shopping");

    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = img.cloneNode();
    flyingImg.classList.add("fly-img");

    document.body.appendChild(flyingImg);

    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition = "all 0.8s ease";

    setTimeout(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
      flyingImg.remove();
      cartIcon.classList.add("cart-animate");

      setTimeout(() => {
        cartIcon.classList.remove("cart-animate");
      }, 400);
    }, 800);
  }

  function animateButton(button) {
    const original = button.innerHTML;

    button.innerHTML = "✓ Added";
    button.classList.replace("btn-dark", "btn-success");

    setTimeout(() => {
      button.innerHTML = original;
      button.classList.replace("btn-success", "btn-dark");
    }, 1200);
  }

  // ================= INIT =================
  render();
  updateCartCount();

});
function handleAdd(button, id) {
  addToCart(id);

  // STEP 1: turn pink immediately
  button.classList.add("clicked");

  // STEP 2: after small delay → green success
  setTimeout(() => {
    button.classList.remove("clicked");
    button.classList.add("added");
    button.innerHTML = "✓ Added";
  }, 300);

  // STEP 3: reset back to normal
  setTimeout(() => {
    button.classList.remove("added");
    button.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
  }, 1500);
}