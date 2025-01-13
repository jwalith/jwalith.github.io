// script.js

// Smooth Scrolling for Navigation Links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});

// Dynamic Typing Effect in Hero Section
// const typedTextSpan = document.createElement("span");
// typedTextSpan.className = "typed-text";
// const heroHeading = document.querySelector(".hero-content h1");
// heroHeading.appendChild(typedTextSpan);

// const texts = ["Data Scientist", "Software Engineer", "Tech Enthusiast"];
// let textIndex = 0;
// let charIndex = 0;

// function typeText() {
//   if (charIndex < texts[textIndex].length) {
//     typedTextSpan.textContent += texts[textIndex].charAt(charIndex);
//     charIndex++;
//     setTimeout(typeText, 150);
//   } else {
//     setTimeout(eraseText, 2000);
//   }
// }

// function eraseText() {
//   if (charIndex > 0) {
//     typedTextSpan.textContent = texts[textIndex].substring(0, charIndex - 1);
//     charIndex--;
//     setTimeout(eraseText, 100);
//   } else {
//     textIndex = (textIndex + 1) % texts.length;
//     setTimeout(typeText, 500);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   typeText();
// });

// Scroll-to-top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-to-top-btn";
scrollTopBtn.innerHTML = "↑";
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
