// Menu Hambúrguer
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
    menuToggle?.classList.toggle('active');
    mainNav?.classList.toggle('active');
    navOverlay?.classList.toggle('active');
    document.body.style.overflow = mainNav?.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    menuToggle?.classList.remove('active');
    mainNav?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle?.addEventListener('click', toggleMenu);
navOverlay?.addEventListener('click', closeMenu);

const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// ===== TELA DE BOAS-VINDAS =====
const welcomeOverlay = document.getElementById('welcomeOverlay');
if (welcomeOverlay) {
    // Verificar se já viu a tela de boas-vindas nesta sessão
    if (!sessionStorage.getItem('welcomeSeen')) {
        sessionStorage.setItem('welcomeSeen', 'true');
        setTimeout(() => {
            welcomeOverlay.style.opacity = '0';
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 500);
        }, 3000);
        
        welcomeOverlay.addEventListener('click', () => {
            welcomeOverlay.style.opacity = '0';
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 500);
        });
    } else {
        welcomeOverlay.style.display = 'none';
    }
}

// ===== ANIMAÇÃO DOS NÚMEROS DO DASHBOARD =====
const numbers = document.querySelectorAll('.dashboard-number');

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target;
            animateNumber(number);
            observer.unobserve(number);
        }
    });
}, observerOptions);

numbers.forEach(number => {
    observer.observe(number);
});

// ===== NÚMEROS INTERATIVOS =====
const interactiveNumbers = document.querySelectorAll('.interactive-numbers');
interactiveNumbers.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    });
});

// ===== DIFERENCIAIS INTERATIVOS =====
const featureCards = document.querySelectorAll('.feature-card');
let activeDetail = null;

featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const detailText = card.getAttribute('data-detail');
        if (detailText) {
            if (activeDetail) {
                activeDetail.remove();
                activeDetail = null;
            }
            
            const detailDiv = document.createElement('div');
            detailDiv.className = 'feature-detail';
            const [title, ...descParts] = detailText.split(':');
            detailDiv.innerHTML = `
                <h4>${title}</h4>
                <p>${descParts.join(':')}</p>
            `;
            document.body.appendChild(detailDiv);
            activeDetail = detailDiv;
            
            setTimeout(() => {
                if (activeDetail === detailDiv) {
                    detailDiv.remove();
                    activeDetail = null;
                }
            }, 5000);
        }
    });
});

document.addEventListener('click', (e) => {
    if (activeDetail && !activeDetail.contains(e.target) && !e.target.closest('.feature-card')) {
        activeDetail.remove();
        activeDetail = null;
    }
});

// ===== CARROSSEL DE DEPOIMENTOS =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    if (testimonials.length === 0) return;
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

if (testimonials.length > 1) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);
}

// ===== FILTROS DO PORTFÓLIO =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== FAQ ACCORDION MODERNIZADO =====
const faqItems = document.querySelectorAll('.faq-item-modern');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question-modern');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.onsubmit = function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const assunto = document.getElementById('assunto')?.value;
        const mensagem = document.getElementById('mensagem')?.value.trim();
        
        if (!nome || !email || !assunto || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = '✓ Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 4000);
        
        this.reset();
    };
}

// ===== SCROLL SMOOTH =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && href !== '/') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(5, 5, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(5, 5, 10, 0.9)';
        }
    }
});

console.log('🚀 TechVision - Site carregado com sucesso!');