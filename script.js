// ================= PRELOADER =================
const preloader = document.querySelector('.preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });
}

// ================= CURSOR PERSONALIZADO =================
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    if (cursorGlow) {
        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateGlow);
}
animateGlow();

document.querySelectorAll('a, button, .lh-card, .prob-card, .gallery-item, .justif-card, .benefit-card, .process-step, .tech-item, .contact-card, .mockup-card, .summary-card, .quote-card, .map-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorGlow) { cursorGlow.style.width = '60px'; cursorGlow.style.height = '60px'; }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorGlow) { cursorGlow.style.width = '40px'; cursorGlow.style.height = '40px'; }
    });
});

// ================= NAVBAR SCROLL =================
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ================= PROGRESS BAR + SCROLL CIRCLE + BACK TO TOP =================
const progressBar = document.getElementById('progressBar');
const scrollCircle = document.querySelector('.scroll-circle');
const circleProgress = document.querySelector('.circle-progress');
const circleText = document.querySelector('.circle-text');
const backToTop = document.querySelector('.back-to-top');
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 22;

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (y / docHeight) : 0;

    if (progressBar) progressBar.style.width = (percent * 100) + '%';

    if (circleProgress && scrollCircle) {
        const offset = CIRCLE_CIRCUMFERENCE - (percent * CIRCLE_CIRCUMFERENCE);
        circleProgress.style.strokeDashoffset = offset;
        if (circleText) circleText.textContent = Math.round(percent * 100) + '%';
        scrollCircle.classList.toggle('visible', y > 300);
    }

    if (backToTop) backToTop.classList.toggle('visible', y > 500);
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================= REVEAL ANIMATIONS =================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ================= CONTADORES ANIMADOS (con decimales y sufijos) =================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const duration = 1800;
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = (eased * target).toFixed(decimals);
            el.textContent = prefix + value + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ================= TILT 3D =================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
    document.querySelectorAll('.lh-card, .prob-card, .justif-card, .benefit-card, .process-step, .tech-item, .contact-card, .mockup-card, .summary-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ================= BOTONES MAGNÉTICOS =================
if (!isTouchDevice) {
    document.querySelectorAll('.btn-lh-primary, .btn-lh-outline, .nav-contact-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}

// ================= CERRAR MENÚ MÓVIL =================
document.querySelectorAll('.navbar-nav .nav-link, .nav-contact-btn').forEach(link => {
    link.addEventListener('click', () => {
        const navCollapse = document.getElementById('navMenu');
        if (navCollapse && navCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navCollapse).hide();
        }
    });
});

// ================= INIT CIRCLE =================
if (circleProgress) {
    circleProgress.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
    circleProgress.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
}

// ================= LIGHTBOX PARA GALERÍA =================
(function initLightbox() {
    const items = document.querySelectorAll('[data-lightbox]');
    if (!items.length) return;

    // Crear estructura del lightbox dinámicamente
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Visor de imágenes');
    lb.innerHTML = `
        <button class="lightbox-close" aria-label="Cerrar"><i class="bi bi-x-lg"></i></button>
        <button class="lightbox-prev" aria-label="Anterior"><i class="bi bi-chevron-left"></i></button>
        <button class="lightbox-next" aria-label="Siguiente"><i class="bi bi-chevron-right"></i></button>
        <div class="lightbox-content">
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
        <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lb);

    const imgEl = lb.querySelector('.lightbox-img');
    const capEl = lb.querySelector('.lightbox-caption');
    const cntEl = lb.querySelector('.lightbox-counter');
    const closeBtn = lb.querySelector('.lightbox-close');
    const prevBtn = lb.querySelector('.lightbox-prev');
    const nextBtn = lb.querySelector('.lightbox-next');

    const images = Array.from(items);
    let index = 0;

    function show(i) {
        index = (i + images.length) % images.length;
        const trigger = images[index];
        const src = trigger.getAttribute('data-lightbox');
        const title = trigger.getAttribute('data-title') || '';
        const desc = trigger.getAttribute('data-desc') || '';
        imgEl.src = src;
        imgEl.alt = title;
        capEl.innerHTML = title ? `<strong>${title}</strong>${desc ? ' — ' + desc : ''}` : '';
        cntEl.textContent = `${index + 1} / ${images.length}`;
        // Pequeña animación
        imgEl.classList.remove('lb-anim');
        void imgEl.offsetWidth;
        imgEl.classList.add('lb-anim');
    }

    function open(i) {
        show(i);
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
    }

    images.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            open(i);
        });
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
        });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => show(index - 1));
    nextBtn.addEventListener('click', () => show(index + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
})();

// ================= FORMULARIO DE COTIZACIÓN =================
const quoteForm = document.getElementById('quoteForm');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const formSuccess = document.getElementById('formSuccess');

const WHATSAPP_NUMBER = '50374405490';
const EMAIL_DESTINO = 'contacto@logichardware.com';
const STORAGE_KEY = 'lh_quote_draft_v1';

function getQuoteData() {
    return {
        nombre: quoteForm.nombre.value.trim(),
        telefono: quoteForm.telefono.value.trim(),
        correo: quoteForm.correo.value.trim(),
        servicio: quoteForm.servicio.value,
        equipo: quoteForm.equipo.value.trim(),
        descripcion: quoteForm.descripcion.value.trim()
    };
}

function buildQuoteMessage() {
    const d = getQuoteData();
    let msg = `*Solicitud de Cotización - Logic Hardware*\n\n`;
    msg += `*Nombre:* ${d.nombre}\n`;
    msg += `*Teléfono:* ${d.telefono}\n`;
    if (d.correo) msg += `*Correo:* ${d.correo}\n`;
    msg += `*Servicio:* ${d.servicio}\n`;
    if (d.equipo) msg += `*Equipo:* ${d.equipo}\n`;
    msg += `*Descripción:* ${d.descripcion}\n\n`;
    msg += `_Enviado desde el sitio web de Logic Hardware_`;
    return msg;
}

function showSuccess(msg) {
    if (!formSuccess) return;
    if (msg) formSuccess.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> ${msg}`;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
}

// Guardado local del borrador
function saveDraft() {
    if (!quoteForm) return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getQuoteData()));
    } catch (e) {}
}

function loadDraft() {
    if (!quoteForm) return;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        Object.keys(d).forEach(k => {
            if (quoteForm[k]) quoteForm[k].value = d[k] || '';
        });
    } catch (e) {}
}

function clearDraft() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

// ================= VALIDACIÓN EN TIEMPO REAL =================
function validateField(field) {
    const wrapper = field.closest('.col-12, .col-md-6') || field.parentElement;
    let errorEl = wrapper.querySelector('.field-error');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        wrapper.appendChild(errorEl);
    }

    let msg = '';
    const val = field.value.trim();

    if (field.hasAttribute('required') && !val) {
        msg = 'Este campo es obligatorio';
    } else if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg = 'Ingresa un correo válido';
    } else if (field.type === 'tel' && val && !/^[0-9+\-\s()]{7,20}$/.test(val)) {
        msg = 'Ingresa un teléfono válido';
    }

    if (msg) {
        field.classList.add('input-invalid');
        field.classList.remove('input-valid');
        errorEl.textContent = msg;
        errorEl.classList.add('show');
    } else if (val) {
        field.classList.remove('input-invalid');
        field.classList.add('input-valid');
        errorEl.classList.remove('show');
    } else {
        field.classList.remove('input-invalid', 'input-valid');
        errorEl.classList.remove('show');
    }
    return !msg;
}

if (quoteForm) {
    loadDraft();

    quoteForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('input-invalid')) validateField(field);
            saveDraft();
        });
        field.addEventListener('change', saveDraft);
    });

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = true;
        quoteForm.querySelectorAll('input[required], select[required], textarea[required]').forEach(f => {
            if (!validateField(f)) ok = false;
        });
        if (!ok) {
            const firstInvalid = quoteForm.querySelector('.input-invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }
        const msg = buildQuoteMessage();
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
        showSuccess('¡Abriendo WhatsApp para enviar tu solicitud!');
    });
}

if (sendEmailBtn && quoteForm) {
    sendEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let ok = true;
        quoteForm.querySelectorAll('input[required], select[required], textarea[required]').forEach(f => {
            if (!validateField(f)) ok = false;
        });
        if (!ok) {
            const firstInvalid = quoteForm.querySelector('.input-invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }
        const msg = buildQuoteMessage();
        const subject = encodeURIComponent('Solicitud de Cotización - Logic Hardware');
        const body = encodeURIComponent(msg);
        window.location.href = `mailto:${EMAIL_DESTINO}?subject=${subject}&body=${body}`;
        showSuccess('¡Abriendo tu correo para enviar la solicitud!');
    });
}

// ================= BOTÓN FLOTANTE WHATSAPP =================
(function addWhatsappFloat() {
    if (document.querySelector('.whatsapp-float')) return;
    const btn = document.createElement('a');
    btn.className = 'whatsapp-float';
    btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, necesito una cotización de reparación')}`;
    btn.target = '_blank';
    btn.setAttribute('aria-label', 'Contactar por WhatsApp');
    btn.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(btn);
})();
