const headerToggel = document.querySelector("#header__phone");
const arrowDown = document.querySelector("#arrow__down");
const headerModal = document.querySelector("#header__modal");
const modal = document.querySelector("#modal__overlay");
const body = document.querySelector("body");

headerToggel.addEventListener('click', ()=>{
    modal.style.display = "block";
    arrowDown.style.transform = 'rotate(180deg)';
    headerModal.classList.add("header__modal__active");
});

modal.addEventListener('click', ()=>{
    modal.style.display = "none";
arrowDown.style.transform = 'rotate(0deg)';
    headerModal.classList.remove("header__modal__active")
});


const burgerBut = document.querySelector("#burger__but");

burgerBut.addEventListener('click', ()=>{
    if (burgerBut.classList.contains("burger__but__active")) {
        body.style.overflowY = "";
            burgerBut.classList.remove("burger__but__active")
            const headerMenu = document.querySelector(".header__menu__active");
            headerMenu.classList.remove("header__menu__active");
    }else{
        body.style.overflowY = "hidden";
        burgerBut.classList.add("burger__but__active")
        const headerMenu = document.querySelector("#header__menu");
        headerMenu.classList.add("header__menu__active");
    }
})

// }

const dropDownBut = document.querySelectorAll(".drop-down-list");

dropDownBut.forEach(element => {
    element.addEventListener('click', ()=>{
        if (element.classList.contains("drop-down-list__active")) {
            element.classList.remove('drop-down-list__active')
        }else{
            element.classList.add('drop-down-list__active')
        }
    })
});