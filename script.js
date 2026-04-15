document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const closeBtn = document.getElementById('closeMenu');
    const navbar = document.getElementById('navbar');
    const yearSpan = document.getElementById('year');

    if (!hamburger || !mobileMenu || !overlay) return;

    yearSpan.textContent = new Date().getFullYear();

    const toggleMenu = (isOpen) => {
        const state = isOpen !== undefined ? isOpen : !mobileMenu.classList.contains('active');

        mobileMenu.classList.toggle('active', state);
        overlay.classList.toggle('active', state);
        hamburger.setAttribute('aria-expanded', state);
        mobileMenu.setAttribute('aria-hidden', !state);
        document.body.style.overflow = state ? 'hidden' : '';

        // Focus management
        if (state) {
            closeBtn.focus();
        } else {
            hamburger.focus();
        }
    };

    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));
    closeBtn.addEventListener('click', () => toggleMenu(false));

    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    // Sticky navbar
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Smooth scroll offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for fade-ins
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card, .hero-content, .hero-visual, .preview-text, .preview-visual').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});