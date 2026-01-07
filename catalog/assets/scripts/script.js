const catalogButOpen = document.querySelector("#catalog__categories__but");
const catalogButClose = document.querySelector(".catalog-categoies__close-block");

catalogButOpen.addEventListener('click', ()=>{
    catalogButClose.style.display = 'block';
    // body.style.overflowY = "hidden";
    const catalogBlock = document.querySelector('.catalog__block');
    // const pricelistBlock = document.querySelector('.price__list');
    catalogBlock.style.display = 'none';
    // pricelistBlock.style.display = 'none';
    const catalogCategoriesActionBlock = document.querySelector("#catalog-categories__action-block");
    catalogCategoriesActionBlock.classList.add("catalog-categories__action-block__active");
})

catalogButClose.addEventListener('click', ()=>{
    const catalogBlock = document.querySelector('.catalog__block');
    // const pricelistBlock = document.querySelector('.price__list');
    catalogBlock.style.display = '';
    // pricelistBlock.style.display = '';
    const catalogCategoriesActionBlock = document.querySelector("#catalog-categories__action-block");
    catalogCategoriesActionBlock.classList.remove("catalog-categories__action-block__active");
    catalogButClose.style.display = '';
})

const catalogNavBut = document.querySelectorAll('.catalog-nav__card');

catalogNavBut.forEach(element => {
    element.addEventListener('click', ()=>{
        const catalogNavButActive = document.querySelector('.catalog-nav__card__active');
        if(!element.classList.contains('catalog-nav__card__active')){
            catalogNavButActive.classList.remove("catalog-nav__card__active")
            element.classList.add("catalog-nav__card__active")
        }
    })
})

// body.style.overflowY = "";
// burgerBut.classList.remove("burger__but__active")
// const headerMenu = document.querySelector(".header__menu__active");
// headerMenu.classList.remove("header__menu__active");
