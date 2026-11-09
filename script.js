(() => {
  const imageSlots = window.AIN_SALAH_IMAGES || {};
  document.querySelectorAll("[data-image-slot]").forEach(slot => {
    const filename = imageSlots[slot.dataset.imageSlot];
    if (!filename) return;
    const image = document.createElement("img");
    image.className = "site-photo";
    image.alt = slot.dataset.imageAlt || "";
    image.loading = slot.dataset.imageSlot === "hero" ? "eager" : "lazy";
    image.src = /^https?:\/\//i.test(filename) ? filename : "assets/images/" + filename;
    image.onerror = () => image.remove();
    slot.prepend(image);
  });

  const translations = [
    [".skip-link", "Skip to content"],
    [".brand strong", "In Salah"],
    [".brand small", "Gateway to the Algerian Sahara"],
    [".main-nav a", ["About", "Heritage", "Gallery", "Nature", "Municipalities", "Visitor guide"]],
    [".header-cta", "Explore In Salah <span>↗</span>"],
    [".hero .eyebrow", "<span></span> Southern Algeria · The Sahara"],
    [".hero h1", "In Salah<br><em>A story told by the desert</em>"],
    [".hero-lead", "A land of oases, historic settlements and Saharan memory. Discover its place, history, culture and everyday life."],
    [".hero-buttons .button-primary", "Begin the journey <span>←</span>"],
    [".hero-buttons .text-link", "Discover the story <span>↓</span>"],
    [".hero-side-note span", ["Approximately 27° North", "The heart of the Algerian Sahara"]],
    [".hero-bottom span", ["In Salah Province · Algeria", "Discover the region from a new perspective"]],
    [".intro .section-kicker", "01 / PLACE & IDENTITY"],
    [".intro-heading h2", "More than a point<br><em>on the map.</em>"],
    [".intro-copy .large-copy", "In Salah is a Saharan landscape where geography meets memory: oases, local architecture and routes shaped by movement, trade and connections across the desert."],
    [".intro-copy p:nth-of-type(2)", "This independent portal introduces the province through its culture and tourism. It aims to distinguish verified information from local accounts and add references whenever available."],
    [".intro-copy .under-link", "A glimpse of the region <span>↙</span>"],
    [".fact-strip span", ["Province code", "Municipalities", "Country", "Geographical setting"]],
    [".story-section .section-kicker", "02 / MEMORY & HERITAGE"],
    [".story-section .section-heading h2", "Layers of <em>stories</em>"],
    [".story-section .section-heading > p", "Heritage is more than old buildings. It includes people’s memories, ways of life, language, crafts and traditions passed down through generations."],
    [".heritage-card .art-label", ["Local architecture", "The oasis", "Everyday life"]],
    [".heritage-card .card-index", ["01 — PLACE", "02 — LAND", "03 — PEOPLE"]],
    [".heritage-card .card-text h3", ["Historic settlements & Saharan architecture", "Oases and the foggara water system", "Crafts and traditions"]],
    [".heritage-card .card-text p", [
      "Explore traditional settlement patterns, local building materials and how architecture adapts to the Saharan climate. Site-specific studies and documented photographs will be added as they become available.",
      "Water and agriculture are central to oasis life. This section will explain and document traditional irrigation systems, including local foggaras.",
      "A space to document crafts, clothing, songs, celebrations and oral history with the participation of local residents."
    ]],
    [".photo-archive .section-kicker", "VISUAL ARCHIVE / DOCUMENTED PHOTOGRAPHS"],
    [".photo-archive .section-heading h2", "In Salah <em>in photographs</em>"],
    [".photo-archive .section-heading > p", "Authentic photographs from the town and its everyday memory, with creator credits and reuse licences."],
    [".photo-card figcaption strong", ["The town gate — 1991", "At the local market", "Water distribution"]],
    [".photo-card figcaption span", ["Archival photograph · Albert Backer", "In Salah · 2014 · Xeiswolf", "Water system scene · 2014 · Xeiswolf"]],
    [".nature-caption", "The desert is not empty; it is a world of its own."],
    [".nature-copy .section-kicker", "03 / NATURE & GEOGRAPHY"],
    [".nature-copy h2", "Beauty shaped by<br><em>simplicity and space</em>"],
    [".nature-copy p", "The desert environment shapes the character of the region and the rhythm of life. This section highlights landscapes, oases, night skies and biodiversity, while avoiding sensitive locations or unverified claims."],
    [".nature-copy .under-link", "Plan your discovery <span>↙</span>"],
    [".municipalities .section-kicker", "04 / ADMINISTRATIVE DIVISIONS"],
    [".municipalities .section-heading h2", "Three municipalities,<br><em>one shared region</em>"],
    [".municipalities .section-heading > p", "In Salah Province comprises three municipalities under the current administrative division."],
    [".municipality h3", ["In Salah", "In Ghar", "Foggaret Ezzoua"]],
    [".municipality p", ["Provincial capital", "A municipality in the province", "A municipality in the province"]],
    [".timeline-section .section-kicker", "05 / ADMINISTRATIVE MILESTONES"],
    [".timeline-section h2", "A region with <em>its own place</em>"],
    [".timeline-item h3", ["Establishment of In Salah Province", "Definition of the municipalities"]],
    [".timeline-item p", [
      "In Salah was included among the newly established provinces in the 2021 administrative reorganisation and was assigned the number 53.",
      "The province’s administrative division includes the municipalities of In Salah, In Ghar and Foggaret Ezzoua."
    ]],
    [".timeline-item small", ["Reference: Presidential Decree No. 21-117.", "Reference: Executive Decree No. 21-128."]],
    [".visit-section .section-kicker", "06 / VISITOR GUIDE"],
    [".visit-panel h2", "Discover it<br><em>with respect for the place</em>"],
    [".visit-panel p", "Before planning a visit, check road conditions, weather and local services. Seek local guidance when needed. This introductory guide does not replace official advice."],
    [".visit-panel .button", "Open the map <span>↗</span>"],
    [".map-frame span", "OpenStreetMap · Open map data"],
    [".contribute .section-kicker", "07 / COMMUNITY MEMORY"],
    [".contribute h2", "Do you have a photo or story<br><em>from In Salah?</em>"],
    [".contribute-text p", "We aim to build a visual and cultural archive that preserves the memory of this place. Contributions are reviewed and information is checked before publication."],
    [".contribute .button", "Suggest a contribution <span>↗</span>"],
    [".contact-note", "Note: The contact email is a placeholder and must be replaced with a valid address before launch."],
    [".footer-brand strong", "In Salah"],
    [".footer-brand small", "Gateway to the Algerian Sahara"],
    [".footer-top > p", "An independent initiative introducing the region, its memory and its culture."],
    [".back-top", "Back to top ↑"],
    [".footer-bottom > span:first-child", "© <span id=\"year\">2026</span> In Salah Portal"],
    [".footer-bottom > span:nth-child(2)", "Not an official government website"],
    [".footer-bottom a", "Sources & notes"],
    [".sources > strong", "Sources and verification"],
    [".sources > p", "Administrative information: Presidential Decree No. 21-117 and Executive Decree No. 21-128. Links to the Official Gazette and relevant authorities should be added, and other historical and cultural information should be locally reviewed before final publication."],
    [".sources > a:nth-of-type(1)", "Algerian Official Gazette ↗"],
    [".sources > a:nth-of-type(2)", "Ministry of Culture and Arts ↗"],
    [".photo-credits > strong", "Photo sources and licences"],
    [".photo-credits li", [
      "<a href=\"https://commons.wikimedia.org/wiki/File:In_Salah_%D8%B9%D9%8A%D9%86_%D8%B5%D8%A7%D9%84%D8%AD.jpg\" target=\"_blank\" rel=\"noopener\">In Salah عين صالح.jpg</a> — Habib Kaki, 2017, CC0 1.0.",
      "<a href=\"https://commons.wikimedia.org/wiki/File:In_Salah_Palmerie.jpg\" target=\"_blank\" rel=\"noopener\">In Salah Palmerie.jpg</a> — Xeiswolf, CC BY-SA 4.0.",
      "<a href=\"https://commons.wikimedia.org/wiki/File:In_Salah_D%C3%BCne.jpg\" target=\"_blank\" rel=\"noopener\">In Salah Düne.jpg</a> — Xeiswolf, CC BY-SA 4.0."
    ]],
    [".photo-credits > p", "Images are used under their respective licence terms. CC BY-SA images require creator attribution, a licence link and an indication of changes, if any."]
  ];

  const originalContent = new Map();
  const applyLanguage = english => {
    translations.forEach(([selector, value]) => {
      const nodes = document.querySelectorAll(selector);
      nodes.forEach((node, index) => {
        if (!originalContent.has(node)) originalContent.set(node, node.innerHTML);
        if (!english) {
          node.innerHTML = originalContent.get(node);
          return;
        }
        const translated = Array.isArray(value) ? value[index] : (index === 0 ? value : undefined);
        if (translated !== undefined) node.innerHTML = translated;
      });
    });
    document.documentElement.lang = english ? "en" : "ar";
    document.documentElement.dir = english ? "ltr" : "rtl";
    document.title = english ? "In Salah | Gateway to the Algerian Sahara" : "عين صالح | بوابة الصحراء الجزائرية";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = english
      ? "An independent guide to In Salah Province in southern Algeria: its history, heritage, landscapes, municipalities and culture."
      : "بوابة تعريفية مستقلة بولاية عين صالح في جنوب الجزائر: تاريخها، تراثها، طبيعتها، بلدياتها، وثقافتها.";
    const languageButton = document.querySelector("#lang-toggle");
    if (languageButton) {
      languageButton.textContent = english ? "AR" : "EN";
      languageButton.setAttribute("aria-label", english ? "التبديل إلى العربية" : "Switch to English");
    }
    const menuButton = document.querySelector(".menu-toggle");
    if (menuButton) menuButton.setAttribute("aria-label", english ? "Open menu" : "فتح القائمة");
  };

  let isEnglish = false;
  const languageButton = document.querySelector("#lang-toggle");
  if (languageButton) {
    languageButton.addEventListener("click", () => {
      isEnglish = !isEnglish;
      applyLanguage(isEnglish);
    });
  }

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? (isEnglish ? "Close menu" : "إغلاق القائمة") : (isEnglish ? "Open menu" : "فتح القائمة"));
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
})();