// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.2)';
    }
});

// Skills Progress Animation
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skills when skills section is visible
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkills, 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.about, .skills, .projects, .contact');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add slide animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('slide-in-left');
        if (index % 2 === 1) {
            card.classList.remove('slide-in-left');
            card.classList.add('slide-in-right');
        }
        observer.observe(card);
    });

});

// Initialize EmailJS
const EMAILJS_SERVICE_ID = 'service_0sif2p5';
const EMAILJS_TEMPLATE_ID = 'template_7wsg2ip';
const EMAILJS_PUBLIC_KEY = 'f6ub74GVTg_96qf8Q';

// Initialize EmailJS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
});

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Jwalith Kristam'
        };
        
        try {
            // Check if EmailJS is initialized
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded. Please check your internet connection.');
            }
            
            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Track form submission in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            // Show error message
            showNotification('Failed to send message. Please try again or email me directly at jwalithkristam@gmail.com', 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Notification System
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
};

// Scroll to Top Button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
};

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Typing Animation for Hero Title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


// Project Filter (if you want to add filtering later)
const filterProjects = (category) => {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            project.classList.add('fade-in');
        } else {
            project.style.display = 'none';
            project.classList.remove('fade-in');
        }
    });
};

// 3D Card Tilt Effect for Project Cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// 3D Tilt Effect for Paper Cards
document.addEventListener('DOMContentLoaded', () => {
    const paperCards = document.querySelectorAll('.paper-card');
    
    paperCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Add click tracking for analytics (optional)
const trackClick = (element, action) => {
    element.addEventListener('click', () => {
        // Add your analytics tracking code here
        console.log(`Tracked: ${action}`);
    });
};

// Track important interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track project clicks
    document.querySelectorAll('.project-link').forEach(link => {
        trackClick(link, 'Project Click');
    });
    
    // Track contact form submissions
    trackClick(contactForm, 'Contact Form Submit');
    
    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        trackClick(link, 'Social Media Click');
    });
});

// Lazy loading for images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading state to buttons
const addLoadingState = (button, text = 'Loading...') => {
    const originalText = button.textContent;
    button.innerHTML = `<span class="loading"></span> ${text}`;
    button.disabled = true;
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
};

// Utility function to debounce events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler
const handleScroll = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', handleScroll);

// Particle System for Background
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.6';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const connectParticles = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Enhanced gradient animation for text
const animateGradients = () => {
    const gradientElements = document.querySelectorAll('.highlight, .hero-title, .section-title');
    
    gradientElements.forEach((el, index) => {
        let hue = 180;
        const animate = () => {
            hue = (hue + 0.5) % 360;
            el.style.filter = `hue-rotate(${hue}deg)`;
            requestAnimationFrame(animate);
        };
        setTimeout(() => animate(), index * 100);
    });
};

// Smooth parallax effect
document.addEventListener('DOMContentLoaded', () => {
    const parallaxElements = document.querySelectorAll('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.project-card, .paper-card, .experience-card, .education-card, .skills-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Visitor Counter System
const VisitorCounter = {
    // Get visitor count from localStorage
    getCount: () => {
        const count = localStorage.getItem('portfolio_visitor_count');
        return count ? parseInt(count) : 0;
    },
    
    // Increment and save visitor count
    increment: () => {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('portfolio_last_visit');
        
        // Only increment if it's a new day or first visit
        if (lastVisit !== today) {
            const currentCount = this.getCount();
            const newCount = currentCount + 1;
            localStorage.setItem('portfolio_visitor_count', newCount.toString());
            localStorage.setItem('portfolio_last_visit', today);
            
            // Track page view in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view', {
                    'event_category': 'Engagement',
                    'event_label': 'Portfolio Visit',
                    'value': newCount
                });
            }
            
            return newCount;
        }
        
        return this.getCount();
    },
    
    // Display visitor count
    display: () => {
        const count = this.increment();
        const visitorCounterElement = document.getElementById('visitor-counter');
        
        if (visitorCounterElement) {
            visitorCounterElement.textContent = `${count.toLocaleString()}`;
        }
    },
    
    // Get session info (for analytics)
    getSessionInfo: () => {
        const sessionId = sessionStorage.getItem('portfolio_session_id');
        if (!sessionId) {
            const newSessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('portfolio_session_id', newSessionId);
            return newSessionId;
        }
        return sessionId;
    }
};

// Skills Category Switching
document.addEventListener('DOMContentLoaded', () => {
    const skillButtons = document.querySelectorAll('.skill-category-btn');
    const skillContents = document.querySelectorAll('.skill-category-content');
    
    skillButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Remove active class from all buttons and contents
            skillButtons.forEach(btn => btn.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Project Category Filtering
    const projectCategoryButtons = document.querySelectorAll('.project-category-btn');
    const projectContainers = document.querySelectorAll('.projects-container');
    
    projectCategoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Remove active class from all buttons
            projectCategoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show/hide project containers based on filter
            projectContainers.forEach(container => {
                const category = container.getAttribute('data-category');
                if (filter === 'all' && category === 'all') {
                    container.style.display = 'block';
                } else if (filter === category) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
            
            // Smooth scroll to projects section if not already visible
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const rect = projectsSection.getBoundingClientRect();
                if (rect.top < 0 || rect.bottom > window.innerHeight) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

// Initialize Google Analytics tracking when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Track page view in Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load', {
            'event_category': 'Engagement',
            'event_label': 'Portfolio Load'
        });
    }
});

// ============================================
// CHAT FEATURE FUNCTIONALITY
// ============================================

// Firebase Function Configuration
// TODO: Replace with your actual Firebase Function URL after deployment
// Example: https://us-central1-your-project-id.cloudfunctions.net/chatWithGemini
const FIREBASE_FUNCTION_URL = 'https://us-central1-portfolio-291a4.cloudfunctions.net/chatWithGemini';
// const FIREBASE_FUNCTION_URL = 'const FIREBASE_FUNCTION_URL = 'https://us-central1-portfolio-291a4.cloudfunctions.net/chatWithGemini'';

// Chat UI Elements
const chatModal = document.getElementById('chatModal');
const chatFloatBtn = document.getElementById('chatFloatBtn');
const heroChatBtn = document.getElementById('heroChatBtn');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const chatSendBtn = document.getElementById('chatSendBtn');

// Conversation history (stored in localStorage)
let conversationHistory = [];

// Load conversation history from localStorage
function loadConversationHistory() {
    try {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            conversationHistory = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading conversation history:', error);
        conversationHistory = [];
    }
}

// Save conversation history to localStorage
function saveConversationHistory() {
    try {
        // Keep only last 10 messages to avoid storage issues
        const recentHistory = conversationHistory.slice(-10);
        localStorage.setItem('chatHistory', JSON.stringify(recentHistory));
    } catch (error) {
        console.error('Error saving conversation history:', error);
    }
}

// Initialize conversation history on page load
loadConversationHistory();

// Open chat modal
function openChat() {
    if (chatModal) {
        chatModal.classList.add('active');
        chatInput.focus();
        // Hide notification dot when opened
        const notificationDot = document.querySelector('.chat-notification-dot');
        if (notificationDot) {
            notificationDot.style.display = 'none';
        }
        
        // Track chat open event in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_opened', {
                'event_category': 'Engagement',
                'event_label': 'Chat Feature'
            });
        }
    }
}

// Close chat modal
function closeChat() {
    if (chatModal) {
        chatModal.classList.remove('active');
    }
}

// Send chat message to Firebase function
async function sendChatMessage(userMessage) {
    // Add user message to conversation history
    conversationHistory.push({
        role: 'user',
        content: userMessage
    });
    
    // Check if Firebase function URL is configured
    if (FIREBASE_FUNCTION_URL === 'YOUR_FIREBASE_FUNCTION_URL_HERE') {
        // Show setup message if not configured
        setTimeout(() => {
            hideTyping();
            addMessage("I'm still being set up! Please configure your Firebase Function URL in script.js. Check FIREBASE_GEMINI_SETUP.md for instructions. 🚀", false);
            if (chatSendBtn) {
                chatSendBtn.disabled = false;
            }
            if (chatInput) {
                chatInput.focus();
            }
        }, 1500);
        return;
    }
    
    // Call Firebase Function to get Gemini response
    try {
        const response = await fetch(FIREBASE_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                conversationHistory: conversationHistory.slice(-5) // Send last 5 messages for context
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        hideTyping();
        
        // Add bot response to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: data.reply
        });
        
        // Save updated history
        saveConversationHistory();
        
        // Display bot response
        addMessage(data.reply, false);
        
        // Track successful response in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_response_received', {
                'event_category': 'Engagement',
                'event_label': 'Chat Feature'
            });
        }
        
    } catch (error) {
        console.error('Error calling Firebase function:', error);
        hideTyping();
        
        // Remove user message from history if request failed
        conversationHistory.pop();
        
        // Show user-friendly error message
        let errorMessage = "Sorry, I'm having trouble connecting. Please try again later.";
        
        if (error.message.includes('429')) {
            errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (error.message.includes('500')) {
            errorMessage = "Server error. Please try again in a moment.";
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = "Network error. Please check your connection and try again.";
        }
        
        addMessage(errorMessage, false);
        
        // Track error in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_error', {
                'event_category': 'Error',
                'event_label': error.message
            });
        }
    } finally {
        if (chatSendBtn) {
            chatSendBtn.disabled = false;
        }
        if (chatInput) {
            chatInput.focus();
        }
    }
}

// Quick reply button handler
function handleQuickReply(query) {
    if (!query) return;
    
    // Add user message
    addMessage(query, true);
    
    // Clear input
    if (chatInput) {
        chatInput.value = '';
    }
    if (chatSendBtn) {
        chatSendBtn.disabled = true;
    }
    
    // Show typing indicator
    showTyping();
    
    // Track message sent event in Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quick_reply_clicked', {
            'event_category': 'Engagement',
            'event_label': query
        });
    }
    
    // Send message to Firebase function
    sendChatMessage(query);
}

// Event Listeners
if (chatFloatBtn) {
    chatFloatBtn.addEventListener('click', openChat);
}

if (heroChatBtn) {
    heroChatBtn.addEventListener('click', openChat);
}

// Quick reply buttons
document.addEventListener('DOMContentLoaded', () => {
    const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const query = button.getAttribute('data-query');
            if (query) {
                handleQuickReply(query);
            }
        });
    });
});

if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', closeChat);
}

// Close on backdrop click
if (chatModal) {
    chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            closeChat();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatModal && chatModal.classList.contains('active')) {
        closeChat();
    }
});

// Convert markdown to HTML (basic support)
function markdownToHTML(text) {
    if (!text) return '';
    
    // Escape HTML first to prevent XSS
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // Split into lines for processing
    const lines = html.split('\n');
    const result = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check if line is a bullet point
        const bulletMatch = line.match(/^\*\s+(.+)$/);
        
        if (bulletMatch) {
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            // Process the content inside the bullet (handle bold/italic)
            let content = bulletMatch[1];
            content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            result.push(`<li>${content}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            
            if (line) {
                // Process bold **text** to <strong>text</strong>
                let processedLine = line;
                processedLine = processedLine.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                result.push(processedLine);
            } else {
                // Empty line - add paragraph break
                result.push('<br>');
            }
        }
    }
    
    // Close any open list
    if (inList) {
        result.push('</ul>');
    }
    
    // Join and convert remaining line breaks
    html = result.join('\n');
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Convert markdown to HTML for bot messages, plain text for user messages
    if (isUser) {
        const p = document.createElement('p');
        p.textContent = text;
        contentDiv.appendChild(p);
    } else {
        // For bot messages, parse markdown and support multiple paragraphs
        const html = markdownToHTML(text);
        contentDiv.innerHTML = html;
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Hide typing indicator
function hideTyping() {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

// Handle chat form submission
if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        
        // Add user message
        addMessage(userMessage, true);
        chatInput.value = '';
        if (chatSendBtn) {
            chatSendBtn.disabled = true;
        }
        
        // Show typing indicator
        showTyping();
        
        // Track message sent event in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_message_sent', {
                'event_category': 'Engagement',
                'event_label': 'Chat Feature'
            });
        }
        
        // Send message using the reusable function
        sendChatMessage(userMessage);
    });
}

// Auto-resize chat input (optional enhancement)
if (chatInput) {
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}
