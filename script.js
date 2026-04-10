// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navFooter = document.querySelector(".nav-footer");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navFooter.classList.toggle("active");

    // Animate hamburger
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = navMenu.classList.contains("active")
      ? "rotate(45deg) translateY(10px)"
      : "none";
    spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
    spans[2].style.transform = navMenu.classList.contains("active")
      ? "rotate(-45deg) translateY(-10px)"
      : "none";
  });

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-menu a, .nav-footer a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navFooter.classList.remove("active");
      hamburger.querySelectorAll("span").forEach((span) => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Add fade-in animation to cards
document
  .querySelectorAll(".project-card, .testimonial-card, .marketing-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
