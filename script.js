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

document.querySelectorAll('a, button, .lh-card, .prob-card, .gallery-item, .justif-card, .benefit-card, .process-step, .tech-item, .contact-card, .mockup-card, .summary-card, .quote-card, .map-card').forEach(el => {
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

// ================= CONTADORES ANIMADOS =================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1500;
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ================= TILT 3D =================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
    document.querySelectorAll('.lh-card, .prob-card, .justif-card, .benefit-card, .process-step, .tech-item, .contact-card, .mockup-card, .summary-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
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
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
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

// ================= FORMULARIO DE COTIZACIÓN =================
const quoteForm = document.getElementById('quoteForm');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const formSuccess = document.getElementById('formSuccess');

const WHATSAPP_NUMBER = '50370000000'; // 👈 Cambia por tu número real
const EMAIL_DESTINO = 'contacto@logichardware.com'; // 👈 Cambia por tu correo real

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

function showSuccess() {
    if (!formSuccess) return;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
}

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!quoteForm.checkValidity()) {
            quoteForm.reportValidity();
            return;
        }
        const msg = buildQuoteMessage();
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
        showSuccess();
    });
}

if (sendEmailBtn && quoteForm) {
    sendEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!quoteForm.checkValidity()) {
            quoteForm.reportValidity();
            return;
        }
        const msg = buildQuoteMessage();
        const subject = encodeURIComponent('Solicitud de Cotización - Logic Hardware');
        const body = encodeURIComponent(msg);
        window.location.href = `mailto:${EMAIL_DESTINO}?subject=${subject}&body=${body}`;
        showSuccess();
    });
}