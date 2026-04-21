document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const body = document.body;

  // Standard splash screen timing
  const minSplashTime = 2800; // 2.8 seconds to allow animation to complete
  const startTime = Date.now();

  window.addEventListener("load", () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const remainingTime = Math.max(0, minSplashTime - elapsedTime);

    setTimeout(() => {
      splash.classList.add("hidden");
      // Allow scrolling after splash is gone
      setTimeout(() => {
        splash.style.display = "none";
      }, 800); // Wait for transition
    }, remainingTime);
  });

  // Fallback if window load takes too long
  setTimeout(() => {
    if (!splash.classList.contains("hidden")) {
      splash.classList.add("hidden");
      setTimeout(() => {
        splash.style.display = "none";
      }, 800);
    }
  }, 6000);

  // Fade in effect for hero elements
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(20px)";
    heroContent.style.transition = "all 1s ease-out";

    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 3200); // Show after splash
  }

  // Contract Address Copy Logic (Multi-instance)
  const setupCopyButton = (
    btnSelector,
    inputSelector,
    successSelector = null
  ) => {
    const copyBtns = document.querySelectorAll(btnSelector);

    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Find nearest input or specific input
        const container =
          btn.closest(".hero-ca") ||
          btn.closest(".contract-copy-box") ||
          btn.parentElement;
        const caInput = container.querySelector(inputSelector);
        if (!caInput) return;

        const caValue =
          caInput.value || caInput.innerText || caInput.textContent;

        navigator.clipboard
          .writeText(caValue)
          .then(() => {
            // Feedback UI for button with text
            const btnSpan = btn.querySelector("span");
            if (btnSpan) {
              const originalText = btnSpan.innerText;
              btnSpan.innerText = "COPIED!";
              setTimeout(() => (btnSpan.innerText = originalText), 2500);
            }

            // Tooltip feedback
            const tooltip =
              container.querySelector(".copy-tooltip") ||
              document.getElementById("copy-success");
            if (tooltip) {
              tooltip.style.display = "block";
              tooltip.classList.add("show");
              setTimeout(() => {
                tooltip.style.display = "none";
                tooltip.classList.remove("show");
              }, 2500);
            }
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      });
    });
  };

  setupCopyButton(".copy-ca-btn", ".ca-value");
  setupCopyButton("#copy-btn", "#contract-address");

  // Meme Gallery Scroll Reveal Animation
  const revealMemes = () => {
    const memes = document.querySelectorAll(".meme-item.reveal");
    const triggerBottom = (window.innerHeight / 5) * 4;

    memes.forEach((meme) => {
      const memeTop = meme.getBoundingClientRect().top;

      if (memeTop < triggerBottom) {
        meme.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealMemes);
  revealMemes(); // Initial check

  // Hero Typewriter Animation
  const heroTitleText = "ALEN";
  const heroTitleElement = document.getElementById("hero-title");

  if (heroTitleElement) {
    const typeWriter = (text, i, fnCallback) => {
      if (i < text.length) {
        // Check if we are starting an HTML tag
        if (text[i] === "<") {
          const closingBracket = text.indexOf(">", i);
          if (closingBracket !== -1) {
            heroTitleElement.innerHTML = text.substring(0, closingBracket + 1);
            typeWriter(text, closingBracket + 1, fnCallback);
            return;
          }
        }

        heroTitleElement.innerHTML = text.substring(0, i + 1);
        setTimeout(() => {
          typeWriter(text, i + 1, fnCallback);
        }, 100);
      } else if (typeof fnCallback == "function") {
        setTimeout(fnCallback, 700);
      }
    };

    // Start typewriter after splash screen is dismissed
    setTimeout(() => {
      typeWriter(heroTitleText, 0);
    }, 3500);
  }

  // Dynamic Particle Generation
  const createParticles = () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    hero.appendChild(particlesContainer);

    const spawnParticle = (type) => {
      const particle = document.createElement("div");
      particle.className = type;
      if (type === "star") {
        particle.innerHTML = "★";
        particle.style.color = "#ffffff";
        particle.style.fontSize = `${Math.random() * 10 + 10}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
      }

      const size =
        type === "particle" ? Math.random() * 15 + 5 : Math.random() * 20 + 20;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      particle.style.left = `${left}%`;
      particle.style.width = `${size}px`;
      if (type === "particle") particle.style.height = `${size}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `-${delay}s`;

      particlesContainer.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
        spawnParticle(type); // Respawn
      }, duration * 1000);
    };

    // Initial spawn
    for (let i = 0; i < 20; i++) spawnParticle("particle");
    for (let i = 0; i < 10; i++) spawnParticle("star");
  };

  createParticles();

  // Section reveal on scroll
  const sectionReveal = () => {
    const sections = document.querySelectorAll("section");
    const triggerBottom = (window.innerHeight / 5) * 4;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  };

  // Initialize section styles for reveal
  document.querySelectorAll("section:not(.hero)").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 1s ease-out";
  });

  window.addEventListener("scroll", sectionReveal);
  sectionReveal();
});
