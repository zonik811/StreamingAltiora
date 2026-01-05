/* ==========================================
   StreamPlus - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initScrollAnimations();
    initHeaderScroll();
    initModalPricing();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .testimonial-card');

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Modal pricing options handler
function initModalPricing() {
    const modalOptions = document.querySelectorAll('.modal-option input');

    modalOptions.forEach(option => {
        option.addEventListener('change', function () {
            updateWhatsAppLink();
        });
    });
}

// Current service name for modal
let currentService = '';

// Modal Functions
function openModal(service) {
    currentService = service;
    const modal = document.getElementById('purchaseModal');
    const modalService = document.getElementById('modalService');

    if (modal && modalService) {
        modalService.textContent = service;

        // Reset to first option
        const firstOption = document.querySelector('.modal-option input');
        if (firstOption) {
            firstOption.checked = true;
        }

        updateWhatsAppLink();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function updateWhatsAppLink() {
    const modalWhatsApp = document.getElementById('modalWhatsApp');
    const selectedOption = document.querySelector('.modal-option input:checked');

    if (modalWhatsApp && selectedOption) {
        const plan = selectedOption.value;
        const message = encodeURIComponent(`Hola! Me interesa comprar una cuenta de ${currentService} - ${plan}. ¿Está disponible?`);
        modalWhatsApp.href = `https://wa.me/573053976431?text=${message}`;
    }
}

function closeModal() {
    const modal = document.getElementById('purchaseModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking overlay
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

// Price option selection on cards (optional enhancement)
document.querySelectorAll('.price-option').forEach(option => {
    option.addEventListener('click', function () {
        const card = this.closest('.service-card');
        const allOptions = card.querySelectorAll('.price-option');

        allOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});
