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

document.addEventListener("DOMContentLoaded", () => {
  function typeLine(el, text, speed, callback) {
    el.textContent = "";
    const cursor = document.createElement("span");
    cursor.style.cssText =
      "border-right: 2px solid rgba(255,255,255,0.75); margin-left: 2px; animation: blink-caret 0.7s step-end infinite;";
    el.appendChild(cursor);
    let i = 0;
    const timer = setInterval(() => {
      el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(() => {
          cursor.remove();
          if (callback) callback();
        }, 1000);
      }
    }, speed);
  }

  // Homepage - types two lines then loops
  const line1 = document.querySelector(".type-line-1");
  const line2 = document.querySelector(".type-line-2");

  function loopHero() {
    if (line1 && line2) {
      line1.textContent = "";
      line2.textContent = "";
      typeLine(line1, "Collect, process, analyze and present data.", 40, () => {
        typeLine(line2, "Supporting everyday business decisions.", 40, () => {
          setTimeout(loopHero, 1500);
        });
      });
    }
  }
  loopHero();

  // Category pages - types then loops
  const catDesc = document.querySelector(".category-description");
  if (catDesc) {
    const text = catDesc.textContent.trim();
    catDesc.textContent = "";
    function loopCategory() {
      typeLine(catDesc, text, 40, () => {
        setTimeout(loopCategory, 1500);
      });
    }
    loopCategory();
  }
});
