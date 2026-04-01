// ===== MENU HAMBÚRGUER =====
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

// ===== TELA DE BOAS-VINDAS - APENAS NA PRIMEIRA VISITA =====
const welcomeOverlay = document.getElementById('welcomeOverlay');

function hideWelcomeScreen() {
    if (welcomeOverlay) {
        console.log('🎬 Escondendo tela de boas-vindas');
        welcomeOverlay.style.transition = 'opacity 1s ease';
        welcomeOverlay.style.opacity = '0';
        
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
            console.log('✅ Tela de boas-vindas removida com sucesso');
        }, 1000);
    }
}

// Verifica se já viu a tela de boas-vindas nesta sessão
if (welcomeOverlay) {
    // Usa sessionStorage para controlar se já viu na sessão atual
    if (!sessionStorage.getItem('welcomeSeen')) {
        console.log('🎉 Primeira visita - exibindo tela de boas-vindas!');
        sessionStorage.setItem('welcomeSeen', 'true');
        
        // Timer de 4 segundos para esconder automaticamente
        const autoHideTimer = setTimeout(() => {
            console.log('⏰ Timer de 4 segundos concluído');
            hideWelcomeScreen();
        }, 4000);
        
        // Também esconde ao clicar
        welcomeOverlay.addEventListener('click', () => {
            console.log('🖱️ Clique detectado na tela de boas-vindas');
            clearTimeout(autoHideTimer);
            hideWelcomeScreen();
        });
    } else {
        // Já viu a tela nesta sessão, esconde imediatamente
        console.log('👋 Usuário já viu a tela de boas-vindas nesta sessão - ocultando');
        welcomeOverlay.style.display = 'none';
    }
} else {
    console.log('❌ ERRO: Elemento welcomeOverlay não encontrado no DOM');
}

// ===== BOTÃO FLUTUANTE DO WHATSAPP =====
function createWhatsAppButton() {
    // Verifica se o botão já existe para não duplicar
    if (document.getElementById('whatsappButton')) return;
    
    // Cria o botão flutuante
    const whatsappBtn = document.createElement('a');
    whatsappBtn.id = 'whatsappButton';
    whatsappBtn.href = 'https://wa.me/5551999190018?text=Olá!%20Vim%20pelo%20site%20TechVision%20e%20gostaria%20de%20mais%20informações.';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.setAttribute('aria-label', 'WhatsApp');
    
    // Estilos do botão
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        text-decoration: none;
        box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        animation: pulseWhatsApp 1.5s ease infinite;
    `;
    
    // Efeito hover
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
        whatsappBtn.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.6)';
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
        whatsappBtn.style.boxShadow = '0 5px 20px rgba(37, 211, 102, 0.4)';
    });
    
    document.body.appendChild(whatsappBtn);
    
    // Adiciona animação CSS se não existir
    if (!document.querySelector('#whatsappAnimationStyle')) {
        const style = document.createElement('style');
        style.id = 'whatsappAnimationStyle';
        style.textContent = `
            @keyframes pulseWhatsApp {
                0% {
                    transform: scale(1);
                    box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.7);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('💬 Botão do WhatsApp adicionado com animação de pulso!');
}

// Aguarda o DOM carregar para adicionar o botão
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWhatsAppButton);
} else {
    createWhatsAppButton();
}

// ===== ANIMAÇÃO DOS NÚMEROS =====
const numbers = document.querySelectorAll('.dashboard-number');

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const speed = parseInt(element.getAttribute('data-speed')) || 30;
    let current = 0;
    const increment = target / speed;
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
    threshold: 0.3,
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
const interactiveNumbers = document.querySelectorAll('.dashboard-card');
interactiveNumbers.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            if (link === 'projetos.html' || link === 'paises.html') {
                window.location.href = link;
            } else {
                showComingSoonMessage(link === 'clientes.html' ? 'Depoimentos dos Clientes' : 'Ideias Inovadoras');
            }
        }
    });
});

function showComingSoonMessage(section) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = `✨ Em breve você poderá ver os ${section}! Fique ligado.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===== DIFERENCIAIS COM HOVER TOOLTIP =====
const featureCards = document.querySelectorAll('.feature-card');
let activeTooltip = null;

featureCards.forEach(card => {
    let timeoutId;
    
    card.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        if (activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
        }
        
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        
        if (title && desc) {
            const tooltip = document.createElement('div');
            tooltip.className = 'feature-tooltip';
            tooltip.innerHTML = `
                <h4>${title}</h4>
                <p>${desc}</p>
            `;
            document.body.appendChild(tooltip);
            activeTooltip = tooltip;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
            if (activeTooltip) {
                activeTooltip.remove();
                activeTooltip = null;
            }
        }, 200);
    });
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

// ===== FILTROS DO PORTFÓLIO E BLOG =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item, .blog-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== PROJETOS DO PORTFÓLIO COM IA - MODAL CORRIGIDO =====
function showProjectDetails(event, projectId) {
    event.preventDefault();
    
    const projects = {
        'ecommerce-fashion': {
            title: 'E-commerce Fashion',
            description: 'Plataforma de e-commerce completa com inteligência artificial para recomendações personalizadas. O sistema utiliza machine learning para analisar o comportamento do usuário e sugerir produtos relevantes, aumentando as vendas em 35%.',
            tech: ['React', 'Node.js', 'MongoDB', 'TensorFlow.js'],
            image: '🌐'
        },
        'fitness-tracker': {
            title: 'App Fitness Tracker',
            description: 'Aplicativo de fitness com IA que cria treinos personalizados baseados nos objetivos e progresso do usuário. Utiliza visão computacional para analisar a forma dos exercícios e prevenir lesões.',
            tech: ['React Native', 'Firebase', 'TensorFlow Lite', 'OpenCV'],
            image: '📱'
        },
        'design-system': {
            title: 'Design System Bank',
            description: 'Sistema de design completo com componentes inteligentes que se adaptam automaticamente a diferentes contextos de uso. Inclui análise de acessibilidade e testes automatizados.',
            tech: ['Figma', 'Storybook', 'React', 'Jest'],
            image: '🎨'
        },
        'telemedicina': {
            title: 'Plataforma de Telemedicina',
            description: 'Plataforma com IA para triagem de sintomas e diagnóstico assistido. Utiliza processamento de linguagem natural para analisar descrições de sintomas e sugerir especialistas.',
            tech: ['Vue.js', 'Django', 'WebRTC', 'GPT-4'],
            image: '🏥'
        },
        'delivery-food': {
            title: 'App Delivery Food',
            description: 'Aplicativo de delivery com roteirização inteligente usando algoritmos de otimização de rotas em tempo real. Reduz o tempo de entrega em até 25%.',
            tech: ['Flutter', 'Node.js', 'Socket.io', 'Google Maps API'],
            image: '🍽️'
        },
        'gaming-landing': {
            title: 'Landing Page Gaming',
            description: 'Landing page interativa com efeitos 3D e animações geradas por IA. O conteúdo se adapta dinamicamente baseado no comportamento do usuário.',
            tech: ['Three.js', 'GSAP', 'Tailwind', 'WebGL'],
            image: '🎮'
        }
    };
    
    const project = projects[projectId];
    if (project) {
        const modal = document.createElement('div');
        modal.id = 'projectModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--glass);
            border-radius: 32px;
            max-width: 500px;
            width: 90%;
            padding: 2rem;
            border: 1px solid var(--primary);
            animation: scaleIn 0.3s ease;
            position: relative;
            z-index: 10001;
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 4rem; text-align: center; margin-bottom: 1rem;">${project.image}</div>
            <h2 style="color: var(--primary); margin-bottom: 1rem; text-align: center;">${project.title}</h2>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${project.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                ${project.tech.map(t => `<span style="background: rgba(0,210,255,0.2); color: var(--primary); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">${t}</span>`).join('')}
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="closeModalBtn" class="btn-submit" style="padding: 8px 24px; background: transparent; border: 1px solid var(--primary);">Fechar</button>
                <a href="contato.html" class="btn-submit" style="background: linear-gradient(45deg, var(--primary), var(--accent)); padding: 8px 24px; text-decoration: none;">Quero um projeto assim →</a>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const closeModalFunction = () => {
            modal.remove();
            document.body.style.overflow = '';
        };
        
        const closeBtn = modalContent.querySelector('#closeModalBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModalFunction);
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunction();
            }
        });
        
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModalFunction();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
}

// ===== ARTIGOS DO BLOG =====
function showArticle(event, articleId) {
    event.preventDefault();
    
    const articles = {
        'ia': {
            title: 'Como a IA está transformando o desenvolvimento de software',
            category: 'Inteligência Artificial',
            date: '15 de março de 2026',
            author: 'João Silva',
            readTime: '8 min de leitura',
            content: `
                <p>A Inteligência Artificial deixou de ser uma tecnologia futurista e se tornou uma realidade presente no desenvolvimento de software. Neste artigo, exploramos como a IA está revolucionando a forma como escrevemos, testamos e mantemos código.</p>
                
                <h2>1. Geração Automática de Código</h2>
                <p>Ferramentas como GitHub Copilot, Amazon CodeWhisperer e outras soluções baseadas em IA estão permitindo que desenvolvedores escrevam código até 40% mais rápido. Essas ferramentas sugerem trechos de código, completam funções e até geram documentação automaticamente.</p>
                
                <h2>2. Testes Automatizados Inteligentes</h2>
                <p>A IA está revolucionando os testes de software. Algoritmos de machine learning identificam automaticamente casos de teste críticos, previnem bugs antes que cheguem em produção e sugerem correções.</p>
                
                <h2>3. Depuração Assistida</h2>
                <p>Encontrar bugs em código complexo nunca foi tão fácil. Ferramentas com IA analisam logs, rastreiam exceções e sugerem soluções em segundos, reduzindo drasticamente o tempo de debugging.</p>
                
                <div class="portfolio-cta" style="margin-top: 2rem;">
                    <h3>Quer implementar IA no seu projeto?</h3>
                    <p>Nossa equipe de especialistas pode ajudar!</p>
                    <a href="contato.html" class="btn-submit">Fale com um especialista</a>
                </div>
            `,
            image: '🤖'
        },
        'design': {
            title: 'As tendências de UI/UX para 2026',
            category: 'Design',
            date: '10 de março de 2026',
            author: 'Maria Santos',
            readTime: '6 min de leitura',
            content: `
                <p>O mundo do design digital está em constante evolução. Para 2026, algumas tendências prometem revolucionar a forma como interagimos com produtos digitais.</p>
                
                <h2>1. Design Generativo por IA</h2>
                <p>Ferramentas de IA estão permitindo criar múltiplas variações de design em segundos, acelerando o processo criativo e gerando soluções inovadoras.</p>
                
                <h2>2. Micro-interações Avançadas</h2>
                <p>Animações sutis e feedbacks instantâneos criam experiências mais naturais e agradáveis para o usuário.</p>
                
                <div class="portfolio-cta" style="margin-top: 2rem;">
                    <h3>Quer um design que se destaca?</h3>
                    <p>Nossos designers estão prontos para criar algo único para você!</p>
                    <a href="contato.html" class="btn-submit">Solicitar Design</a>
                </div>
            `,
            image: '🎨'
        },
        'performance': {
            title: 'Otimização de sites: 5 técnicas essenciais',
            category: 'Performance',
            date: '5 de março de 2026',
            author: 'Pedro Costa',
            readTime: '5 min de leitura',
            content: `
                <p>A velocidade de carregamento é um dos fatores mais importantes para o sucesso de um site. Aqui estão 5 técnicas essenciais para otimizar seu site.</p>
                
                <h2>1. Lazy Loading</h2>
                <p>Carregue apenas o que é necessário no momento, economizando recursos e melhorando a velocidade inicial.</p>
                
                <h2>2. Compressão de Imagens</h2>
                <p>Use formatos modernos como WebP e AVIF para reduzir o peso das imagens sem perder qualidade.</p>
                
                <div class="portfolio-cta" style="margin-top: 2rem;">
                    <h3>Quer um site rápido e otimizado?</h3>
                    <p>Nossa equipe pode transformar seu site em uma máquina de performance!</p>
                    <a href="contato.html" class="btn-submit">Otimizar meu site</a>
                </div>
            `,
            image: '⚡'
        },
        'cloud': {
            title: 'Guia completo de migração para a nuvem',
            category: 'Cloud',
            date: '28 de fevereiro de 2026',
            author: 'Ana Oliveira',
            readTime: '10 min de leitura',
            content: `
                <p>Migrar sua infraestrutura para a nuvem pode trazer benefícios significativos. Este guia mostra o caminho para uma migração bem-sucedida.</p>
                
                <h2>1. Avaliação e Planejamento</h2>
                <p>Entenda suas necessidades, mapeie aplicações críticas e defina KPIs de sucesso antes de iniciar a migração.</p>
                
                <div class="portfolio-cta" style="margin-top: 2rem;">
                    <h3>Pronto para migrar para a nuvem?</h3>
                    <p>Nossos especialistas em cloud podem ajudar!</p>
                    <a href="contato.html" class="btn-submit">Fale com um especialista</a>
                </div>
            `,
            image: '☁️'
        },
        'seguranca': {
            title: 'Cybersecurity: como proteger seus dados',
            category: 'Segurança',
            date: '20 de fevereiro de 2026',
            author: 'Lucas Ferreira',
            readTime: '7 min de leitura',
            content: `
                <p>A segurança digital nunca foi tão importante. Conheça as melhores práticas para proteger seus dados e sistemas.</p>
                
                <h2>1. Autenticação Multifator</h2>
                <p>Implemente 2FA em todos os sistemas críticos. É uma das formas mais eficazes de prevenir acessos não autorizados.</p>
                
                <div class="portfolio-cta" style="margin-top: 2rem;">
                    <h3>Quer proteger seu negócio?</h3>
                    <p>Oferecemos soluções completas de segurança digital!</p>
                    <a href="contato.html" class="btn-submit">Fale com um especialista</a>
                </div>
            `,
            image: '🔒'
        },
        'carreira': {
            title: 'Como se tornar um desenvolvedor full-stack em 2026',
            category: 'Carreira',
            date: '15 de fevereiro de 2026',
            author: 'Rafael Lima',
            readTime: '12 min de leitura',
            content: `
                <p>O mercado de desenvolvimento full-stack continua aquecido. Veja o roteiro completo para se tornar um profissional de sucesso.</p>
                
                <h2>1. Fundações Sólidas</h2>
                <p>HTML, CSS e JavaScript moderno são a base. Domine os conceitos fundamentais antes de avançar para frameworks.</p>
                
                <div class="portfolio-cta" style="margin-top: 2rem;">
                    <h3>Quer acelerar sua carreira?</h3>
                    <p>Temos programas de mentoria e cursos exclusivos!</p>
                    <a href="contato.html" class="btn-submit">Saiba mais</a>
                </div>
            `,
            image: '🚀'
        }
    };
    
    const article = articles[articleId];
    if (article) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(10px);
            z-index: 10000;
            overflow-y: auto;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
        `;
        
        modalContent.innerHTML = `
            <button id="closeArticleBtn" style="background: transparent; border: 1px solid var(--glass-border); color: white; padding: 0.5rem 1rem; border-radius: 40px; cursor: pointer; margin-bottom: 1rem;">← Voltar</button>
            <div style="background: var(--glass); border-radius: 32px; padding: 2rem; border: 1px solid var(--primary);">
                <div style="font-size: 4rem; text-align: center; margin-bottom: 1rem;">${article.image}</div>
                <div style="display: inline-block; background: linear-gradient(45deg, var(--primary), var(--accent)); padding: 0.3rem 1rem; border-radius: 25px; font-size: 0.8rem; margin-bottom: 1rem;">${article.category}</div>
                <h1 style="color: var(--primary); margin-bottom: 1rem;">${article.title}</h1>
                <div style="display: flex; gap: 1rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; flex-wrap: wrap;">
                    <span>📅 ${article.date}</span>
                    <span>👤 ${article.author}</span>
                    <span>⭐ ${article.readTime}</span>
                </div>
                <div style="color: var(--text-muted); line-height: 1.8;">${article.content}</div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const closeBtn = modalContent.querySelector('#closeArticleBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.remove());
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
}

// ===== REDES SOCIAIS - EM BREVE =====
function showComingSoon(event, social) {
    event.preventDefault();
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = `🚀 Em breve teremos nossa página oficial no ${social}! Fique ligado nas novidades.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
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
        if (href !== '#' && href !== '' && href !== '/' && !href.startsWith('javascript')) {
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

// ===== ANIMAÇÕES ADICIONAIS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    @keyframes pulseGlow {
        0% { transform: scale(1); text-shadow: 0 0 0px rgba(0,210,255,0); }
        50% { transform: scale(1.05); text-shadow: 0 0 30px rgba(0,210,255,0.5); }
        100% { transform: scale(1); text-shadow: 0 0 0px rgba(0,210,255,0); }
    }
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

console.log('🚀 TechVision - Site carregado com sucesso!');
console.log('📱 Versão: 3.0 - Com WhatsApp Flutuante e controle de boas-vindas');
