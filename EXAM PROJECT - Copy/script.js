// STORAGE KEY
const STORAGE_KEY = "luxuryUser";

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (savedUser && username === savedUser.username && password === savedUser.password) {
            window.location.href = "portfolio.html";
        } else {
            document.getElementById("loginError").textContent = "Invalid login!";
        }
    });
}

// CREATE ACCOUNT
const createForm = document.getElementById("createForm");
if (createForm) {
    createForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("newUsername").value;
        const password = document.getElementById("newPassword").value;

        localStorage.setItem(STORAGE_KEY, JSON.stringify({username, password}));
        alert("Account Created Successfully!");
        location.reload();
    });
}

// CHANGE PASSWORD
const changeForm = document.getElementById("changeForm");
if (changeForm) {
    changeForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("changeUsername").value;
        const oldPass = document.getElementById("oldPassword").value;
        const newPass = document.getElementById("newPasswordChange").value;

        const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (savedUser && username === savedUser.username && oldPass === savedUser.password) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({username, password:newPass}));
            alert("Password Changed Successfully!");
            location.reload();
        } else {
            document.getElementById("changeError").textContent = "Incorrect credentials!";
        }
    });
}

// SHOW FORMS
function showCreate() {
    document.getElementById("createForm").classList.toggle("hidden");
}
function showChange() {
    document.getElementById("changeForm").classList.toggle("hidden");
}

// NAV TOGGLE
function toggleMenu(icon) {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
    icon.classList.toggle("open");
}

// AUTO CLOSE MENU PAG MAY PININDOT
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("active");
        document.querySelector(".hamburger").classList.remove("open");
    });
});
// LOGOUT
function logout() {
    window.location.href = "index.html";
}

// SCROLL REVEAL
window.addEventListener("scroll", function() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});

// PROFILE UPLOAD
const uploadInput = document.getElementById("profileUpload");
const preview = document.getElementById("profilePreview");

if (uploadInput) {
    // Load saved image
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        preview.src = savedImage;
    }

    uploadInput.addEventListener("change", function() {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            localStorage.setItem("profileImage", reader.result);
            preview.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

// TYPING EFFECT
const words = ["Web Developer", "Computer Science"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1000);
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

if (typingElement) {
    typeEffect();
}

const aboutSection = document.querySelector("#about");
const aboutElement = document.querySelector("#about .typings");

if (aboutSection && aboutElement) {

    const aboutText = " year student pursuing a Bachelor of Science in Computer Science at Illana Bay Integrated Computer College Inc. I enjoy learning new programming languages. I am motivated to learn more about programming, software development, and the world of technology. This portfolio showcases my journey, projects, and skills as I grow in the field of Computer Science.";

    let typingTimeout;
    let isTyping = false;

    function startTyping() {
        if (isTyping) return; // para di mag doble

        isTyping = true;
        let index = 0;
        aboutElement.textContent = "";

        function type() {
            if (index < aboutText.length) {
                aboutElement.textContent += aboutText.charAt(index);
                index++;
                typingTimeout = setTimeout(type, 70);
            } else {
                isTyping = false;
            }
        }

        type();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clearTimeout(typingTimeout);
                aboutElement.textContent = ""; // reset agad
                isTyping = false;
                startTyping();
            }
        });
    }, {
        threshold: 0.3 // mas responsive trigger
    });

    observer.observe(aboutSection);
}


                // ===== SKILS =====
/* ========= SKILLS ANIMATION ONLY ========= */

function animateSkills() {

    const skillsSection = document.getElementById("skills");

    if (!skillsSection) return;

    /* ---------- RESET EVERYTHING ---------- */

    // Reset technical bars
    const bars = skillsSection.querySelectorAll(".bar span");
    const percents = skillsSection.querySelectorAll(".percent");

    bars.forEach(bar => {
        bar.style.width = "0%";
    });

    percents.forEach(percent => {
        percent.textContent = "0%";
    });

    // Reset professional circles
    const circles = skillsSection.querySelectorAll(".circle");

    circles.forEach(circle => {
        const outer = circle.querySelector(".outer");
        const text = circle.querySelector(".circle-percent");

        outer.style.background = "#1e2f47";
        text.textContent = "0%";
    });

    /* ---------- START ANIMATION AFTER RESET ---------- */
    setTimeout(() => {

        /* ===== TECHNICAL SKILLS ===== */
        bars.forEach(bar => {

            const targetWidth = parseInt(bar.getAttribute("data-width"));
            const percentText = bar
                .closest(".skill-box")
                .querySelector(".percent");

            let current = 0;

            const interval = setInterval(() => {
                if (current >= targetWidth) {
                    clearInterval(interval);
                } else {
                    current++;
                    bar.style.width = current + "%";
                    percentText.textContent = current + "%";
                }
            }, 15);

        });

        /* ===== PROFESSIONAL SKILLS ===== */
        circles.forEach(circle => {

            const target = parseInt(circle.getAttribute("data-progress"));
            const outer = circle.querySelector(".outer");
            const text = circle.querySelector(".circle-percent");

            let current = 0;

            const interval = setInterval(() => {
                if (current >= target) {
                    clearInterval(interval);
                } else {
                    current++;
                    text.textContent = current + "%";

                    outer.style.background =
                        `conic-gradient(#4fc3f7 ${current * 3.6}deg, #1e2f47 0deg)`;
                }
            }, 15);

        });

    }, 200);
}