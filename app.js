// ============================================
// NUTRIGROW - app.js
// Complete Application Logic
// ============================================

/* ===== APP STATE ===== */
const state = {
  user: {
    name: '',
    email: '',
    category: '',  // 'ibuhamil' | 'mpasi6-8' | 'mpasi9-11' | 'batita' | 'balita'
    profilePhoto: null,
  },
  cart: [], 
  orderHistory: [],         // { id, name, emoji, price, calories, protein, category, tag, qty }
  currentPage: 'login',
  currentMenuFilter: 'semua',
  currentMenuSub: 'semua',
  selectedPayment: 'gopay',
  orderPlaced: false,

};


/* ===== MENU DATA ===== */
const menuData = [
  // Ibu Hamil
  { id: 1, name: 'Sop Bayam', emoji: '🥬', image: 'images/rantang/bayam.jpeg', price: 6000, calories: 300, protein: 7, zat_besi: 3, carb: 35, fat: 5, category: 'ibuhamil', tag: 'Ibu Hamil', tagClass: 'tag-ibuhamil', desc: 'Kaya zat besi & asam folat' },
  { id: 2, name: 'Ikan Bakar', emoji: '🐟', image: 'images/rantang/ikan_bakar.png', price: 8000, calories: 350, protein: 28, zat_besi: 2, carb: 10, fat: 12, category: 'ibuhamil', tag: 'Ibu Hamil', tagClass: 'tag-ibuhamil', desc: 'Omega-3 tinggi untuk janin' },
  { id: 3, name: 'Tumis Wortel Buncis', emoji: '🥕', image: 'images/rantang/tumis_wortel.png', price: 3000, calories: 70, protein: 2, zat_besi: 1, carb: 14, fat: 1, category: 'ibuhamil', tag: 'Ibu Hamil', tagClass: 'tag-ibuhamil', desc: 'Vitamin A & serat tinggi' },
  { id: 4, name: 'Nasi Merah', emoji: '🍚', image: 'images/rantang/nasi_merah.png', price: 5000, calories: 200, protein: 4, zat_besi: 1, carb: 43, fat: 1, category: 'ibuhamil', tag: 'Ibu Hamil', tagClass: 'tag-ibuhamil', desc: 'GI rendah, serat tinggi' },
  { id: 5, name: 'Sambal Terasi', emoji: '🌶️', image: 'images/rantang/sambal_terasi.png', price: 5000, calories: 45, protein: 1, zat_besi: 0, carb: 8, fat: 2, category: 'ibuhamil', tag: 'Ibu Hamil', tagClass: 'tag-ibuhamil', desc: 'Penyedap alami' },
  // MPASI 6-8 Bulan
  { id: 6, name: 'Bubur Bayi', emoji: '🥣', image: 'images/rantang/bubur_bayi.png', price: 5000, calories: 120, protein: 3, zat_besi: 2, carb: 22, fat: 3, category: 'mpasi6-8', tag: 'MPASI 6-8 Bln', tagClass: 'tag-mpasi', desc: 'Tekstur halus lembut' },
  { id: 7, name: 'Labu Siam Rebus', emoji: '🟩', image: 'images/rantang/labu_siam.png', price: 2500, calories: 40, protein: 1, zat_besi: 0.5, carb: 9, fat: 0.2, category: 'mpasi6-8', tag: 'MPASI 6-8 Bln', tagClass: 'tag-mpasi', desc: 'Puree lembut anti alergi' },
  { id: 8, name: 'Brokoli Kukus', emoji: '🥦', image: 'images/rantang/brokoli.png', price: 3500, calories: 55, protein: 4, zat_besi: 1, carb: 10, fat: 0.5, category: 'mpasi6-8', tag: 'MPASI 6-8 Bln', tagClass: 'tag-mpasi', desc: 'Vitamin C & folat' },
  // MPASI 9-11 Bulan
  { id: 9, name: 'Ayam Kukus', emoji: '🍗', image: 'images/rantang/ayam_kukus.png', price: 7000, calories: 130, protein: 20, zat_besi: 1, carb: 0, fat: 5, category: 'mpasi9-11', tag: 'MPASI 9-11 Bln', tagClass: 'tag-mpasi', desc: 'Protein tinggi lembut' },
  { id: 10, name: 'Pisang Ambon', emoji: '🍌', image: 'images/rantang/pisang.png', price: 2500, calories: 90, protein: 1, zat_besi: 0.3, carb: 23, fat: 0.3, category: 'mpasi9-11', tag: 'MPASI 9-11 Bln', tagClass: 'tag-mpasi', desc: 'Energi instan & potasium' },
  { id: 11, name: 'Sop Wortel', emoji: '🥕', image: 'images/rantang/sup_wortel.png', price: 4000, calories: 65, protein: 1.5, zat_besi: 0.5, carb: 13, fat: 0.8, category: 'mpasi9-11', tag: 'MPASI 9-11 Bln', tagClass: 'tag-mpasi', desc: 'Vitamin A & beta karoten' },
  // Batita (1-3 tahun)
  { id: 12, name: 'Nasi Tim Ayam', emoji: '🍲', image: 'images/rantang/nasi_tim.png', price: 8000, calories: 250, protein: 15, zat_besi: 2, carb: 38, fat: 5, category: 'batita', tag: 'Batita 1-3 Thn', tagClass: 'tag-batita', desc: 'Porsi sesuai batita' },
  { id: 13, name: 'Sup Sayur Tahu', emoji: '🥘', image: 'images/rantang/sayur_tahu.png', price: 5500, calories: 180, protein: 8, zat_besi: 1.5, carb: 20, fat: 6, category: 'batita', tag: 'Batita 1-3 Thn', tagClass: 'tag-batita', desc: 'Protein nabati seimbang' },
  { id: 14, name: 'Buah Melon', emoji: '🍈', image: 'images/rantang/melon.png', price: 3000, calories: 60, protein: 0.8, zat_besi: 0.2, carb: 15, fat: 0.2, category: 'batita', tag: 'Batita 1-3 Thn', tagClass: 'tag-batita', desc: 'Vitamin & antioksidan' },
  // Balita (3-5 tahun)
  { id: 15, name: 'Nasi Goreng Sayur', emoji: '🍳', image: 'images/rantang/nasgor.png', price: 9000, calories: 320, protein: 10, zat_besi: 2, carb: 55, fat: 8, category: 'balita', tag: 'Balita 3-5 Thn', tagClass: 'tag-balita', desc: 'Menu kegemaran anak' },
  { id: 16, name: 'Soto Ayam', emoji: '🍜', image: 'images/rantang/soto_ayam.png', price: 10000, calories: 290, protein: 18, zat_besi: 2.5, carb: 30, fat: 9, category: 'balita', tag: 'Balita 3-5 Thn', tagClass: 'tag-balita', desc: 'Kuah hangat bergizi' },
  { id: 17, name: 'Jus Jeruk Peras', emoji: '🍊', image: 'images/rantang/jus_jeruk.png', price: 4000, calories: 80, protein: 1, zat_besi: 0.2, carb: 19, fat: 0.3, category: 'balita', tag: 'Balita 3-5 Thn', tagClass: 'tag-balita', desc: 'Vitamin C & imunitas' },
];

const categoryLabels = {
  ibuhamil: 'Ibu Hamil',
  'mpasi6-8': 'MPASI 6-8 Bln',
  'mpasi9-11': 'MPASI 9-11 Bln',
  batita: 'Batita 1-3 Thn',
  balita: 'Balita 3-5 Thn',
};

const categoryEmoji = {
  ibuhamil: '🤱',
  'mpasi6-8': '👶',
  'mpasi9-11': '🍼',
  batita: '🧒',
  balita: '🧒',
};

/* ===== HELPERS ===== */
const formatRp = (n) => 'Rp ' + n.toLocaleString('id-ID');

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function navigateTo(pageId, direction = 'right') {
  const current = document.querySelector('.page.active');
  const target = document.getElementById('page-' + pageId);
  if (!target || current === target) return;

  if (current) {
    current.classList.add('slide-left');
    setTimeout(() => {
      current.classList.remove('active', 'slide-left');
    }, 300);
  }

  target.classList.add('active');
  state.currentPage = pageId;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Trigger page-specific renders
  if (pageId === 'menu') renderMenuPage();
  if (pageId === 'rantang') renderRantangPage();
  if (pageId === 'checkout') renderCheckoutPage();
  if (pageId === 'home') renderHomePage();
  if (pageId === 'profile') renderProfilePage();
}

/* ===== CART LOGIC ===== */
function addToCart(itemId) {
  const item = menuData.find(m => m.id === itemId);
  if (!item) return;
  const existing = state.cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }
  updateCartBadges();
  showToast(`✅ ${item.name} ditambahkan ke rantang`);
  renderCheckoutFloat();
}

function removeFromCart(itemId) {
  const idx = state.cart.findIndex(c => c.id === itemId);
  if (idx === -1) return;
  if (state.cart[idx].qty > 1) {
    state.cart[idx].qty--;
  } else {
    state.cart.splice(idx, 1);
  }
  updateCartBadges();
  renderCheckoutFloat();
}

function getCartTotal() {
  return state.cart.reduce((s, c) => s + c.price * c.qty, 0);
}

function getCartCount() {
  return state.cart.reduce((s, c) => s + c.qty, 0);
}

function getTotalNutri() {
  return state.cart.reduce((acc, c) => {
    acc.calories += c.calories * c.qty;
    acc.protein += c.protein * c.qty;
    acc.carb += c.carb * c.qty;
    acc.fat += c.fat * c.qty;
    return acc;
  }, { calories: 0, protein: 0, carb: 0, fat: 0 });
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll('.nav-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
  const cartBannerText = document.getElementById('cart-banner-text');
  const cartBanner = document.getElementById('cart-banner');
  if (cartBannerText && cartBanner) {
    if (count > 0) {
      cartBannerText.textContent = `${count} Item di rantang • ${Math.round(getTotalNutri().calories)} kkal`;
      cartBanner.style.display = 'flex';
    } else {
      cartBanner.style.display = 'none';
    }
  }
}

function renderCheckoutFloat() {
  const floatEl = document.getElementById('rantang-checkout-float');
  if (!floatEl) return;
  const count = getCartCount();
  if (count > 0) {
    floatEl.style.display = 'flex';
    floatEl.querySelector('.checkout-badge').textContent = formatRp(getCartTotal());
    floatEl.querySelector('.checkout-count').textContent = `${count} item`;
  } else {
    floatEl.style.display = 'none';
  }
}

/* ===== LOGIN / REGISTER ===== */
function initLoginPage() {

  // Toggle between login/register tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;
      document.getElementById('login-section').style.display = mode === 'login' ? 'block' : 'none';
      document.getElementById('register-section').style.display = mode === 'register' ? 'block' : 'none';
    });
  });

  // Login submit
  document.getElementById('btn-login').addEventListener('click', () => {
    const name = document.getElementById('login-name').value.trim();
    const cat = document.getElementById('login-category').value;
    if (!name) { showToast('⚠️ Masukkan nama Anda'); return; }
    if (!cat) { showToast('⚠️ Pilih kategori'); return; }
    state.user.name = name;
    state.user.category = cat;
    state.user.email = `${name.toLowerCase().replace(/\s/g,'')}@nutrigrow.id`;
    navigateTo('home');
  });

  // Register submit
  document.getElementById('btn-register').addEventListener('click', () => {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const cat = document.getElementById('reg-category').value;
    if (!name) { showToast('⚠️ Masukkan nama Anda'); return; }
    if (!cat) { showToast('⚠️ Pilih kategori'); return; }
    state.user.name = name;
    state.user.email = email || `${name.toLowerCase().replace(/\s/g,'')}@nutrigrow.id`;
    state.user.category = cat;
    navigateTo('home');
    showToast(`🎉 Selamat datang, ${name}!`);
  });
}

/* ===== RENDER HOME PAGE ===== */
function renderHomePage() {
  const u = state.user;
  const greeting = u.name ? `Halo, ${u.name}!` : 'Halo!';
  const catLabel = categoryLabels[u.category] || '';
  const catEmoji = categoryEmoji[u.category] || '👤';

  // Header
  const el = id => document.getElementById(id);
  if (el('home-greeting')) el('home-greeting').textContent = greeting;
  if (el('home-category-badge')) {
    el('home-category-badge').textContent = `${catEmoji} ${catLabel}`;
    el('home-category-badge').style.display = catLabel ? 'inline-flex' : 'none';
  }
  if (el('home-avatar-img')) {
    if (u.profilePhoto) {
      el('home-avatar-img').innerHTML = `<img src="${u.profilePhoto}" alt="avatar">`;
    } else {
      el('home-avatar-img').innerHTML = `<span class="avatar-icon">👤</span>`;
    }
  }

  // Menu for you
  renderMenuForYou();

  // Update cart banner
  updateCartBadges();

  // Draw chart
  drawGrowthChart();
}

function renderMenuForYou() {
  const container = document.getElementById('menu-for-you');
  if (!container) return;
  const cat = state.user.category;
  let items = cat ? menuData.filter(m => m.category === cat) : menuData.slice(0, 5);
  if (!items.length) items = menuData.slice(0, 5);
  items = items.slice(0, 5);

  container.innerHTML = items.map((item, i) => `
    <div class="menu-card fade-in-up stagger-${i+1}" onclick="addToCart(${item.id})">
      <div class="menu-card-img">
      ${item.image
        ? `<img src="${item.image}" alt="${item.name}"
         style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`
      : item.emoji}
    </div>
      <span class="menu-card-tag ${item.tagClass}">${item.tag}</span>
      <div class="menu-card-name">${item.name}</div>
      <div class="menu-card-nutri">
        <span>⚡<b>${item.calories}</b> kal</span>
        <span>💪<b>${item.protein}g</b></span>
      </div>
      <div class="menu-card-price">${formatRp(item.price)}</div>
    </div>
  `).join('');
}

/* ===== GROWTH CHART ===== */
function drawGrowthChart() {
  const canvas = document.getElementById('growth-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 300;
  const H = 100;
  canvas.width = W;
  canvas.height = H;
  ctx.clearRect(0, 0, W, H);

  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const weightData = [7.2, 7.8, 8.1, 8.4, 8.9, 9.2, 9.5, 9.8, 10.1, 10.3, 10.6, 10.9];
  const heightData = [65, 66.5, 68, 69.5, 71, 72.5, 74, 75, 76.5, 77.5, 78.5, 80];

  const padL = 10, padR = 10, padT = 10, padB = 24;
  const W2 = W - padL - padR;
  const H2 = H - padT - padB;
  const step = W2 / (months.length - 1);

  // Normalize data
  function norm(arr) {
    const min = Math.min(...arr), max = Math.max(...arr);
    return arr.map(v => padT + H2 - ((v - min) / (max - min)) * H2);
  }

  // Draw grid lines
  ctx.strokeStyle = 'rgba(21,101,192,0.07)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const y = padT + (H2 / 3) * i;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + W2, y); ctx.stroke();
  }

  // Draw weight line (blue)
  const wy = norm(weightData);
  ctx.beginPath();
  wy.forEach((y, i) => i === 0 ? ctx.moveTo(padL + i * step, y) : ctx.lineTo(padL + i * step, y));
  ctx.strokeStyle = '#1565C0';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw height line (sky)
  const hy = norm(heightData);
  ctx.beginPath();
  hy.forEach((y, i) => i === 0 ? ctx.moveTo(padL + i * step, y) : ctx.lineTo(padL + i * step, y));
  ctx.strokeStyle = '#29B6F6';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw dots
  wy.forEach((y, i) => {
    ctx.beginPath();
    ctx.arc(padL + i * step, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#1565C0';
    ctx.fill();
  });

  hy.forEach((y, i) => {
    ctx.beginPath();
    ctx.arc(padL + i * step, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#29B6F6';
    ctx.fill();
  });

  // Month labels
  ctx.fillStyle = '#90A4AE';
  ctx.font = '9px Nunito';
  ctx.textAlign = 'center';
  months.forEach((m, i) => {
    ctx.fillText(m, padL + i * step, H - 6);
  });
}

/* ===== RENDER MENU PAGE ===== */
function renderMenuPage() {
  const container = document.getElementById('menu-list-container');
  if (!container) return;

  const filter = state.currentMenuFilter;
  const sub = state.currentMenuSub;

  let items = menuData;
  if (filter !== 'semua') {
    items = items.filter(m => m.category === filter);
  }
  if (sub !== 'semua' && sub !== filter) {
    items = items.filter(m => m.category === sub);
  }

  const searchVal = document.getElementById('menu-search')?.value?.toLowerCase() || '';
  if (searchVal) {
    items = items.filter(m => m.name.toLowerCase().includes(searchVal) || m.tag.toLowerCase().includes(searchVal));
  }

  container.innerHTML = items.map(item => {
    const cartItem = state.cart.find(c => c.id === item.id);
    const qty = cartItem ? cartItem.qty : 0;
    return `
      <div class="menu-list-item">
        <div class="menu-item-emoji">
        ${item.image
           ? `<img src="${item.image}" alt="${item.name}"
         style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`
        : item.emoji}
      </div>
        <div class="menu-item-info">
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-nutri-row">
            <span class="nutri-chip">⚡ ${item.calories} kal</span>
            <span class="nutri-chip">💪 ${item.protein}g Protein</span>
            <span class="nutri-chip">🩸 ${item.zat_besi}mg</span>
          </div>
          <span class="menu-card-tag ${item.tagClass}" style="font-size:10px;padding:2px 8px;">${item.tag}</span>
          <div class="menu-item-price">${formatRp(item.price)}</div>
        </div>
        ${qty > 0 ? `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div class="qty-control">
            <button class="qty-btn" onclick="removeFromCart(${item.id});renderMenuPage()">−</button>
            <span class="qty-number">${qty}</span>
            <button class="qty-btn" style="background:var(--primary);color:white;border-color:var(--primary)" onclick="addToCart(${item.id});renderMenuPage()">+</button>
          </div>
        </div>
        ` : `
        <button class="add-btn" onclick="addToCart(${item.id});renderMenuPage()">+</button>
        `}
      </div>
    `;
  }).join('');

  if (!items.length) {
    container.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:12px">🔍</div>
      <div style="font-size:14px;font-weight:700">Menu tidak ditemukan</div>
    </div>`;
  }
}

function setMenuFilter(filter) {
  state.currentMenuFilter = filter;
  state.currentMenuSub = 'semua';
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });
  document.querySelectorAll('.sub-filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.sub === 'semua');
  });
  renderMenuPage();
}

function setMenuSub(sub) {
  state.currentMenuSub = sub;
  document.querySelectorAll('.sub-filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.sub === sub);
  });
  renderMenuPage();
}

/* ===== RENDER RANTANG PAGE ===== */
function renderRantangPage() {
  const grid = document.getElementById('rantang-grid');
  if (!grid) return;

  // Take up to 4 items from cart
  const items = state.cart.slice(0, 4);
  const cells = Array(4).fill(null);
  items.forEach((item, i) => { cells[i] = item; });

  grid.innerHTML = cells.map((cell, i) => {
    if (cell) {
      return `
        <div class="rantang-cell filled">
          <button class="rantang-remove-btn" onclick="removeFromCart(${cell.id});renderRantangPage()">✕</button>
          <div class="rantang-cell-emoji">
          ${cell.image 
          ? `<img src="${cell.image}" style="width:56px;height:56px;object-fit:cover;border-radius:8px">`
          : cell.emoji}
          </div>
          <div class="rantang-cell-name">${cell.name}</div>
          <span class="rantang-cell-tag ${cell.tagClass}">${cell.tag}</span>
        </div>
      `;
    } else {
      return `
        <div class="rantang-cell" onclick="navigateTo('menu')" style="opacity:0.5">
          <div style="font-size:36px;color:var(--text-muted)">＋</div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted)">Tambah Menu</div>
        </div>
      `;
    }
  }).join('');

  // Nutrisi summary
  const nutri = getTotalNutri();
  const nutSummary = document.getElementById('rantang-nutri-summary');
  if (nutSummary) {
    nutSummary.innerHTML = `
      <div class="nutri-stat">
        <div class="nutri-stat-value">${Math.round(nutri.calories)}</div>
        <div class="nutri-stat-unit">kkal</div>
        <div class="nutri-stat-label">Kalori</div>
      </div>
      <div class="nutri-divider"></div>
      <div class="nutri-stat">
        <div class="nutri-stat-value">${Math.round(nutri.protein)}</div>
        <div class="nutri-stat-unit">gram</div>
        <div class="nutri-stat-label">Protein</div>
      </div>
      <div class="nutri-divider"></div>
      <div class="nutri-stat">
        <div class="nutri-stat-value">${state.cart.length}</div>
        <div class="nutri-stat-unit">porsi</div>
        <div class="nutri-stat-label">Items</div>
      </div>
    `;
  }

  // Order list
  const orderList = document.getElementById('rantang-order-list');
  if (orderList) {
    if (!state.cart.length) {
      orderList.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;font-weight:700">
        <div style="font-size:40px;margin-bottom:8px">🍱</div>Rantang kosong, tambahkan menu dulu!
      </div>`;
    } else {
      orderList.innerHTML = state.cart.map(item => `
        <div class="order-item-row">
          <div class="order-item-emoji">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}"
         style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`
       : item.emoji}
        </div>
          <div class="order-item-info">
            <div class="order-item-name">${item.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${formatRp(item.price)} × ${item.qty}</div>
          </div>
          <div class="qty-control">
            <button class="qty-btn" onclick="removeFromCart(${item.id});renderRantangPage()">−</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" style="background:var(--primary);color:white;border-color:var(--primary)" onclick="addToCart(${item.id});renderRantangPage()">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Total
  const totalEl = document.getElementById('rantang-total');
  if (totalEl) totalEl.textContent = formatRp(getCartTotal());

  // Checkout float
  renderCheckoutFloat();
}

/* ===== RENDER CHECKOUT PAGE ===== */
function renderCheckoutPage() {
  // Order items
  const itemsEl = document.getElementById('checkout-items');
  if (itemsEl) {
    itemsEl.innerHTML = state.cart.map(item => `
      <div class="checkout-item-row">
        <div class="checkout-item-emoji">
        ${item.image
        ? `<img src="${item.image}" alt="${item.name}"
         style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`
        : item.emoji}
        </div>
        <div class="checkout-item-info">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-sub">${categoryLabels[item.category] || item.tag} • x${item.qty}</div>
        </div>
        <div class="checkout-item-price">${formatRp(item.price * item.qty)}</div>
      </div>
    `).join('') || `<div style="color:var(--text-muted);font-size:13px;padding:12px 0">Tidak ada item</div>`;
  }

  // Nutri total
  const nutri = getTotalNutri();
  const nutriEl = document.getElementById('checkout-nutri');
  if (nutriEl) {
    const rows = [
      { name: 'Kalori', val: `${Math.round(nutri.calories)} kkal`, color: '#1565C0' },
      { name: 'Protein', val: `${Math.round(nutri.protein)}g`, color: '#43A047' },
      { name: 'Karbohidrat', val: `${Math.round(nutri.carb)}g`, color: '#FB8C00' },
      { name: 'Lemak', val: `${Math.round(nutri.fat)}g`, color: '#E53935' },
    ];
    nutriEl.innerHTML = rows.map(r => `
      <div class="nutri-row">
        <div class="nutri-dot" style="background:${r.color}"></div>
        <span class="nutri-name-text">${r.name}</span>
        <span class="nutri-value-text" style="color:${r.color}">${r.val}</span>
      </div>
    `).join('');
  }

  // Total
  const totalEl = document.getElementById('checkout-total-val');
  if (totalEl) totalEl.textContent = formatRp(getCartTotal());

  const totalEl2 = document.getElementById('checkout-total-val2');
  if (totalEl2) totalEl2.textContent = formatRp(getCartTotal());
}

/* ===== RENDER PROFILE PAGE ===== */
function renderProfilePage() {
  const u = state.user;
  const catLabel = categoryLabels[u.category] || '';
  const catEmoji = categoryEmoji[u.category] || '👤';

  const el = id => document.getElementById(id);
  if (el('profile-name')) el('profile-name').textContent = u.name || 'Pengguna';
  if (el('profile-email')) el('profile-email').textContent = u.email || 'pengguna@nutrigrow.id';
  if (el('profile-badge')) el('profile-badge').textContent = `${catEmoji} ${catLabel}`;
  if (el('profile-orders'))
  el('profile-orders').textContent =
    state.orderHistory.length;

  const weeklyCalories = getWeeklyCalories();
  const monthlyCalories = getMonthlyCalories();

  if (el('profile-calories')) {
  el('profile-calories').textContent =
    `${weeklyCalories} kcal`;
  }

  if (el('profile-avatar-main')) {
    if (u.profilePhoto) {
      el('profile-avatar-main').innerHTML = `<img src="${u.profilePhoto}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    } else {
      el('profile-avatar-main').innerHTML = `<span style="font-size:38px">👤</span>`;
    }
  }
}

/* ===== PROFILE PHOTO UPLOAD ===== */
function triggerPhotoUpload(inputId) {
  document.getElementById(inputId)?.click();
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    state.user.profilePhoto = e.target.result;
    renderHomePage();
    renderProfilePage();
    showToast('📸 Foto profil diperbarui!');
  };
  reader.readAsDataURL(file);
}

/* ===== PAYMENT ===== */
function selectPayment(method) {
  state.selectedPayment = method;
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.payment === method);
  });
}

function placeOrder() {
  if (!state.cart.length) {
    showToast('⚠️ Rantang kosong!');
    return;
  }
  state.orderPlaced = true;
  const successPage = document.getElementById('page-success');
  if (successPage) {
    document.getElementById('success-total').textContent = formatRp(getCartTotal());
    navigateTo('success');
    setTimeout(() => {
      state.cart = [];
      updateCartBadges();
    }, 500);
  }
  state.orderHistory.push({
  date: new Date(),
  totalCalories: getTotalNutri().calories,
  totalPrice: getCartTotal(),
  itemCount: getCartCount()
});
}

function getWeeklyCalories() {
  const now = new Date();

  return state.orderHistory
    .filter(order =>
      (now - new Date(order.date)) < 7 * 24 * 60 * 60 * 1000
    )
    .reduce((sum, order) => sum + order.totalCalories, 0);
}

function getMonthlyCalories() {
  const now = new Date();

  return state.orderHistory
    .filter(order =>
      (now - new Date(order.date)) < 30 * 24 * 60 * 60 * 1000
    )
    .reduce((sum, order) => sum + order.totalCalories, 0);
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Init login page
  initLoginPage();

  // Search input on menu page
  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', renderMenuPage);
  }

  // Photo upload inputs
  document.querySelectorAll('.photo-upload-input').forEach(input => {
    input.addEventListener('change', handlePhotoUpload);
  });

  // Initialize badges
  updateCartBadges();
});
