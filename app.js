// images ko screen pr slider krna ek ke baad ek show krnaa ek hi box ke 
function nextSlide(sliderId) {
  let slider = document.getElementById(sliderId);
  let slides = slider.querySelectorAll(".slide");
  let active = slider.querySelector(".active");

  // first me active hai abhi by indexOf 
  let index = Array.from(slides).indexOf(active);
  // active wali image ko classlist se remove krna
  active.classList.remove("active");
// or nayi wali image show krana
  let nextIndex = index + 1;
  // yeh check krna if nextIndex agar slides ki length se bada or equal hai to 0 pr aa jana dubara se
  
  if (nextIndex >= slides.length) {
    nextIndex = 0;
  }

// next index ko active kr dena using classlist se
  slides[nextIndex].classList.add("active");
}

// products data which is shown on screen using renderProduct
let items = [
  { id: 1, name: "Laptop", price: 50000, image: "/images/laptop2.jpeg" },
  { id: 2, name: "Phone", price: 70000, image: "/images/phone.jpeg" },
  { id: 3, name: "Watch", price: 5000, image: "/images/watch1.jpeg" },
  { id: 4, name: "Speaker", price: 3500, image: "/images/speaker1.jpeg" },
  { id: 5, name: "Pendrive", price: 2100, image: "/images/drive2.jpeg" },
  { id: 6, name: "Headphone", price: 4700, image: "/images/headphone2.jpeg" },
];

// show krna screen pr products ko 
function renderProducts() {
  let html = "";

  // har item ko foreach loop se pakadna
  items.forEach(item => {
    html += `
      <div class="product-card">
        <img src="${item.image}" width="150" onclick="viewProduct(${item.id})">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
          Add to Cart
        </button>
      </div>
    `;
  });

  // show krana page pr images ko 
  let box = document.querySelector(".productBox");
  if (box) {
    // naya element dalana productbox ke andar
    box.innerHTML = html;
  }
}


function viewProduct(id) {
  let product = items.find(item => item.id === id);
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "/products/productdetails.html";
}

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function loadCartPage() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.querySelector(".cart-container");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<h3 style='text-align:center;'>Cart is Empty 🛒</h3>";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    html += `
      <div class="cart-item">
        <img src="${item.image}" width="100">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  html += `<h2 style="text-align:center; color:red; margin-top: 20px">Total: ₹${total}</h2>`;
  container.innerHTML = html;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartPage();
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  let qty = document.querySelector(".cartbox .quantity");
  if (qty) {
    qty.innerText = total;
  }
}

// 1. product ko screen pr render krna 
renderProducts();
loadCartPage();
updateCartCount();

