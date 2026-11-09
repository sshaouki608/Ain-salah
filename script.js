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
    image.onerror = () => {
      if (!image.dataset.fallbackTried) {
        image.dataset.fallbackTried = "1";
        const fileName = decodeURIComponent(String(filename).split("/").pop());
        image.src = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(fileName);
      } else image.remove();
    };
    slot.prepend(image);
  });

  const editorialPhotos = document.querySelectorAll(".editorial-photo");
  if ("IntersectionObserver" in window) {
    const photoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          photoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    editorialPhotos.forEach(photo => photoObserver.observe(photo));
  } else {
    editorialPhotos.forEach(photo => photo.classList.add("in-view"));
  }

  const translations = [
    [".skip-link", "Skip to content"],
    [".brand strong", "In Salah"],
    [".brand small", "Gateway to the Algerian Sahara"],
    [".main-nav a", ["About", "History", "Heritage", "Caravans", "Gallery", "Nature", "Desert region", "Municipalities", "Visitor guide"]],
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
    [".story-section .section-kicker", "03 / MEMORY & HERITAGE"],
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
    [".nature-copy .section-kicker", "07 / NATURE & GEOGRAPHY"],
    [".nature-copy h2", "Beauty shaped by<br><em>simplicity and space</em>"],
    [".nature-copy p", "The desert environment shapes the character of the region and the rhythm of life. This section highlights landscapes, oases, night skies and biodiversity, while avoiding sensitive locations or unverified claims."],
    [".nature-copy .under-link", "Plan your discovery <span>↙</span>"],
    [".regional-context .section-kicker", "08 / THE SAHARAN REGION"],
    [".regional-context .section-heading h2", "In Salah in the <em>Tidikelt region</em>"],
    [".regional-context .section-heading > p", "Understanding this place means looking at its relationship with nearby oases, natural landscapes and the routes that connected Saharan settlements."],
    [".regional-card h3", ["Location and geography", "The foggara: a water legacy", "Environment and natural heritage"]],
    [".regional-card p", [
      "In Salah is associated with the Saharan region known as Tidikelt, near the Tadmaït Plateau. This setting has helped shape settlement patterns, movement and connections between oases.",
      "A scientific study published in 2013 documents foggaras in the In Salah region. This traditional technique brings groundwater to the surface and distributes irrigation shares among garden owners through a carefully organised system.",
      "The Ahaggar Cultural Park extends across several southern provinces, including In Salah. This area combines natural value with cultural and historical heritage that deserves documentation and protection."
    ]],
    [".regional-sources strong", "For further reading:"],
    [".regional-sources a", ["Foggara systems in In Salah — Larhyss Journal, 2013 ↗", "Ministry of Environment and Quality of Life ↗", "Geographical overview of Algeria — Algerian Embassy ↗"]],
    [".municipalities .section-kicker", "10 / ADMINISTRATIVE DIVISIONS"],
    [".municipalities .section-heading h2", "Three municipalities,<br><em>one shared region</em>"],
    [".municipalities .section-heading > p", "In Salah Province comprises three municipalities under the current administrative division."],
    [".municipality h3", ["In Salah", "In Ghar", "Foggaret Ezzoua"]],
    [".municipality p", ["Provincial capital", "A municipality in the province", "A municipality in the province"]],
    [".timeline-section .section-kicker", "11 / ADMINISTRATIVE MILESTONES"],
    [".timeline-section h2", "A region with <em>its own place</em>"],
    [".timeline-item h3", ["Establishment of In Salah Province", "Definition of the municipalities"]],
    [".timeline-item p", [
      "In Salah was included among the newly established provinces in the 2021 administrative reorganisation and was assigned the number 53.",
      "The province’s administrative division includes the municipalities of In Salah, In Ghar and Foggaret Ezzoua."
    ]],
    [".timeline-item small", ["Reference: Presidential Decree No. 21-117.", "Reference: Executive Decree No. 21-128."]],
    [".visit-section .section-kicker", "12 / VISITOR GUIDE"],
    [".visit-panel h2", "Discover it<br><em>with respect for the place</em>"],
    [".visit-panel p", "Before planning a visit, check road conditions, weather and local services. Seek local guidance when needed. This introductory guide does not replace official advice."],
    [".visit-panel .button", "Open the map <span>↗</span>"],
    [".map-frame span", "OpenStreetMap · Open map data"],
    [".contribute .section-kicker", "13 / COMMUNITY MEMORY"],
    [".contribute h2", "Do you have a photo or story<br><em>from In Salah?</em>"],
    [".contribute-text p", "We aim to build a visual and cultural archive that preserves the memory of this place. Contributions are reviewed and information is checked before publication."],
    [".contribute .button", "Suggest a contribution <span>↗</span>"],
    [".contact-note", "The only contact channel on this website will be WhatsApp. The link will be enabled once a number dedicated to public contact is confirmed."],
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


    [".history-section .section-kicker","02 / ROOTS OF THE REGION"],
    [".history-section .section-heading h2","From ancient human traces<br><em>to the caravan town</em>"],
    [".history-section .section-heading > p","Tidikelt’s history is not a single date, but layers of settlement, oases, architecture and Saharan trade."],
    [".history-intro p","An academic study published in 2025 on the eastern Tidikelt ksour states that people inhabited this region in prehistoric times, based on cultural remains found there. Its abstract does not identify the precise sites or dates, so this is presented as a research lead requiring further archaeological documentation."],
    [".history-card h3",["Prehistory","Medieval exchange routes","A nineteenth-century trade centre"]],
    [".history-card > span",["Early roots","Middle Ages","Nineteenth century"]],
    [".history-card p",["Cultural remains in Tidikelt open an important field of research into early human presence in the Sahara. Specialist surveys are needed to document sites and establish their age and context.","Caravan movement between the Sahara and the Sahel helped settlement and exchange. Travellers also carried architectural knowledge and techniques adapted to local materials and desert conditions.","A historical study describes In Salah as the capital of Tidikelt and a meeting point for merchants, commercial caravans and pilgrimage routes from different directions."]],
    [".history-note","<strong>Historical note:</strong> We do not attribute Roman remains, ancient kingdoms or specific foundation dates to In Salah without archaeological evidence or a published source. <a href=\"https://asjp.cerist.dz/en/article/270922\" target=\"_blank\" rel=\"noopener\">Read the 2025 study of eastern Tidikelt ksour and building materials ↗</a>"],
    [".caravan-section .section-kicker","03 / DESERT ROUTES"],
    [".caravan-section .section-heading h2","When caravans were<br><em>the arteries of life</em>"],
    [".caravan-section .section-heading > p","In Salah’s Saharan location made it a meeting point between Maghrebi markets, oases, the Hoggar and the Sahel."],
    [".caravan-copy h3","A station between north and south"],
    [".caravan-copy p",["According to an academic study published in the journal Aasour Al Jadida in 2020, In Salah held an important commercial position in Tidikelt during the nineteenth century and served as a meeting point for trade and pilgrimage caravans.","The study describes a Ghadames–In Salah route taking about 22 days, a route from Algiers to In Salah taking about 23 days, and a journey from In Salah to Timbuktu lasting between 20 and 30 days. These are historical estimates, not modern travel times.","Caravans carried varied goods, including gold, textiles, household utensils and local products. Dates were among the important resources of the oases, used at home as well as for trade and sale."]],
    [".route-facts span",["Ghadames → In Salah, according to the study","Algiers → In Salah, according to the study","In Salah → Timbuktu, according to the study"]],
    [".archive-1913 .section-kicker","HISTORICAL ARCHIVE / 1913"],
    [".archive-1913 .section-heading h2","In Salah more than a century ago<br><em>through the camera lens</em>"],
    [".archive-1913 .section-heading > p","Verified historical photographs of In Salah from 1900 and 1913, alongside images of local landmarks taken in 2011."],
    [".archive-photo figcaption strong",["A market scene","Village centre","Harvest in the gardens","Preparing garden land","An oasis garden","The old water tower","The old barracks building","The old barracks gate"]],
    [".archive-photo figcaption span",["In Salah · 1 March 1900","In Salah · 1913","The oasis · 1913","Agricultural work · 1913","In Salah · 1913","Documentary photograph · 2011","Documentary photograph · 2011","In Salah · 10 October 2011"]],
    [".archive-credit","The market photograph dated 1 March 1900 is sourced from the French Overseas Archives (ANOM), author unknown, and marked public domain. The 1913 photographs are from the Bibliothèque nationale de France, Société de Géographie department, public domain with attribution. The 2011 photographs were taken by le mehariste under CC BY 3.0."],
    [".foggara-section .section-kicker","05 / WATER ENGINEERING & COMMUNITY"],
    [".foggara-section .section-heading h2","The foggara…<br><em>desert ingenuity</em>"],
    [".foggara-section .section-heading > p","The foggara is more than a water channel: it is precise engineering and a social and economic system for managing and sharing a vital resource."],
    [".foggara-panel h3",["How does it work?","Who is the water measurer?","Rules of fairness and sharing"]],
    [".foggara-panel p",["Underground channels are dug to collect groundwater and carry it by natural gradient towards oases and gardens, reducing the need for continuous mechanical pumping. A study of In Salah foggaras describes channels dug along the southern edge of the Tadmaït Plateau to capture water from the Continental Intercalary aquifer.","The water measurer holds specialist knowledge for calculating and distributing water shares and maintaining distribution tools and irrigation channels. The role forms part of a wider system involving rights holders, workers, witnesses and local experts.","Water shares are calculated and distributed under established rules, and rights are recorded to reduce disputes and ensure water reaches gardens. A study of the Irsan foggara in In Ghar describes a local organisation for measuring and distributing water that dates back many centuries."]],
    [".unesco-note>div span","International recognition"],
    [".unesco-note>div strong","2018 · UNESCO"],
    [".unesco-note p","UNESCO inscribed the knowledge and skills of foggara water measurers in Touat and Tidikelt on its List of Intangible Cultural Heritage in Need of Urgent Safeguarding. Its file notes that this knowledge is threatened by declining practice and weaker transmission between generations."],
    [".unesco-note a","Read the official UNESCO file ↗"],
    [".foggara-section .regional-sources strong","Specialist studies:"],
    [".foggara-section .regional-sources a",["The foggaras of In Salah: forgotten heritage, 2013 ↗","Water sharing in the Irsan foggara, In Ghar, 2019 ↗","The craft of the water measurer in eastern Tidikelt, 2024 ↗"]]


    [".editorial-gallery-heading span",["Visual memory","Living heritage","People and markets","Landscapes","The local region","Water memory"]],
    [".editorial-gallery-heading strong",["From 1900 to 1913","Oasis, work and water","From the old market to today","Desert and oasis","Village and oasis","From foggara to garden"]],
    [".editorial-photo figcaption strong",["The market at the turn of the twentieth century","The heart of the old village","Harvest in the oasis gardens","A garden in In Salah oasis","Palm groves","Water and its distribution","The market as a meeting point","The market in contemporary memory","Dunes and desert landscape","The oasis in the desert region","Village centre in 1913","The old water tower","Organised water distribution","Water sustains the gardens"]],
    [".editorial-photo figcaption span",["1 March 1900 · Archival image from the French Overseas Archives collection","1913 · A photographic record of central In Salah","1913 · A scene of agricultural activity in the oasis","1913 · Photograph from the French archival collection","A photograph of the oasis · Xeiswolf","Field documentation of the water distribution system · Xeiswolf","1900 · Historical image connected with the memory of trade in In Salah","Photograph from In Salah · Xeiswolf","Documented desert landscapes near In Salah · Xeiswolf","Palm groves and agriculture in the local landscape · Xeiswolf","Architectural scene from the Bibliothèque nationale de France collection","Documentary photograph taken in 2011 · le mehariste","Documentary scene from In Salah · Xeiswolf","Oasis garden in an archival photograph · 1913"]],
    [".editorial-photo figcaption a",["Image source and details ↗","Bibliothèque nationale de France collection ↗","Bibliothèque nationale de France collection ↗","View the original collection ↗","Source and licence ↗","Source and licence ↗","Image source ↗","Source and licence ↗","Source and licence ↗","Source and licence ↗","Archival collection ↗","Source and licence ↗","Source and licence ↗","Archival collection ↗"]],

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

  document.documentElement.classList.add("js-enabled");
})();