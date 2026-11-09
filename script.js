(() => {
  const imageSlots = window.AIN_SALAH_IMAGES || {};
  document.querySelectorAll("[data-image-slot]").forEach(slot => {
    const filename = imageSlots[slot.dataset.imageSlot];
    if (!filename) return;
    const image = document.createElement("img");
    image.className = "site-photo";
    image.alt = slot.dataset.imageAlt || "";
    image.loading = slot.dataset.imageSlot === "hero" ? "eager" : "lazy";
    image.src = "assets/images/" + filename;
    image.onerror = () => image.remove();
    slot.prepend(image);
  });
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // The language control is intentionally a clear placeholder until verified French/English translations are added.
  const languageButton = document.querySelector("#lang-toggle");
  if (languageButton) {
    languageButton.addEventListener("click", () => {
      languageButton.title = "الترجمة الفرنسية قيد الإعداد";
      languageButton.textContent = "AR";
      window.setTimeout(() => { languageButton.textContent = "FR"; }, 1800);
    });
  }
})();