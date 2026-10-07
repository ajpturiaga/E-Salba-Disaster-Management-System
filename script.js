/* =====================================================
   E-SALBA DISASTER MANAGEMENT SYSTEM
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MOBILE MENU
    ================================================= */
    const menuToggle = document.getElementById("menuToggle") || document.getElementById("menu-toggle") || document.querySelector(".menu-toggle");
    const navMenu = document.getElementById("navMenu") || document.getElementById("nav-menu") || document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle("show");
            menuToggle.classList.toggle("active");

            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("show")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close navigation dropdown when clicking anywhere outside
        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("show");
                menuToggle.classList.remove("active");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }


    /* =================================================
       PASSWORD SHOW / HIDE
    ================================================= */
    const passwordButtons = document.querySelectorAll(".password-toggle");

    passwordButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const input = document.getElementById(targetId);
            const icon = button.querySelector("i");

            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });
    });


    /* =================================================
       FAQ ACCORDION
    ================================================= */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const currentItem = question.closest(".faq-item");

            document.querySelectorAll(".faq-item").forEach(function (item) {
                if (item !== currentItem) {
                    item.classList.remove("open");
                }
            });

            currentItem.classList.toggle("open");
        });
    });


    /* =================================================
       CONTACT FORM
    ================================================= */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            showToast("Message sent successfully!");
            contactForm.reset();
        });
    }


    /* =================================================
       EMERGENCY FORM
    ================================================= */
    const emergencyForm = document.getElementById("emergencyForm");

    if (emergencyForm) {
        emergencyForm.addEventListener("submit", function (event) {
            event.preventDefault();
            showToast("Emergency request submitted successfully!");
            emergencyForm.reset();
        });
    }


    /* =================================================
       LOGIN FORM
    ================================================= */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            showToast("Login successful! Demo mode activated.");

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1500);
        });
    }


    /* =================================================
       REGISTER FORM
    ================================================= */
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const password = document.getElementById("registerPassword");
            const confirmPassword = document.getElementById("confirmPassword");

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                showToast("Passwords do not match.");
                confirmPassword.focus();
                return;
            }

            showToast("Account created successfully!");
            registerForm.reset();

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);
        });
    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    /* =================================================
       SCROLL REVEAL
    ================================================= */
    const revealElements = document.querySelectorAll(".feature-card, .value-card, .role-card, .step");

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    revealElements.forEach(function (element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(element);
    });

});


/* =====================================================
   TOAST NOTIFICATION
===================================================== */
function showToast(message) {
    let toast = document.querySelector(".toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";

        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span></span>
        `;

        document.body.appendChild(toast);
    }

    const text = toast.querySelector("span");
    text.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}