let cart = JSON.parse(localStorage.getItem('cart')) || [];

const menuBtn = document.querySelector('.menu-toggle');

function toggleMenu() {
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('overlay-bg');

  nav.classList.toggle('show');
  overlay.classList.toggle('show');
  menuBtn.classList.toggle('active');
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

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + '%';
});

// Scroll Animination for Team Section
const cards = document.querySelectorAll('.team-card');

window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = '0.6s';
});

document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    const diameter = Math.max(this.clientWidth, this.clientHeight);

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = e.clientX - this.getBoundingClientRect().left - diameter / 2 + 'px';
    circle.style.top = e.clientY - this.getBoundingClientRect().top - diameter / 2 + 'px';

    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
});

document.addEventListener("click", function(e) {
  if (e.target.matches('.img-box img')) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightbox.style.display = 'flex';
    lightboxImg.src = e.target.src;
  }
})

document.getElementById('lightbox').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});