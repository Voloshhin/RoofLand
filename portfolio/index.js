//кнопка в списке "Показать больше"

document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.project-list');
    const btn = document.querySelector('.project__more-button');

    if (!list || !btn) return;

    const items = list.querySelectorAll('.project-list__item');
    const step = 3;
    let visibleCount = 0;

    function showNext() {
        for (let i = visibleCount; i < visibleCount + step && i < items.length; i++) {
            items[i].classList.add('is-visible');
        }

        visibleCount += step;

        if (visibleCount >= items.length) {
            btn.style.display = 'none';
        }
    }

    showNext();

    btn.addEventListener('click', showNext);
});

//слайдер в модалке

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const overlay = modal.querySelector('.project-modal__overlay');
    const closeBtn = modal.querySelector('.project-modal__close');

    const swiperEl = document.getElementById('projectSwiper');
    const wrapper = document.getElementById('projectSwiperWrapper');
    const info = document.getElementById('projectModalInfo');

    let swiperInstance = null;

    function getImagesFromCard(card) {
        const raw = card.getAttribute('data-images');
        if (!raw) return [];

        // поддержка JSON и строки через запятую
        const trimmed = raw.trim();
        if (trimmed.startsWith('[')) {
            try { return JSON.parse(trimmed); } catch (e) { return []; }
        }

        return trimmed
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
    }

    function buildSlides(images) {
        wrapper.innerHTML = images.slice(0, 4).map(src => `
      <div class="swiper-slide"><img src="${src}" alt=""></div>
    `).join('');
    }

    function initSwiper() {
        if (swiperInstance) swiperInstance.destroy(true, true);

        swiperInstance = new Swiper('#projectSwiper', {
            loop: true,
            slidesPerView: 3.3,
            spaceBetween: 16,
            speed: 450,
            centeredSlides: false,
            watchOverflow: true,
            slidesOffsetBefore: 108,
            slidesOffsetAfter: 0,

            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },

            breakpoints: {
                0: { slidesPerView: 1.3, spaceBetween: 12,  slidesOffsetBefore: 24},
                768: { slidesPerView: 2.3, spaceBetween: 14,  slidesOffsetBefore: 60},
                1024: { slidesPerView: 3.3, spaceBetween: 16,  slidesOffsetBefore: 108, }
            }
        });

        swiperInstance.update();
    }

    function openModal(card) {
        const images = getImagesFromCard(card);
        buildSlides(images);

        // 2) текст снизу (левая часть карточки)
        info.innerHTML = '';
        const left = card.querySelector('.project-card__left');
        if (left) {
            info.appendChild(left.cloneNode(true));
        } else {
            info.appendChild(card.cloneNode(true));
        }

        // 3) открыть модалку
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // 4) инициализировать swiper после того, как модалка отрисуется
        requestAnimationFrame(() => {

            if (!wrapper.children.length) return;
            initSwiper();
        });
    }

    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';

        setTimeout(() => {
            wrapper.innerHTML = '';
            info.innerHTML = '';
            if (swiperInstance) {
                swiperInstance.destroy(true, true);
                swiperInstance = null;
            }
        }, 300);
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    overlay?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});


/**Переключение тем в зависимости от настроек пользователя. Позже можно переделать на кнопку смены тем 
(function () {
  const saved = localStorage.getItem('theme');

  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    return;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
})();
*/


