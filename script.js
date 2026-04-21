/* ===========================
   DNA EMOCIONAL DA MARCA
   script.js — Interactions & Animations
   =========================== */

// ===========================
// PARTICLE / BOKEH CANVAS
// ===========================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 20;
      this.r = Math.random() * 2.5 + 0.5;
      this.alpha = Math.random() * 0.35 + 0.05;
      this.speed = Math.random() * 0.4 + 0.1;
      this.drift = (Math.random() - 0.5) * 0.3;
      // gold color range
      const hue = 40 + Math.random() * 20;
      const sat = 60 + Math.random() * 30;
      const lit = 55 + Math.random() * 25;
      this.color = `hsla(${hue}, ${sat}%, ${lit}%, ${this.alpha})`;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      this.alpha -= 0.0003;
      if (this.y < -20 || this.alpha <= 0) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticleArray() {
    particles = [];
    const count = Math.min(Math.floor(W / 8), 150);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  initParticleArray();
  animate();
  window.addEventListener('resize', () => { resize(); initParticleArray(); });
})();


// ===========================
// SCROLL REVEAL
// ===========================
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-right, .reveal-left');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach((el, i) => {
    // stagger siblings
    const parent = el.parentElement;
    const siblings = parent ? [...parent.querySelectorAll('.reveal, .reveal-right, .reveal-left')] : [];
    const idx = siblings.indexOf(el);
    if (idx > 0) {
      const existing = parseFloat(el.style.transitionDelay) || 0;
      el.style.transitionDelay = (existing + idx * 0.1) + 's';
    }
    observer.observe(el);
  });
})();


// ===========================
// NAV SCROLL BEHAVIOR
// ===========================
(function initNav() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


// ===========================
// CHESS BOARD PARALLAX
// ===========================
(function initParallax() {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const translateY = y * 0.15;
    heroImg.style.transform = `translateY(${translateY}px)`;
  }, { passive: true });
})();


// ===========================
// GOLD SHIMMER ON HOVER — PILAR CARDS
// ===========================
(function initCardShimmer() {
  const cards = document.querySelectorAll('.pilar-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.08) 0%, rgba(10,10,10,0.95) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();


// ===========================
// DEPO CARDS STAGGER
// ===========================
(function initDepoStagger() {
  const cards = document.querySelectorAll('.depo-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });
})();


// ===========================
// CURSOR GLOW (desktop)
// ===========================
(function initCursorGlow() {
  if (window.innerWidth < 768) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();


// ===========================
// ANIMATED CHESS PIECES — hero
// ===========================
(function initChessFloat() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  // already floated via CSS @keyframes
})();


// ===========================
// SMOOTH ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ===========================
// ENTRANCE: hero elements fire immediately
// ===========================
window.addEventListener('DOMContentLoaded', () => {
  // Trigger hero reveals right away
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal, .hero .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 200);
});
