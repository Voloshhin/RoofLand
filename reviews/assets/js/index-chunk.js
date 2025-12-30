(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
document.addEventListener("DOMContentLoaded", function() {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }
  burgerBtn.addEventListener("click", toggleMenu);
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
  const servicesGrid = document.querySelector(".services-grid");
  const indicators = document.querySelectorAll(".indicator");
  if (servicesGrid && indicators.length > 0) {
    servicesGrid.addEventListener("scroll", function() {
      const scrollLeft = servicesGrid.scrollLeft;
      const scrollWidth = servicesGrid.scrollWidth;
      const clientWidth = servicesGrid.clientWidth;
      const totalSlides = indicators.length;
      const slideIndex = Math.round(scrollLeft / (scrollWidth - clientWidth) * (totalSlides - 1));
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === slideIndex);
      });
    });
  }
});
const reviewButtons = document.querySelectorAll(".reviews__btn");
reviewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-active");
    const card = button.closest(".reviews__card");
    const text = card.querySelector(".reviews__text");
    text.classList.toggle("is-expanded");
  });
});
const accordionToggle = document.querySelector(".reviews__accordion-mobile .reviews__accordion-toggle");
const accordionDropdown = document.querySelector(".reviews__accordion-dropdown");
const accordionText = document.querySelector(".reviews__accordion-text");
const accordionOptions = document.querySelectorAll(".reviews__accordion-option");
accordionToggle.addEventListener("click", () => {
  const isOpen = accordionDropdown.classList.contains("is-open");
  accordionDropdown.classList.toggle("is-open");
  accordionToggle.setAttribute("aria-expanded", !isOpen);
});
accordionOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const targetTab = option.dataset.tab;
    const selectedText = option.textContent.trim();
    accordionText.textContent = selectedText;
    accordionOptions.forEach((opt) => opt.classList.remove("is-active"));
    option.classList.add("is-active");
    accordionDropdown.classList.remove("is-open");
    accordionToggle.setAttribute("aria-expanded", "false");
    switchTab(targetTab);
  });
});
const desktopToggles = document.querySelectorAll(".reviews__accordion-desktop .reviews__accordion-toggle");
desktopToggles.forEach((toggle2) => {
  toggle2.addEventListener("click", () => {
    const targetTab = toggle2.dataset.tab;
    desktopToggles.forEach((t) => t.classList.remove("is-active"));
    toggle2.classList.add("is-active");
    switchTab(targetTab);
  });
});
function switchTab(targetTab) {
  const panels = document.querySelectorAll(".reviews__panel");
  panels.forEach((panel) => panel.classList.remove("is-active"));
  const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
  if (targetPanel) {
    targetPanel.classList.add("is-active");
  }
}
document.addEventListener("click", (e) => {
  if (!e.target.closest(".reviews__accordion-mobile")) {
    accordionDropdown.classList.remove("is-open");
    accordionToggle.setAttribute("aria-expanded", "false");
  }
});
const desktopTabsBtns = document.querySelectorAll(".reviews__tabs-btn");
const tabPanels = document.querySelectorAll(".reviews__panel");
desktopTabsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.dataset.tab;
    desktopTabsBtns.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    tabPanels.forEach((panel) => panel.classList.remove("is-active"));
    const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
    if (targetPanel) {
      targetPanel.classList.add("is-active");
    }
  });
});
const feedbackBtn = document.querySelector(".reviews__tabs-feedback");
if (feedbackBtn) {
  feedbackBtn.addEventListener("click", () => {
  });
}
const phoneInput = document.querySelector(".footer__input");
phoneInput.addEventListener("input", function(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 0) {
    if (value.substring(0, 3) !== "375") {
      value = "375" + value;
    }
  }
  let formatted = "+375";
  if (value.length > 3) {
    formatted += " (" + value.substring(3, 5);
  }
  if (value.length >= 5) {
    formatted += ") " + value.substring(5, 8);
  }
  if (value.length >= 8) {
    formatted += "-" + value.substring(8, 10);
  }
  if (value.length >= 10) {
    formatted += "-" + value.substring(10, 12);
  }
  e.target.value = formatted;
});
const columnButtons = document.querySelectorAll(".footer__column-btn");
columnButtons.forEach((button) => {
  button.addEventListener("click", function() {
    const column = this.closest(".footer__column");
    column.classList.toggle("is-open");
  });
});
function handleResize() {
  const columns = document.querySelectorAll(".footer__column");
  if (window.innerWidth >= 900) {
    columns.forEach((column) => {
      column.classList.add("is-open");
    });
  } else {
    columns.forEach((column) => {
      column.classList.remove("is-open");
    });
  }
}
handleResize();
window.addEventListener("resize", handleResize);
const toggle = document.querySelector(".phone__toggle");
const dropdown = document.querySelector(".phone__dropdown");
toggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("is-open");
  toggle.classList.toggle("is-active");
  toggle.setAttribute("aria-expanded", dropdown.classList.contains("is-open"));
});
document.addEventListener("click", () => {
  dropdown?.classList.remove("is-open");
  toggle?.classList.remove("is-active");
  toggle?.setAttribute("aria-expanded", "false");
});
//# sourceMappingURL=index-chunk.js.map
