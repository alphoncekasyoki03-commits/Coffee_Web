let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleMenu() {
  document.getElementById('nav').classList.toggle('show');
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({name, price, qty: 1});
  }

  const _addToCart = addToCart;
  addToCart = function(name, price) {
    _addToCart(name, price);
  saveCart();
  renderCart();
};
}

function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);

  const _removeItem = removeItem;
  removeItem = function(index) {
    _removeItem(index);
  saveCart();
  renderCart();
};
}

function filterMenu(category) {
  const items = document.querySelectorAll('.menu-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function updateCartCount() {
  const count = document.getElementById('cart-count');
  if (count) count.textContent = cart.length;
  }

function searchMenu() {
  const input = document.getElementById('search').value.toLowerCase();
  const items = document.querySelectorAll('.menu-item');

  items.forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase();
    item.style.display = name.includes(input) ? 'block' : 'none';
  });
}

function scrollToCart() {
  document.querySelector('.cart').scrollIntoView({behavior: 'smooth'});
}

window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function renderCart() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('total');
  const title = document.getElementById('cart-title');

  if (title) {
    title.textContent = `Your Order (${cart.length} item${cart.length !== 1 ? 's' : ''})`;
  }

  if (!list || !total) return;

  list.innerHTML = '';
  let sum = 0;

  cart.forEach((item, index) => {
   const li = document.createElement('li');

   li.innerHTML = `${item.name} - KES ${item.price} x ${item.qty};
     <br>
     <button onclick="changeQty(${index}, 1)">+</button>
     <button onclick="changeQty(${index}, -1)">-</button>
     <button onclick="removeItem(${index})">Remove</button>
     `;
     
   list.appendChild(li);
   sum += item.price * item.qty;
 });

 total.textContent = sum;

  const _renderCart = renderCart;
  renderCart = function() {
    _renderCart();
    updateCartCount();
  };
}

 function saveCart() {
  localStorage.setItem('coffee_cart', JSON.stringify(cart));
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Order placed successfully! ☕');
  cart = [];

  const _checkout = checkout;
  checkout = function() {
    _checkout();
  saveCart();
  renderCart();
};
}

function loadCart() {
  const stored = localStorage.getItem('coffee_cart');
  if (stored) {
    try {
      cart = JSON.parse(stored) || [];
    } catch (e) {
      cart = [];
    }
  }
    renderCart();
  }

window.addEventListener("DOMContentLoaded", loadCart);

// Scroll reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.menu-item, .section-title').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});


// Page Loader
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + '%';
});
