/**
 * UTT Student Market - App Logic & Interaction Engine
 */

let currentCategory = 'all';
let currentCampus = 'all';
let currentSearch = '';

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  initTabNavigation();
  initFilters();
  initPostingModal();
  initProductDetailModal();
  initImageZoom();
});

// Format VND currency
function formatVND(amount) {
  if (amount === 0) return 'MIỄN PHÍ 0Đ (CHO TẶNG)';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Render Categories
function renderCategories() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

  container.innerHTML = UTTData.categories.map(cat => `
    <button class="utt-cat-pill ${cat.id === currentCategory ? 'active' : ''}" data-cat="${cat.id}">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.utt-cat-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.utt-cat-pill').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentCategory = e.currentTarget.getAttribute('data-cat');
      renderProducts();
    });
  });
}

// Render Product Grid
function renderProducts() {
  const grid = document.getElementById('utt-products-grid');
  if (!grid) return;

  let filtered = UTTData.products;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (currentCampus !== 'all') {
    filtered = filtered.filter(p => p.campus === currentCampus);
  }

  if (currentSearch.trim() !== '') {
    const q = currentSearch.toLowerCase().trim();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 8px; border: 1px dashed #cbd5e1;">
        <span style="font-size: 48px; display: block; margin-bottom: 12px;">🔍</span>
        <h3 style="font-size: 16px; color: #1e293b; margin-bottom: 6px;">Chưa tìm thấy đồ dùng phù hợp</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Hãy thử đổi từ khóa tìm kiếm hoặc chọn cơ sở khác xem sao nhé!</p>
        <button class="utt-btn-post" onclick="resetFilters()">Xem tất cả đồ dùng</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="utt-card" data-id="${p.id}">
      <div class="utt-card-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="utt-card-badge-top ${p.price === 0 ? 'free' : ''}">${p.badge}</span>
        <span class="utt-card-condition">${p.condition}</span>
      </div>
      <div class="utt-card-body">
        <div class="utt-student-author">
          <span>${p.avatar}</span>
          <span style="font-weight:600;">${p.author}</span>
          ${p.verified ? '<span class="utt-verified-icon" title="Sinh viên UTT đã xác thực">✓</span>' : ''}
        </div>
        <h3 class="utt-card-title">${p.title}</h3>
        <div class="utt-card-pricing">
          <span class="utt-price ${p.price === 0 ? 'free' : ''}">${formatVND(p.price)}</span>
          <span class="utt-card-campus">📍 ${p.campus === 'hanoi' ? 'Triều Khúc' : p.campus === 'vinhyen' ? 'Vĩnh Yên' : 'Thái Nguyên'}</span>
        </div>
        <div class="utt-card-actions">
          <button class="utt-btn-view" type="button" onclick="openProductDetail('${p.id}')">Xem chi tiết</button>
          <button class="utt-btn-chat" type="button" onclick="openChatWithSeller('${p.id}')">💬 Nhắn tin</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Reset Filters
function resetFilters() {
  currentCategory = 'all';
  currentCampus = 'all';
  currentSearch = '';
  document.getElementById('search-input-box').value = '';
  document.getElementById('campus-select-box').value = 'all';
  renderCategories();
  renderProducts();
}

// Search and Campus Filters
function initFilters() {
  const searchInput = document.getElementById('search-input-box');
  const campusSelect = document.getElementById('campus-select-box');

  searchInput?.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
  });

  campusSelect?.addEventListener('change', (e) => {
    currentCampus = e.target.value;
    renderProducts();
  });
}

// Tab Navigation (Storefront vs Report Sections)
function initTabNavigation() {
  const mainTabs = document.querySelectorAll('.utt-mode-tab');
  const subnavLinks = document.querySelectorAll('.utt-subnav-link');
  const storefrontView = document.getElementById('storefront-view');
  const reportViews = document.querySelectorAll('.report-section');
  const subnavBar = document.getElementById('report-subnav-bar');

  function showSection(sectionId) {
    if (sectionId === 'storefront') {
      storefrontView.style.display = 'block';
      reportViews.forEach(v => v.classList.remove('active'));
      if (subnavBar) subnavBar.style.display = 'none';
      mainTabs[0].classList.add('active');
      mainTabs[1].classList.remove('active');
    } else {
      storefrontView.style.display = 'none';
      if (subnavBar) subnavBar.style.display = 'block';
      mainTabs[1].classList.add('active');
      mainTabs[0].classList.remove('active');

      reportViews.forEach(v => {
        v.classList.toggle('active', v.id === `section-${sectionId}`);
      });

      subnavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-target') === sectionId);
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  mainTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const mode = e.currentTarget.getAttribute('data-mode');
      if (mode === 'storefront') {
        showSection('storefront');
      } else {
        showSection('overview');
      }
    });
  });

  subnavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-target');
      showSection(target);
    });
  });
}

// Post New Product Modal
function initPostingModal() {
  const postModal = document.getElementById('posting-modal');
  const openBtn = document.getElementById('header-post-btn');
  const closeBtn = document.getElementById('close-post-modal-btn');
  const backdrop = document.getElementById('post-modal-backdrop');
  const postForm = document.getElementById('student-post-form');
  const freeCheck = document.getElementById('is-free-checkbox');
  const priceInput = document.getElementById('post-price-input');

  openBtn?.addEventListener('click', () => {
    postModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    postModal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  freeCheck?.addEventListener('change', (e) => {
    if (e.target.checked) {
      priceInput.value = '0';
      priceInput.disabled = true;
    } else {
      priceInput.disabled = false;
      priceInput.value = '';
    }
  });

  postForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title-input').value;
    const cat = document.getElementById('post-cat-select').value;
    const campus = document.getElementById('post-campus-select').value;
    const price = freeCheck.checked ? 0 : parseInt(priceInput.value, 10) || 50000;
    const condition = document.getElementById('post-condition-input').value || 'Đã qua sử dụng';
    const author = document.getElementById('post-author-input').value || 'Sinh viên UTT';
    const desc = document.getElementById('post-desc-input').value;

    const newProduct = {
      id: `utt-${Date.now()}`,
      title,
      category: cat,
      campus,
      price,
      originalPrice: price * 1.5,
      condition,
      author: `${author} (Đã xác minh thẻ SV)`,
      avatar: '🎓',
      image: cat === 'books' ? 'assets/giao_trinh_utt.jpg' : cat === 'tools' ? 'assets/casio_fx580.jpg' : 'assets/utt_market_banner.jpg',
      badge: price === 0 ? 'Cho - Tặng 0đ' : 'Tin mới đăng',
      verified: true,
      time: 'Vừa xong',
      desc
    };

    UTTData.products.unshift(newProduct);
    renderProducts();
    closeModal();
    postForm.reset();
    showToast('🎉 Đăng tin thành công! Tin của bạn đã được kiểm duyệt và hiển thị trên sàn UTT.');
  });
}

// Product Detail & Chat Modal
function openProductDetail(productId) {
  const p = UTTData.products.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('detail-modal');
  document.getElementById('detail-modal-title').textContent = p.title;
  document.getElementById('detail-modal-price').textContent = formatVND(p.price);
  document.getElementById('detail-modal-author').textContent = p.author;
  document.getElementById('detail-modal-campus').textContent = `📍 Cơ sở: ${p.campus === 'hanoi' ? 'Hà Nội (54 Triều Khúc)' : p.campus === 'vinhyen' ? 'Vĩnh Yên' : 'Thái Nguyên'}`;
  document.getElementById('detail-modal-condition').textContent = `Tình trạng: ${p.condition}`;
  document.getElementById('detail-modal-desc').textContent = p.desc;
  document.getElementById('detail-modal-img').src = p.image;

  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openChatWithSeller(productId) {
  const p = UTTData.products.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('chat-modal');
  document.getElementById('chat-seller-name').textContent = p.author;
  document.getElementById('chat-product-summary').textContent = `${p.title} (${formatVND(p.price)})`;

  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initProductDetailModal() {
  const detailModal = document.getElementById('detail-modal');
  const chatModal = document.getElementById('chat-modal');

  document.querySelectorAll('.close-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      detailModal?.classList.remove('open');
      chatModal?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.getElementById('detail-modal-backdrop')?.addEventListener('click', () => {
    detailModal?.classList.remove('open');
    document.body.style.overflow = '';
  });

  document.getElementById('chat-modal-backdrop')?.addEventListener('click', () => {
    chatModal?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Send message in chat mockup
  document.getElementById('chat-send-btn')?.addEventListener('click', () => {
    const input = document.getElementById('chat-msg-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatBody = document.getElementById('chat-messages-body');
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'align-self: flex-end; background: #ff7a00; color: #fff; padding: 8px 14px; border-radius: 12px 12px 0 12px; margin-bottom: 8px; font-size: 13px; max-width: 80%;';
    userMsg.textContent = msg;
    chatBody.appendChild(userMsg);
    input.value = '';

    setTimeout(() => {
      const sellerReply = document.createElement('div');
      sellerReply.style.cssText = 'align-self: flex-start; background: #e2e8f0; color: #0f172a; padding: 8px 14px; border-radius: 12px 12px 12px 0; margin-bottom: 8px; font-size: 13px; max-width: 80%;';
      sellerReply.textContent = 'Chào bạn! Mình vẫn còn món này nhé. Bạn có tiện gặp ở sảnh giảng đường A1 hoặc thư viện trường không?';
      chatBody.appendChild(sellerReply);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
  });
}

// Infographic Zoom Lightbox
function initImageZoom() {
  const zoomModal = document.getElementById('zoom-modal');
  const zoomImg = document.getElementById('zoom-modal-img');
  const closeZoom = document.getElementById('close-zoom-btn');

  document.querySelectorAll('.zoomable-infographic').forEach(img => {
    img.addEventListener('click', (e) => {
      zoomImg.src = e.currentTarget.src;
      zoomModal.classList.add('open');
    });
  });

  closeZoom?.addEventListener('click', () => {
    zoomModal.classList.remove('open');
  });

  document.getElementById('zoom-modal-backdrop')?.addEventListener('click', () => {
    zoomModal.classList.remove('open');
  });
}

// Toast
function showToast(message) {
  let toast = document.getElementById('utt-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'utt-toast';
    toast.style.cssText = 'position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#0f1d4a; color:#fff; padding:12px 24px; border-radius:999px; font-size:13px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.3); border:1px solid #ff7a00; z-index:9999; animation:toastIn 0.3s ease;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}
