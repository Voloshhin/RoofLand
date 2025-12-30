
const headerToggel = document.querySelector("#header__phone");
const arrowDown = document.querySelector("#arrow__down");
const headerModal = document.querySelector("#header__modal");
const modal = document.querySelector("#modal__overlay");
const body = document.querySelector("body");

headerToggel.addEventListener('click', () => {
    modal.style.display = "block";
    arrowDown.style.transform = 'rotate(180deg)';
    headerModal.classList.add("header__modal__active");
});

modal.addEventListener('click', () => {
    modal.style.display = "none";
    arrowDown.style.transform = 'rotate(0deg)';
    headerModal.classList.remove("header__modal__active")
});


const burgerBut = document.querySelector("#burger__but");

burgerBut.addEventListener('click', () => {
    if (burgerBut.classList.contains("burger__but__active")) {
        body.style.overflowY = "";
        burgerBut.classList.remove("burger__but__active")
        const headerMenu = document.querySelector(".header__menu__active");
        headerMenu.classList.remove("header__menu__active");
    } else {
        body.style.overflowY = "hidden";
        burgerBut.classList.add("burger__but__active")
        const headerMenu = document.querySelector("#header__menu");
        headerMenu.classList.add("header__menu__active");
    }
})

const dropDownBut = document.querySelectorAll(".drop-down-list");

dropDownBut.forEach(element => {
    element.addEventListener('click', () => {
        if (element.classList.contains("drop-down-list__active")) {
            element.classList.remove('drop-down-list__active')
        } else {
            element.classList.add('drop-down-list__active')
        }
    })
});

const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        spaceBetween: 16,
    },
    autoplay: {
        delay: 5000,
    },
});

const toggleFormBtn = document.querySelector('.btn-toggle');
const form = document.querySelector('.comment-form');
const showMoreBtn = document.querySelector('.show-more');
const comments = document.querySelectorAll('.comment');
const hiddenComments = document.querySelectorAll('.comment.is-hidden');
const closeBtn = form.querySelector('.comment-form__close');

// запоминаем исходное место формы
const formHome = form.parentElement;

// если комментариев нет — форма открыта сразу
if (comments.length === 0) {
  commentsList.parentElement.insertBefore(form, commentsList);
  form.classList.remove('hidden');
  toggleFormBtn?.remove();
  showMoreBtn?.remove();
}

/* открыть форму сверху */
toggleFormBtn?.addEventListener('click', () => {
  if (!form.classList.contains('hidden')) return;

  commentsList.parentElement.insertBefore(form, commentsList);
  form.querySelector('.comment-form__title').textContent =
    'Оставьте свой комментарий';

  form.classList.remove('hidden');
});

/* показать скрытые комментарии */
showMoreBtn?.addEventListener('click', (e) => {
  e.preventDefault();

  hiddenComments.forEach(comment =>
    comment.classList.remove('is-hidden')
  );

  showMoreBtn.remove();
});

/* reply под конкретным комментом */
document.addEventListener('click', (e) => {
  const replyBtn = e.target.closest('.comment__reply');
  if (!replyBtn) return;

  const comment = replyBtn.closest('.comment');
  if (!comment) return;

  comment.appendChild(form);

  form.classList.remove('hidden');
});

/* закрыть форму крестиком */
closeBtn.addEventListener('click', () => {
  form.classList.add('hidden');
  formHome.appendChild(form);
});

/*

//логика комментариев

const toggleFormBtn = document.getElementById('toggleForm');
const form = document.getElementById('commentForm');
const showMoreBtn = document.getElementById('showMore');
const comments = document.querySelectorAll('.comment');
const hiddenComments = document.querySelectorAll('.comment.is-hidden');
const closeBtn = form.querySelector('.comment-form__close');

// если комментариев нет — форма открыта сразу
if (comments.length === 0) {
    form.classList.remove('hidden');
    toggleFormBtn?.remove();
    showMoreBtn?.remove();
}

toggleFormBtn?.addEventListener('click', () => {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
  }
});

// показать скрытые комментарии
showMoreBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    hiddenComments.forEach(comment => {
        comment.classList.remove('is-hidden');
    });

    showMoreBtn.remove();
});

//форма ответа в комментариях

document.addEventListener('click', (e) => {
    const replyBtn = e.target.closest('.comment__reply');
    if (!replyBtn) return;

    const comment = replyBtn.closest('.comment');
    if (!comment) return;

    // переносим форму под нужный комментарий
    comment.appendChild(form);

    form.classList.remove('hidden');
});


// запоминаем исходный контейнер
const formHome = form.parentElement;
closeBtn.addEventListener('click', () => {
    form.classList.add('hidden');
    formHome.appendChild(form);
});

*/

