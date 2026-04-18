import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initScene } from './scene'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize 3D Background
initScene();

// Audio Context for Click Feedback
const playClickSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
};

// Add click listeners to all buttons and links
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', () => {
        playClickSound();
    });
});

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('#loader');
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => loader.classList.add('hidden')
        });
        
        // Hero Content Reveal
        gsap.from('#hero h1', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.5
        });
        
        gsap.from('#hero p', {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.8
        });
        
        gsap.from('#hero .flex', {
            y: 20,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 1
        });
    }, 1500);
});

// Cursor Glow Effect
const cursorGlow = document.querySelector('#cursor-glow');
window.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.3,
        ease: "power2.out"
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gear Cards Parallax/Reveal
gsap.utils.toArray('.gear-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.2
    });
});

// Feature Items Reveal
gsap.utils.toArray('.feature-item').forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top bottom-=50",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: i * 0.1
    });
});

// Section Headers Reveal
gsap.utils.toArray('h2').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: "top bottom-=50",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Booking Form Logic (Visual only)
const bookingForm = document.querySelector('form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerText = 'Booking Sent!';
            btn.classList.replace('bg-orange-600', 'bg-green-600');
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.replace('bg-green-600', 'bg-orange-600');
                btn.disabled = false;
                bookingForm.reset();
            }, 3000);
        }, 1500);
    });
}
