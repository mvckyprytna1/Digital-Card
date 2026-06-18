document.addEventListener('DOMContentLoaded', () => {
    'use strict'; // Mengaktifkan mode strict untuk mencegah variabel bocor
    
    console.log("%cStop right there, Developer! 🛑", "color: #00f0ff; font-size: 20px; font-weight: bold;");
console.log("%cCurious about how I built this? Let's connect on WhatsApp.", "color: #8a2be2; font-size: 14px;");

    // 1. DYNAMIC TIME GREETING (Tech Style)
    const initGreeting = () => {
        const greetingElement = document.getElementById('greetingText');
        if (!greetingElement) return;

        const hour = new Date().getHours();
        let currentGreeting = "Hi, Good Night"; // Default untuk jam 22.00 - 04.59

        if (hour >= 5 && hour < 12) {
            currentGreeting = "Hi, Good Morning";
        } else if (hour >= 12 && hour < 17) {
            currentGreeting = "Hi, Good Afternoon";
        } else if (hour >= 17 && hour < 22) {
            currentGreeting = "Hi, Good Evening";
        }
        
        // Typing Effect Initialization
        let i = 0;
        greetingElement.textContent = "";
        
        const typeWriter = setInterval(() => {
            if (i < currentGreeting.length) {
                greetingElement.textContent += currentGreeting.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50); // Kecepatan ketik sinematik
    };

    // 2. HARDWARE ACCELERATED SCROLL REVEAL
    const initScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        if (reveals.length === 0) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target); // Stop observe setelah muncul (hemat memori)
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

        reveals.forEach(el => observer.observe(el));
    };

    // 3. SECURE CLIPBOARD INTERACTION
    const initEmailCopy = () => {
        const copyBtn = document.getElementById('copyEmailBtn');
        const emailLabel = document.getElementById('emailLabel');
        
        if (!copyBtn || !emailLabel) return;

        const iconSvg = copyBtn.querySelector('.copy-ic');
        if (!iconSvg) return; // Null check: Mencegah error jika icon tidak dirender

        let isCopied = false;
        const originalText = emailLabel.textContent;
        const originalHtml = iconSvg.outerHTML;
        
        // Checkmark SVG path
        const checkSvg = `<svg class="copy-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        copyBtn.addEventListener('click', async () => {
            if (isCopied) return;
            
            const email = copyBtn.getAttribute('data-email');
            if (!email) return; 
            
            try {
                await navigator.clipboard.writeText(email);
                emailLabel.textContent = "Copied!"; // Diperpendek agar UI tidak berantakan di mobile
                emailLabel.style.color = "var(--cyan)";
                
                // Update SVG dengan aman
                const currentIcon = copyBtn.querySelector('.copy-ic');
                if (currentIcon) currentIcon.outerHTML = checkSvg;
                
                isCopied = true;

                setTimeout(() => {
                    emailLabel.textContent = originalText;
                    emailLabel.style.color = "";
                    const resetIcon = copyBtn.querySelector('.copy-ic');
                    if (resetIcon) resetIcon.outerHTML = originalHtml;
                    isCopied = false;
                }, 2500);
            } catch (err) {
                console.error("Clipboard API failed: ", err);
            }
        });
    };

    // 4. BACK TO TOP CONTROLLER
    const initBTT = () => {
        const btt = document.getElementById('backToTop');
        if (!btt) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btt.classList.add('visible');
            } else {
                btt.classList.remove('visible');
            }
        }, { passive: true });

        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // 5. 3D TILT EFFECT (DESKTOP ONLY) - Premium Micro-Interaction
    const initTiltEffect = () => {
        const card = document.getElementById('mainCard');
        if (!card) return;
        
        const glare = card.querySelector('.card-glare');
        
        // Deteksi touch device murni, matikan fitur 3D di mobile agar baterai awet & tidak lag
        if (window.matchMedia("(pointer: coarse)").matches) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4; 
            const rotateY = ((x - centerX) / centerX) * 4;

            // Menggunakan will-change saat digerakkan untuk rendering GPU yang lebih smooth
            card.style.willChange = "transform";
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
            
            if (glare) {
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 50%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
            card.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
            card.style.willChange = "auto";
            if (glare) glare.style.opacity = '0';
        });
    };

    // 6. MICRO TAP SCALING FOR MOBILE (Native feel)
    const initTapFeedback = () => {
        const tapTargets = document.querySelectorAll('.tap-target');
        if (tapTargets.length === 0) return;

        tapTargets.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = "scale(0.95)";
                this.style.transition = "transform 0.1s ease";
            }, { passive: true });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = "";
                this.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            }, { passive: true });
        });
    };

    // Execute Modules
    initGreeting();
    initScrollReveal();
    initEmailCopy();
    initBTT();
    initTiltEffect();
    initTapFeedback();
});
