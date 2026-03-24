// Smooth scrolling
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

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 5px 30px rgba(0, 255, 136, 0.1)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Coming Soon Modal
function showComingSoon() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.remove('active');
}

// Close modal on background click
document.getElementById('comingSoonModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Windows Download
function downloadWindows() {
    const downloadUrl = 'https://github.com/codePR-26/edutrack-ai/releases/download/v1.0.0/EduTrackAI_Setup_v1.0.0.exe';

    // Create a hidden anchor and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'EduTrackAI_Setup_v1.0.0.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show confirmation toast
    showDownloadToast();
}

function showDownloadToast() {
    // Remove existing toast if any
    const existing = document.getElementById('downloadToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'downloadToast';
    toast.innerHTML = `
        <span style="font-size:1.2rem;">🎉</span>
        <div>
            <strong style="display:block;">Download Started!</strong>
            <span style="font-size:0.85rem;opacity:0.85;">EduTrackAI_Setup_v1.0.0.exe • ~58 MB</span>
        </div>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00ff88, #00cc66);
        color: #000;
        padding: 16px 22px;
        border-radius: 12px;
        font-family: inherit;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 8px 32px rgba(0,255,136,0.4);
        z-index: 9999;
        animation: slideInToast 0.4s ease;
    `;

    // Inject keyframe animation
    if (!document.getElementById('toastStyle')) {
        const style = document.createElement('style');
        style.id = 'toastStyle';
        style.textContent = `
            @keyframes slideInToast {
                from { transform: translateY(80px); opacity: 0; }
                to   { transform: translateY(0);   opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(30px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Demo Dashboard Animations
let demoSeconds = 0;
let demoDistractions = 3;
let demoFocusScore = 75;

// Live Timer Animation
setInterval(() => {
    demoSeconds++;
    const hours = Math.floor(demoSeconds / 3600);
    const minutes = Math.floor((demoSeconds % 3600) / 60);
    const secs = demoSeconds % 60;
    
    const timerElement = document.getElementById('demoTimer');
    if (timerElement) {
        timerElement.textContent = 
            String(hours).padStart(2, '0') + ':' + 
            String(minutes).padStart(2, '0') + ':' + 
            String(secs).padStart(2, '0');
    }
}, 1000);

// Animated App Switching
const demoApps = [
    { name: 'Visual Studio', tag: '📚 Study App' },
    { name: 'Chrome', tag: '⚠️ Distraction' },
    { name: 'Word', tag: '📚 Study App' },
    { name: 'Spotify', tag: '⚠️ Distraction' },
    { name: 'VS Code', tag: '📚 Study App' }
];
let appIndex = 0;

setInterval(() => {
    const appElement = document.getElementById('demoCurrentApp');
    const tagElement = document.querySelector('.stat-tag');
    
    if (appElement && tagElement) {
        appIndex = (appIndex + 1) % demoApps.length;
        appElement.textContent = demoApps[appIndex].name;
        tagElement.textContent = demoApps[appIndex].tag;
        
        // Flash effect
        appElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            appElement.style.transform = 'scale(1)';
        }, 300);
    }
}, 3000);

// Animated Focus Score
setInterval(() => {
    const scoreElement = document.getElementById('demoFocusScore');
    if (scoreElement) {
        demoFocusScore = 70 + Math.floor(Math.random() * 15);
        scoreElement.textContent = demoFocusScore + '%';
    }
}, 4000);

// Animated Distractions
setInterval(() => {
    const distElement = document.getElementById('demoDistractions');
    if (distElement) {
        if (Math.random() > 0.7) {
            demoDistractions++;
            distElement.textContent = demoDistractions;
            distElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                distElement.style.transform = 'scale(1)';
            }, 300);
        }
    }
}, 5000);

// Intersection Observer for fade-in animations
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

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe download cards
document.querySelectorAll('.download-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

console.log('🚀 EduTrack.AI Portfolio Loaded!');