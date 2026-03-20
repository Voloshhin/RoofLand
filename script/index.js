document.addEventListener("DOMContentLoaded", () => {
  const headerToggel = document.querySelector("#header__phone");
  const arrowDown = document.querySelector("#arrow__down");
  const headerModal = document.querySelector("#header__modal");
  const modal = document.querySelector("#modal__overlay");
  const burgerBut = document.querySelector("#burger__but");
  const body = document.body;

  /* ---------- HEADER MODAL ---------- */
  if (headerToggel && modal && arrowDown && headerModal) {
    headerToggel.addEventListener("click", () => {
      modal.style.display = "block";
      arrowDown.style.transform = "rotate(180deg)";
      headerModal.classList.add("header__modal__active");
    });

    modal.addEventListener("click", () => {
      modal.style.display = "none";
      arrowDown.style.transform = "rotate(0deg)";
      headerModal.classList.remove("header__modal__active");
    });
  }

  /* ---------- BURGER ---------- */
  if (burgerBut) {
    burgerBut.addEventListener("click", () => {
      const headerMenu = document.querySelector("#header__menu");

      burgerBut.classList.toggle("burger__but__active");
      headerMenu.classList.toggle("header__menu__active");

      body.style.overflowY = burgerBut.classList.contains("burger__but__active")
        ? "hidden"
        : "";
    });
  }

  const dropdowns = document.querySelectorAll(".menu-dropdown");

  dropdowns.forEach((drop) => {
    const toggle = drop.querySelector(".menu-dropdown__toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Закрыть все остальные
      dropdowns.forEach((d) => {
        if (d !== drop) d.classList.remove("is-open");
      });

      drop.classList.toggle("is-open");
    });

    // Если это select (но НЕ tovar__line-drop-2)
    if (
      drop.classList.contains("project-list-filter__select") &&
      !drop.classList.contains("tovar__line-drop-2")
    ) {
      const popup = drop.querySelector(".menu-dropdown__popup");
      if (!popup) return;

      popup.querySelectorAll("a").forEach((option) => {
        option.addEventListener("click", (e) => {
          e.preventDefault();

          // Смена текста (для обычных select)
          toggle.childNodes[0].textContent = option.textContent.trim();

          // Активный пункт
          popup
            .querySelectorAll("a")
            .forEach((a) => a.classList.remove("active"));
          option.classList.add("active");

          // Помечаем селект как выбранный
          drop.classList.add("has-value");
          drop.dataset.value = option.textContent.trim();

          drop.classList.remove("is-open");
        });
      });
    }
  });

  // Закрытие по клику вне
  document.addEventListener("click", () => {
    dropdowns.forEach((d) => d.classList.remove("is-open"));
  });

  // Закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach((d) => d.classList.remove("is-open"));
    }
  });
});
// Специальный обработчик ТОЛЬКО для tovar__line-drop-2
document.addEventListener("DOMContentLoaded", () => {
  const targetDropdown = document.querySelector(
    ".menu-dropdown.tovar__line-drop-2",
  );
  if (!targetDropdown) return;

  const toggle = targetDropdown.querySelector(".menu-dropdown__toggle");
  const popup = targetDropdown.querySelector(".menu-dropdown__popup");
  if (!toggle || !popup) return;

  const menuLineInToggle = toggle.querySelector(".tovar__menu-line");
  if (!menuLineInToggle) return;

  popup.querySelectorAll("a").forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault();

      const optionMenuLine = option.querySelector(".tovar__menu-line");
      if (!optionMenuLine) return;

      // 1. Меняем текст в toggle (отображаем выбранный вариант)
      menuLineInToggle.innerHTML = optionMenuLine.innerHTML;

      // 2. Помечаем выбранный элемент как активный
      popup.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
      option.classList.add("active");

      // 3. Закрываем dropdown — без прокрутки!
      targetDropdown.classList.remove("is-open");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // const filterForms = document.querySelectorAll(".project-list-filter__form");
  // if (!filterForms.length) return;

  // filterForms.forEach(form => {
  //   const searchInput = form.querySelector('input[type="text"]');
  //   const nativeSelects = form.querySelectorAll('select.project-list-filter__select');
  //   const dropdownSelects = form.querySelectorAll('.menu-dropdown.project-list-filter__select');
  //   const resetButton = form.querySelector(".project-list-filter__reset");

  //   function updateResetState() {
  //     let hasValue = false;

  //     // input[type="text"]
  //     if (searchInput && searchInput.value.trim() !== "") {
  //       hasValue = true;
  //     }

  //     // обычные select
  //     nativeSelects.forEach(select => {
  //       if (select.value) {
  //         hasValue = true;
  //       }
  //     });

  //     // кастомные dropdown
  //     dropdownSelects.forEach(dropdown => {
  //       if (dropdown.classList.contains("has-value")) {
  //         hasValue = true;
  //       }
  //     });

  //     resetButton.disabled = !hasValue;
  //     resetButton.classList.toggle("is-active", hasValue);
  //   }

  //   /* input */
  //   if (searchInput) {
  //     searchInput.addEventListener("input", updateResetState);
  //   }

  //   /* native select */
  //   nativeSelects.forEach(select => {
  //     select.addEventListener("change", updateResetState);
  //   });

  //   /* custom dropdown */
  //   dropdownSelects.forEach(dropdown => {
  //     dropdown.querySelectorAll(".menu-dropdown__popup a").forEach(option => {
  //       option.addEventListener("click", () => {
  //         dropdown.classList.add("has-value");
  //         updateResetState();
  //       });
  //     });
  //   });

  //   /* reset */
  //   form.addEventListener("reset", () => {
  //     setTimeout(() => {
  //       dropdownSelects.forEach(dropdown => {
  //         dropdown.classList.remove("has-value");

  //         const active = dropdown.querySelector(".active");
  //         if (active) active.classList.remove("active");

  //         const toggle = dropdown.querySelector(".menu-dropdown__toggle");
  //         if (toggle) {
  //           toggle.childNodes[0].textContent =
  //             toggle.dataset.placeholder || "Выбрать";
  //         }
  //       });

  //       updateResetState();
  //     }, 0);
  //   });

  //   /* init */
  //   updateResetState();
  // });
  /* ================= TABS ================= */

  // const buttons = document.querySelectorAll(".tab-button");
  // const contents = document.querySelectorAll(".tab-content");
  // const dropdownToggle = document.querySelector(".dropdown-toggle");
  // const dropdownMenu = document.querySelector(".dropdown-menu");
  // const customDropdown = document.querySelector(".custom-dropdown");

  // function showTab(tabId) {
  //   buttons.forEach((b) => b.classList.remove("active"));
  //   contents.forEach((c) => c.classList.remove("active"));

  //   const activeButton = document.querySelector(
  //     `.tab-button[data-tab="${tabId}"]`
  //   );
  //   const activeContent = document.getElementById(tabId);

  //   if (activeButton) activeButton.classList.add("active");
  //   if (activeContent) activeContent.classList.add("active");

  //   // dropdown sync
  //   if (dropdownToggle && dropdownMenu) {
  //     const selected = dropdownMenu.querySelector(`li[data-value="${tabId}"]`);
  //     if (selected) {
  //       dropdownToggle.innerHTML = `${selected.textContent}
  //         <span class="dropdown-arrow"></span>`;
  //       dropdownMenu
  //         .querySelectorAll("li")
  //         .forEach((li) => li.classList.remove("active"));
  //       selected.classList.add("active");
  //     }
  //   }
  // }

  // // клики по кнопкам
  // buttons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     showTab(button.dataset.tab);
  //   });
  // });

  // // 🔴 ВАЖНО: показываем первый таб автоматически
  // if (buttons.length > 0) {
  //   showTab(buttons[0].dataset.tab);
  // }

  // /* ================= DROPDOWN TABS ================= */

  // if (dropdownToggle && dropdownMenu && customDropdown) {
  //   dropdownToggle.addEventListener("click", () => {
  //     customDropdown.classList.toggle("open");
  //     dropdownMenu.style.display = customDropdown.classList.contains("open")
  //       ? "block"
  //       : "none";
  //   });

  //   dropdownMenu.addEventListener("click", (e) => {
  //     if (e.target.tagName === "LI") {
  //       showTab(e.target.dataset.value);
  //       customDropdown.classList.remove("open");
  //       dropdownMenu.style.display = "none";
  //     }
  //   });

  //   document.addEventListener("click", (e) => {
  //     if (!customDropdown.contains(e.target)) {
  //       customDropdown.classList.remove("open");
  //       dropdownMenu.style.display = "none";
  //     }
  //   });
  // }

  /* ================= TEXTAREA COUNTER ================= */

  const textarea = document.getElementById("review-text");
  const counter = document.getElementById("char-count");

  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / 2500`;
    });
  }

  const AccomTextarea = document.getElementById("accom-text");
  const AccomCounter = document.getElementById("char-count");

  if (AccomTextarea && AccomCounter) {
    AccomTextarea.addEventListener("input", () => {
      AccomCounter.textContent = `${AccomTextarea.value.length} / 2500`;
    });
  }

  /* ================= FORM 1 ================= */

  const form1 = document.querySelector(".block__form");

  if (form1) {
    const requiredFields = form1.querySelectorAll(
      "input[required]:not([name='rating']), textarea[required]",
    );
    const rating = form1.querySelector(".rating");
    const ratingInputs = rating
      ? rating.querySelectorAll("input[name='rating']")
      : [];

    const showError = (field) => {
      field.classList.add("input-error");
      field.style.borderColor = "#B41825";
    };

    const clearError = (field) => {
      field.classList.remove("input-error");
      field.style.borderColor = "";
    };

    requiredFields.forEach((field) => {
      field.addEventListener("blur", () =>
        field.value.trim() === "" ? showError(field) : clearError(field),
      );
      field.addEventListener("input", () => clearError(field));
    });

    ratingInputs.forEach((radio) => {
      radio.addEventListener("change", () =>
        rating.classList.remove("rating-error"),
      );
    });

    form1.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      requiredFields.forEach((field) => {
        if (field.value.trim() === "") {
          showError(field);
          valid = false;
        }
      });

      if (![...ratingInputs].some((r) => r.checked)) {
        rating.classList.add("rating-error");
        valid = false;
      }

      if (valid) form1.submit();
    });
  }

  /* ================= FORM 2 ================= */

  const form2 = document.querySelector(".footer__form-content");

  if (form2 && window.IMask) {
    const phoneInput = form2.querySelector("#phone");
    if (!phoneInput) return;

    const phoneMask = IMask(phoneInput, {
      mask: "+{375} (00) 000-00-00",
    });

    form2.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const digits = phoneMask.value.replace(/\D/g, "");
      if (digits.length < 12) {
        phoneInput.classList.add("input-error");
        valid = false;
      } else {
        phoneInput.classList.remove("input-error");
      }

      const checkbox = form2.querySelector("input[type='checkbox']");
      if (!checkbox?.checked) {
        checkbox.style.outline = "2px solid #B41825";
        valid = false;
      } else checkbox.style.outline = "";

      if (valid) {
        phoneInput.value = "+" + digits;
        form2.submit();
      }
    });
  }

  /* ================= FOOTER ACCORDION ================= */

  const accordions = document.querySelectorAll(".footer-accordion");
  const mobileMQ = window.matchMedia("(max-width:48em)");
  function initFooterAccordion() {
    accordions.forEach((acc) => {
      const title = acc.querySelector(".footer__row-title");
      if (!title) return;
      title.onclick = null;
      if (mobileMQ.matches) {
        acc.classList.remove("active");
        title.onclick = () => {
          acc.classList.toggle("active");
        };
      } else {
        acc.classList.add("active");
      }
    });
  }
  initFooterAccordion();
  mobileMQ.addEventListener("change", initFooterAccordion);

  /* ================= SWIPER ================= */

  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      slidesPerView: 1.2,
      // slidesPerGroup: 2,
      spaceBetween: 22,
      // allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: false },
        1024: { spaceBetween: 16, allowTouchMove: false },
        768: { allowTouchMove: true },
        0: { slidesPerGroup: 1, allowTouchMove: true },
      },
    });
  }
  if (document.querySelector(".tovar__swiper-w")) {
    new Swiper(".tovar__swiper-w", {
      slidesPerView: 1,
      // slidesPerGroup: 2,
      spaceBetween: 0,
      // allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: true },
        0: { slidesPerGroup: 1, allowTouchMove: true },
      },
      navigation: {
        nextEl: ".tovar__swiper-w .swiper-button-next",
        prevEl: ".tovar__swiper-w .swiper-button-prev",
      },
    });
  }
  if (document.querySelector(".vacan-swiper")) {
    new Swiper(".vacan-swiper", {
      slidesPerView: 3.1,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      // allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: false },
        0: { slidesPerGroup: 1, allowTouchMove: false },
      },
      navigation: {
        nextEl: ".vacan-swiper .swiper-button-next",
        prevEl: ".vacan-swiper .swiper-button-prev",
      },
    });
  }
  if (document.querySelector(".new-rev-swiper")) {
    new Swiper(".new-rev-swiper", {
      slidesPerView: 2,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      allowTouchMove: false,
      simulateTouch: false,
      breakpoints: {
        1440: { allowTouchMove: false },
        1024: { spaceBetween: 16, allowTouchMove: false },
        768: { slidesPerGroup: 1, allowTouchMove: true },
        0: { slidesPerGroup: 1, allowTouchMove: true },
      },
    });
  }

  if (document.querySelector(".project-swiper")) {
    new Swiper(".project-swiper", {
      slidesPerView: 2,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      // allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: false },
        0: { slidesPerGroup: 1, allowTouchMove: false },
      },
      navigation: {
        nextEl: ".project-swiper .swiper-button-next",
        prevEl: ".project-swiper .swiper-button-prev",
      },
    });
  }

  if (document.querySelector(".articles-swiper")) {
    new Swiper(".articles-swiper", {
      slidesPerView: 3,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: false },
        0: { slidesPerGroup: 1, allowTouchMove: false },
      },
      navigation: {
        nextEl: ".articles-button-next",
        prevEl: ".articles-button-prev",
      },
    });
  }
  if (document.querySelector(".popular-swiper")) {
    new Swiper(".popular-swiper", {
      slidesPerView: 4,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: false },
        0: { slidesPerGroup: 1, allowTouchMove: false },
      },
      navigation: {
        nextEl: ".popular-button-next",
        prevEl: ".popular-button-prev",
      },
    });
  }
  if (document.querySelector(".reviews-swiper")) {
    new Swiper(".reviews-swiper", {
      slidesPerView: 1,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: true },
        0: { slidesPerGroup: 1 },
      },
      navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev",
      },
    });
  }
  if (document.querySelector(".team-swiper")) {
    new Swiper(".team-swiper", {
      slidesPerView: 1,
      // slidesPerGroup: 2,
      spaceBetween: 24,
      allowTouchMove: true,
      breakpoints: {
        1440: { allowTouchMove: true },
        1024: { spaceBetween: 16, allowTouchMove: true },
        768: { allowTouchMove: true },
        0: { slidesPerGroup: 1 },
      },
      navigation: {
        nextEl: ".team-button-next",
        prevEl: ".team-button-prev",
      },
    });
  }

  const modalButtons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);

      if (!modal) return;

      modal.classList.add("active");
      document.body.classList.add("no-scroll");
    });
  });

  // закрытие по overlay и кнопке
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close")) {
        modal.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        modal.classList.remove("active");
      });
      document.body.classList.remove("no-scroll");
    }
  });
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 1) {
      // когда прокрутка больше 50px
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const overlay = modal.querySelector(".project-modal__overlay");
  const closeBtn = modal.querySelector(".project-modal__close");

  const swiperEl = document.getElementById("projectSwiper");
  const wrapper = document.getElementById("projectSwiperWrapper");
  const info = document.getElementById("projectModalInfo");

  let swiperInstance = null;

  function getImagesFromCard(card) {
    const raw = card.getAttribute("data-images");
    if (!raw) return [];

    // поддержка JSON и строки через запятую
    const trimmed = raw.trim();
    if (trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed);
      } catch (e) {
        return [];
      }
    }

    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function buildSlides(images) {
    wrapper.innerHTML = images
      .slice(0, 4)
      .map(
        (src) => `
      <div class="swiper-slide"><img src="${src}" alt=""></div>
    `,
      )
      .join("");
  }

  function initSwiper() {
    if (swiperInstance) swiperInstance.destroy(true, true);

    swiperInstance = new Swiper("#projectSwiper", {
      loop: true,
      slidesPerView: 3.3,
      spaceBetween: 16,
      speed: 450,
      centeredSlides: false,
      watchOverflow: true,
      slidesOffsetBefore: 108,
      slidesOffsetAfter: 0,

      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: { slidesPerView: 1.3, spaceBetween: 12, slidesOffsetBefore: 24 },
        768: { slidesPerView: 2.3, spaceBetween: 14, slidesOffsetBefore: 60 },
        1024: { slidesPerView: 3.3, spaceBetween: 16, slidesOffsetBefore: 108 },
      },
    });

    swiperInstance.update();
  }

  function openModal(card) {
    const images = getImagesFromCard(card);
    buildSlides(images);

    // 2) текст снизу (левая часть карточки)
    info.innerHTML = "";
    const left = card.querySelector(".project-card__left");
    if (left) {
      info.appendChild(left.cloneNode(true));
    } else {
      info.appendChild(card.cloneNode(true));
    }

    // 3) открыть модалку
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // 4) инициализировать swiper после того, как модалка отрисуется
    requestAnimationFrame(() => {
      if (!wrapper.children.length) return;
      initSwiper();
    });
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";

    setTimeout(() => {
      wrapper.innerHTML = "";
      info.innerHTML = "";
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }, 300);
  }

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  overlay?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".main-numbers__track");
  if (!track) return;
  const group = track.querySelector(".main-numbers__group");
  const clone = track.querySelector(".clone");

  if (!group || !clone) return;
  clone.innerHTML = group.innerHTML;
  const width = group.offsetWidth;
  gsap.set(track, { x: 0 });

  gsap.to(track, {
    x: -width,
    duration: 30, // скорость
    ease: "none",
    repeat: -1,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-tabs").forEach(initTabs);
});

function initTabs(container) {
  const buttons = container.querySelectorAll(".tab-button");
  const contents = container.querySelectorAll(".tab-content");

  const dropdownToggle = container.querySelector(".dropdown-toggle");
  const dropdownMenu = container.querySelector(".dropdown-menu");
  const customDropdown = container.querySelector(".custom-dropdown");

  function showTab(tabId) {
    // кнопки
    buttons.forEach((b) =>
      b.classList.toggle("active", b.dataset.tab === tabId),
    );

    // контент
    contents.forEach((c) => c.classList.toggle("active", c.id === tabId));

    // синхронизация dropdown
    if (dropdownToggle && dropdownMenu) {
      const selected = dropdownMenu.querySelector(`li[data-value="${tabId}"]`);
      if (selected) {
        dropdownToggle.innerHTML = `
          ${selected.textContent}
          <span class="dropdown-arrow"></span>
        `;
        dropdownMenu
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("active"));
        selected.classList.add("active");
      }
    }
  }

  // клики по кнопкам (desktop)
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showTab(btn.dataset.tab);
    });
  });

  // клики по dropdown (mobile)
  if (dropdownMenu) {
    dropdownMenu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        showTab(item.dataset.value);
        customDropdown.classList.remove("open");
        dropdownMenu.style.display = "none";
      });
    });
  }

  if (dropdownToggle && customDropdown) {
    dropdownToggle.addEventListener("click", () => {
      customDropdown.classList.toggle("open");
      dropdownMenu.style.display = customDropdown.classList.contains("open")
        ? "block"
        : "none";
    });

    document.addEventListener("click", (e) => {
      if (!customDropdown.contains(e.target)) {
        customDropdown.classList.remove("open");
        dropdownMenu.style.display = "none";
      }
    });
  }

  // стартовый таб
  const initialTab =
    container.querySelector(".tab-button.active")?.dataset.tab ||
    buttons[0]?.dataset.tab;

  if (initialTab) showTab(initialTab);
}

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".menu-item.has-children");

  items.forEach((item) => {
    const toggle = item.querySelector(".menu-toggle");
    const submenu = item.querySelector(".submenu");

    toggle.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      if (isOpen) {
        item.classList.remove("open");
        submenu.style.maxHeight = null;
      } else {
        item.classList.add("open");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    });
  });

  //Попапы карточек с платежами
  const openModal = (card) => {
    const modalId = card.dataset.modal;
    const modal = document.querySelector(`.popup[data-modal="${modalId}"]`);

    if (!modal) return;

    modal.classList.add("is-active");
    document.body.classList.add("modal-open");
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-active");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll(".pay__card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  document.querySelectorAll(".popup-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".popup");
      if (modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".popup.is-active").forEach((modal) => {
        closeModal(modal);
      });
    }
  });
});
function toggleDropdown(button) {
  const dropdown = button.closest(".dropdown");
  if (!dropdown) return;

  // закрыть другие dropdown (если нужно)
  document.querySelectorAll(".dropdown.active").forEach((d) => {
    if (d !== dropdown) d.classList.remove("active");
  });

  dropdown.classList.toggle("active");
}

// закрытие по клику вне
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document
      .querySelectorAll(".dropdown.active")
      .forEach((d) => d.classList.remove("active"));
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(
//     ".project-list-filter__form"
//   );
//   if (!form) return;

//   // ⚠️ только SELECT внутри ЭТОЙ формы
//   const selects = form.querySelectorAll(
//     'select.project-list-filter__select'
//   );
//   const resetButton = form.querySelector(
//     ".project-list-filter__reset"
//   );

//   function updateResetButtonState() {
//     let hasValue = false;

//     selects.forEach(select => {
//       if (select.value !== "") {
//         hasValue = true;
//       }
//     });

//     resetButton.disabled = !hasValue;
//     resetButton.classList.toggle("is-active", hasValue);
//   }

//   // изменение select
//   selects.forEach(select => {
//     select.addEventListener("change", updateResetButtonState);
//   });

//   // reset формы
//   form.addEventListener("reset", () => {
//     // ждём, пока браузер сбросит select
//     setTimeout(updateResetButtonState, 0);
//   });

//   // инициализация
//   updateResetButtonState();
// });

document.addEventListener("DOMContentLoaded", () => {
  const filterForms = document.querySelectorAll(".project-list-filter__form");
  if (!filterForms.length) return;

  filterForms.forEach((form) => {
    const searchInput = form.querySelector('input[type="text"]');
    const nativeSelects = form.querySelectorAll(
      "select.project-list-filter__select",
    );
    const dropdownSelects = form.querySelectorAll(
      ".menu-dropdown.project-list-filter__select",
    );
    const resetButton = form.querySelector(".project-list-filter__reset");

    function updateResetState() {
      let hasValue = false;

      // input[type="text"]
      if (searchInput && searchInput.value.trim() !== "") {
        hasValue = true;
      }

      // обычные select
      nativeSelects.forEach((select) => {
        if (select.value) {
          hasValue = true;
        }
      });

      // кастомные dropdown
      dropdownSelects.forEach((dropdown) => {
        if (dropdown.classList.contains("has-value")) {
          hasValue = true;
        }
      });

      resetButton.disabled = !hasValue;
      resetButton.classList.toggle("is-active", hasValue);
    }

    /* input */
    if (searchInput) {
      searchInput.addEventListener("input", updateResetState);
    }

    /* native select */
    nativeSelects.forEach((select) => {
      select.addEventListener("change", updateResetState);
    });

    /* custom dropdown */
    dropdownSelects.forEach((dropdown) => {
      dropdown.querySelectorAll(".menu-dropdown__popup a").forEach((option) => {
        option.addEventListener("click", () => {
          dropdown.classList.add("has-value");
          updateResetState();
        });
      });
    });

    /* reset */
    form.addEventListener("reset", () => {
      setTimeout(() => {
        dropdownSelects.forEach((dropdown) => {
          dropdown.classList.remove("has-value");

          const active = dropdown.querySelector(".active");
          if (active) active.classList.remove("active");

          const toggle = dropdown.querySelector(".menu-dropdown__toggle");
          if (toggle) {
            toggle.childNodes[0].textContent =
              toggle.dataset.placeholder || "Выбрать";
          }
        });

        updateResetState();
      }, 0);
    });

    /* init */
    updateResetState();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".tovar__line-input");

  blocks.forEach((block) => {
    const minusBtn = block.querySelector(".qty-minus");
    const plusBtn = block.querySelector(".qty-plus");
    const input = block.querySelector(".qty-input");

    minusBtn.addEventListener("click", () => {
      let value = parseInt(input.value, 10) || 1;
      if (value > 1) value--;
      input.value = value;
    });

    plusBtn.addEventListener("click", () => {
      let value = parseInt(input.value, 10) || 1;
      input.value = value + 1;
    });

    input.addEventListener("input", () => {
      if (input.value < 1) input.value = 1;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".quiz-modal");
  const openBtn = document.querySelector(".open-quiz-btn");
  const closeBtn = document.querySelector(".quiz-close");
  const closeFinalBtn = document.querySelector(".quiz-close-final");
  const steps = document.querySelectorAll(".quiz-step");

  let currentStep = 0;
  const totalSteps = 7;

  /* открыть */
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
      goToStep(0);
    });
  }

  /* закрыть */
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  /* закрыть финальный */
  if (closeFinalBtn) {
    closeFinalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      goToStep(0);
    });
  }

  /* навигация */
  document.addEventListener("click", function (e) {
    if (e.target.closest(".next-btn")) {
      const step = e.target.closest(".quiz-step");
      if (!validateStep(step)) return;
      goToStep(currentStep + 1);
    }
    if (e.target.closest(".prev-btn")) {
      goToStep(currentStep - 1);
    }
  });

  /* RADIO логика — кнопка активируется только после выбора */
  document
    .querySelectorAll(".quiz-step input[type='radio']")
    .forEach((radio) => {
      radio.addEventListener("change", function () {
        const step = this.closest(".quiz-step");

        validateStep(step);
      });
    });

  /* TEXT логика */
  document.querySelectorAll(".quiz-step .input-text").forEach((input) => {
    input.addEventListener("input", function () {
      const step = this.closest(".quiz-step");

      validateStep(step);
    });
  });

  /* FILE логика */
  document.querySelectorAll(".quiz-step .input-file").forEach((file) => {
    file.addEventListener("change", function () {
      const step = this.closest(".quiz-step");
      const fileNameBlock = step.querySelector(".file-name");
      if (this.files.length > 0) {
        fileNameBlock.textContent = "Файл загружен: " + this.files[0].name;
      } else {
        fileNameBlock.textContent = "";
      }
    });
  });

  /* переход */
  function goToStep(step) {
    steps.forEach((s) => s.classList.remove("active"));
    const next = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (next) {
      next.classList.add("active");
      currentStep = step;
      updateProgress();
      validateStep(next);
    }
  }

  /* прогресс */
  function updateProgress() {
    const percent = (currentStep / totalSteps) * 100;
    document
      .querySelectorAll(".quiz-progress-bar")
      .forEach((bar) => (bar.style.width = percent + "%"));
  }

  /* ВАЛИДАЦИЯ */
  function validateStep(step) {
    const nextBtn = step.querySelector(".next-btn");
    if (!nextBtn) return true;
    const textInputs = step.querySelectorAll(".input-text");
    const radios = step.querySelectorAll("input[type='radio']");
    let valid = true;
    /* если есть текстовые поля */
    if (textInputs.length > 0) {
      textInputs.forEach((input) => {
        if (input.value.trim() === "") {
          valid = false;
        }
      });
    }

    /* если есть radio */
    if (radios.length > 0) {
      const checked = step.querySelector("input[type='radio']:checked");
      if (!checked) valid = false;
    }
    nextBtn.disabled = !valid;
    return valid;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sort = document.querySelector(".sort");
  const sortButton = document.getElementById("sortButton");
  const sortRadios = document.querySelectorAll('input[name="sort"]');
  const sortText = sortButton.querySelector(".sort__text");

  sortButton.addEventListener("click", () => {
    sort.classList.toggle("sort--open");
  });

  document.addEventListener("click", (e) => {
    if (!sort.contains(e.target)) {
      sort.classList.remove("sort--open");
    }
  });

  const params = new URLSearchParams(window.location.search);
  const sortFromUrl = params.get("sort");
  const savedSort = localStorage.getItem("sort");
  const current = sortFromUrl || savedSort || "popular";
  sortRadios.forEach(radio => {
    if (radio.value === current) {
      radio.checked = true;
      sortText.textContent = radio.parentElement.textContent.trim();
    }
  });

  // 🔹 выбор
  sortRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const value = radio.value;
      const label = radio.parentElement.textContent.trim();
      sortText.textContent = label;
      localStorage.setItem("sort", value);
      sort.classList.remove("sort--open");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".detailinfo__item");

  items.forEach(item => {
    const header = item.querySelector(".detailinfo__header");

    header.addEventListener("click", () => {
      // если нужен только один открытый
      items.forEach(i => i.classList.remove("active"));
      item.classList.toggle("active");
    });
  });
});