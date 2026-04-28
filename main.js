// ── Nav scroll effect
const nav = document.getElementById('mainNav');
function updateNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateNavScroll);
updateNavScroll();

// ── Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  // FIX: update aria-expanded for accessibility
  hamburger.setAttribute('aria-expanded', isOpen);
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    spans[1].style.cssText = 'opacity:0';
    spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

// Close mobile menu on nav link click
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
}));

// ── Lightbox
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxLabel = document.getElementById('lightboxLabel');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.btn-view-img').forEach(btn => {
  btn.addEventListener('click', () => {
    lightboxImg.src       = btn.dataset.src;
    lightboxImg.alt       = btn.dataset.label;
    lightboxLabel.textContent = btn.dataset.label;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── WhatsApp form builder
document.getElementById('waBtn').addEventListener('click', () => {
  const name    = document.getElementById('fname').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const service = document.getElementById('fservice').value;
  const area    = document.getElementById('farea').value.trim();
  const msg     = document.getElementById('fmsg').value.trim();

  if (!name || !service) {
    alert('Please fill in at least your name and the service you need 🌿');
    return;
  }

  let text = `Hi iLanga Landscaping! 👋\n\n`;
  text += `*Name:* ${name}\n`;
  if (phone)   text += `*Phone:* ${phone}\n`;
  text += `*Service:* ${service}\n`;
  if (area)    text += `*Area:* ${area}\n`;
  if (msg)     text += `*Details:* ${msg}\n`;
  text += `\nLooking forward to hearing from you!`;

  const encoded = encodeURIComponent(text);
  // Use the primary WhatsApp number
  window.open(`https://wa.me/27621433881?text=${encoded}`, '_blank');
});
