// ========== 1. Typewriter Effect in Header ==========
const typewriterElement = document.getElementById("typewriter");
const roles = ["Front-End Developer", "UI/UX Designer", "Web Creator"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  const currentText = currentRole.substring(0, charIndex);
  typewriterElement.textContent = currentText;

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// ========== 2. Dark/Light Mode Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme() {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '🌕';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌓';
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '🌕' : '🌓';
  document.body.style.transition = 'background-color 0.5s ease, color 0.3s ease';
});

prefersDarkScheme.addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    applyTheme();
  }
});

applyTheme();

// ========== 3. Resume Download Confirmation ==========
const resumeBtn = document.getElementById("resumeBtn");
const resumeMsg = document.getElementById("resumeMessage");
resumeBtn.addEventListener("click", () => {
  resumeMsg.textContent = "✅ تم تحميل السيرة الذاتية.";
  setTimeout(() => {
    resumeMsg.textContent = "";
  }, 4000);
});

// ========== 4. Skills Progress Bars ==========
window.addEventListener("load", () => {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const value = bar.getAttribute("data-value") + "%";
    const fill = bar.querySelector(".fill");
    fill.style.width = value;
  });
});

// ========== 5. Education Timeline Animation ==========
const timelineItems = document.querySelectorAll(".timeline-item");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => observer.observe(item));

// ========== 6. Projects Modal ==========
const projects = [
  {
    title: "موقع تعليمي",
    desc: "موقع تفاعلي لتعليم HTML وCSS للمبتدئين مع اختبارات وتمارين مباشرة.",
    images: ["project1-img1.jpg", "project1-img2.jpg"]
  },
  {
    title: "تطبيق مهام",
    desc: "تطبيق يساعدك على تنظيم مهامك اليومية، مع تنبيهات وتخزين في LocalStorage.",
    images: ["project2-img1.jpg", "project2-img2.jpg"]
  }
];

function openModal(index) {
  const modal = document.getElementById("projectModal");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDesc");
  const carousel = document.getElementById("modalCarousel");

  const project = projects[index];
  title.textContent = project.title;
  desc.textContent = project.desc;
  carousel.innerHTML = "";

  project.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.alt = project.title;
    image.className = "carousel-image";
    carousel.appendChild(image);
  });

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// ========== 7. Testimonials Slider ==========
const testimonials = [
  {
    name: "سارة محمد",
    image: "client1.jpg",
    review: "تجربة رائعة جدًا! عمرو محترف وسريع في تنفيذ العمل.",
    rating: 5
  },
  {
    name: "أحمد خالد",
    image: "client2.jpg",
    review: "مشروع نظيف ومنظم، التواصل ممتاز والتسليم في الموعد.",
    rating: 4
  },
  {
    name: "ليلى يوسف",
    image: "client3.jpg",
    review: "أنصح به بشدة! الجودة والإبداع في التفاصيل كانت رائعة.",
    rating: 5
  }
];

const track = document.getElementById("testimonialTrack");
testimonials.forEach(client => {
  const card = document.createElement("div");
  card.className = "testimonial-card";
  const inner = document.createElement("div");
  inner.className = "testimonial-card-inner";
  inner.innerHTML = `
    <img src="${client.image}" alt="${client.name}">
    <h4>${client.name}</h4>
    <p>"${client.review}"</p>
    <div class="stars">${"★".repeat(client.rating)}${"☆".repeat(5 - client.rating)}</div>
  `;
  card.appendChild(inner);
  track.appendChild(card);
});

let currentIndex = 0;
function slide(dir) {
  const total = testimonials.length;
  currentIndex = (currentIndex + dir + total) % total;
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

// ========== 8. Contact Form Validation + Draft ==========
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const charCount = document.getElementById("charCount");
const form = document.getElementById("contactForm");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

messageInput.addEventListener("input", () => {
  charCount.textContent = `${messageInput.value.length} / 500`;
  saveDraft();
});

nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
messageInput.addEventListener("blur", validateMessage);

function validateName() {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "الاسم مطلوب.";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
}

function validateEmail() {
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "البريد الإلكتروني غير صالح.";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

function validateMessage() {
  if (messageInput.value.trim() === "") {
    messageError.textContent = "الرسالة مطلوبة.";
    return false;
  } else {
    messageError.textContent = "";
    return true;
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const isValid = validateName() & validateEmail() & validateMessage();
  if (isValid) {
    alert("✅ تم إرسال الرسالة بنجاح (محاكاة فقط).");
    form.reset();
    localStorage.removeItem("contactDraft");
    charCount.textContent = "0 / 500";
  }
});

function saveDraft() {
  const draft = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem("contactDraft", JSON.stringify(draft));
}

window.addEventListener("DOMContentLoaded", () => {
  const draft = JSON.parse(localStorage.getItem("contactDraft"));
  if (draft) {
    nameInput.value = draft.name || "";
    emailInput.value = draft.email || "";
    messageInput.value = draft.message || "";
    charCount.textContent = `${messageInput.value.length} / 500`;
  }
});

// ========== 9. Footer Year & Scroll to Top Functionality ==========
document.getElementById("year").textContent = new Date().getFullYear();
const topBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    topBtn.style.display = "flex";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
