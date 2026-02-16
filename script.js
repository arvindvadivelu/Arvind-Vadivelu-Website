lucide.createIcons();
document.getElementById('year').textContent = new Date().getFullYear();

// --- 1. TYPEWRITER EFFECT ---
const titles = ["Software Engineer", "Java Developer", "Full Stack Developer"];
let titleIndex = 0;
const textElement = document.getElementById("typewriter-text");

function cycleText() {
    textElement.style.opacity = '0';
    textElement.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        textElement.innerText = titles[titleIndex];
        textElement.style.opacity = '1';
    }, 500);
}
setInterval(cycleText, 3000);

// --- 2. MOBILE MENU LOGIC ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    mobileMenuOverlay.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeMobileMenu() {
    mobileMenuOverlay.classList.add('translate-x-full');
    document.body.style.overflow = ''; // Restore scrolling
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// --- 3. MODAL DATA & LOGIC ---
const projectsData = {
    'pibcache': {
        title: 'PibCache',
        desc: 'CarScrubz is a fully responsive car washing and detailing service website designed to: Showcase premium car wash packages, Present service benefits clearly, Improve customer engagement, Provide smooth and interactive browsing experience. Unlike heavy framework-based builds, this project focuses on core frontend mastery using vanilla technologies.',
        images: [
            './Project/Carscrubz/IMG1.png',
            './Project/Carscrubz/IMG2.png',
            './Project/Carscrubz/IMG3.png',
            './Project/Carscrubz/IMG4.png'
        ],
        skills: ['HTML', 'CSS', 'JAVASCRIPT'],
        github: 'https://github.com/arvindvadivelu/Carscrubz-Website.git',
        demo: 'https://carscrubz.netlify.app'
    },

    'farmiq': {
        title: 'FarmIQ',
        desc: 'FarmIQ® Official (Phase 1) is a full-stack agricultural intelligence platform built to solve real-world farming challenges under the Smart India Hackathon 2024 problem statement.The platform enables: 🌱 Smart Crop Identification using AI Model (.h5), 📊 Farm Monitoring Dashboard,🌦 Real-time Crop Condition Monitoring, 🌿 Intelligent Crop Recommendation System, 🌐 Multi-Language User Access',
        images: [
            '/Project/FarmIQ/IMG1.png',
            '/Project/FarmIQ/IMG2.png',
            '/Project/FarmIQ/IMG3.png',
            '/Project/FarmIQ/IMG4.png',
            '/Project/FarmIQ/IMG5.png'
        ],
        skills: ['HTML', 'CSS', 'JAVASCRIPT', 'PYTHON', 'SQL'],
        github: 'https://github.com/arvindvadivelu/FarmIQ-Official.git',
        demo: 'https://farmiq.netlify.app/'
    },  // ✅ THIS COMMA WAS MISSING

    'bmw': {
        title: 'BMW M3 CS',
        desc: 'High-performance automotive showcase project demonstrating advanced UI interactions, smooth video preview transitions, and structured content presentation. Designed to highlight performance specifications, engineering precision, and premium user experience.',
        images: [
            '/Project/BMW/IMG1.png',
            '/Project/BMW/IMG2.png',
            '/Project/BMW/IMG3.png',
            '/Project/BMW/IMG4.png'
        ],
        skills: ['HTML', 'CSS', 'JAVASCRIPT'],
        github: 'https://github.com/arvindvadivelu/BMW-M3-CS-Website.git',
        demo: 'https://bmwm3cs.netlify.app'
    }
};


const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

function openModal(id) {
    const data = projectsData[id];
    if (!data) return;

    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-github').href = data.github;
    document.getElementById('modal-demo').href = data.demo;

    const gallery = document.getElementById('modal-gallery');
    gallery.innerHTML = data.images.map(img =>
        `<img src="${img}" class="h-64 min-w-[300px] object-cover rounded-xl snap-center shadow-md">`
    ).join('');

    const skillsContainer = document.getElementById('modal-skills');
    skillsContainer.innerHTML = data.skills.map(skill =>
        `<span class="px-3 py-1 bg-gray-800 rounded-lg text-xs font-bold text-gray-300 border border-gray-700">${skill}</span>`
    ).join('');

    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// --- 4. NAV SCROLL HIGHLIGHT ---
const sections = document.querySelectorAll("section, footer#contact");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove("nav-active");
                link.classList.remove("text-white");
                link.classList.add("text-gray-400");

                if (link.getAttribute("data-target") === entry.target.id) {
                    link.classList.add("nav-active");
                    link.classList.remove("text-gray-400");
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));

// --- 5. UTILS ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    const toast = document.getElementById("toast");
    toast.style.opacity = "1";
    setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    if (video) {
        wrapper.addEventListener('mouseenter', async () => {
            try { await video.play(); } catch (e) { }
        });
        wrapper.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// --- SCROLL PROGRESS BAR ---
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }
});

function scrollGallery(elementId, direction) {
    const container = document.getElementById(elementId);
    // NOW SCROLLS FULL WIDTH (100%)
    const scrollAmount = container.clientWidth;

    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
document.querySelectorAll(".video-wrapper").forEach(wrapper => {
    const video = wrapper.querySelector("video");
    const thumbnail = wrapper.querySelector(".thumbnail");

    wrapper.addEventListener("mouseenter", () => {
        video.play();
        thumbnail.style.opacity = "0";
    });

    wrapper.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
        thumbnail.style.opacity = "1";
    });
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const button = form.querySelector("button");
    button.disabled = true;
    button.innerText = "Sending...";

    const formData = new FormData(form);

    await fetch("https://formsubmit.co/ajax/varvind2004@gmail.com", {
        method: "POST",
        body: formData
    });

    button.innerText = "Sent ✓";
    button.classList.remove("bg-signal");
    button.classList.add("bg-emerald-500");

    showNotification("Message sent successfully!");

    setTimeout(() => {
        button.disabled = false;
        button.innerText = "Send Message";
        button.classList.remove("bg-emerald-500");
        button.classList.add("bg-signal");
    }, 5000);
});

function showNotification(message) {
    const div = document.createElement("div");
    div.innerText = message;
    div.className = "fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg z-50";
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 4000);
}