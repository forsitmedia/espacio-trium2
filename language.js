// language.js — shared script for all pages

document.addEventListener("DOMContentLoaded", () => {
  const langOptions = document.querySelectorAll(".lang-option");
  const elementsToTranslate = document.querySelectorAll("[data-text-pt], [data-text-en]");
  const htmlTag = document.querySelector("html");
  const titleElement = document.querySelector("title");

  // Function to update all texts
  function setLanguage(lang) {
    // Update language attribute
    htmlTag.setAttribute("lang", lang);

    // Update text content of every translatable element
    elementsToTranslate.forEach(el => {
      const key = `data-text-${lang}`;
      if (el.hasAttribute(key)) el.innerHTML = el.getAttribute(key);
    });

    // Update title dynamically
    if (titleElement) {
      const titleKey = `data-text-${lang}`;
      titleElement.textContent = titleElement.getAttribute(titleKey) || titleElement.textContent;
    }

    // Update active language indicator
    langOptions.forEach(option =>
      option.classList.toggle("active", option.dataset.lang === lang)
    );

    // Save to localStorage
    localStorage.setItem("selectedLang", lang);
  }

  // Load saved language (default to Portuguese)
  const savedLang = localStorage.getItem("selectedLang") || "pt";
  setLanguage(savedLang);

  // Add click listeners to language buttons
  langOptions.forEach(option => {
    option.addEventListener("click", () => {
      setLanguage(option.dataset.lang);
    });
  });
});
