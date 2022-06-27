const burgerBtn = document.getElementById('js_burger');
const burgerNav = document.getElementById('js_nav');
const burgerNavIllus = document.getElementById('js_nav-illus');
const burgerMain = document.getElementById('js_main');
const burgerFooter = document.getElementById('js_footer');
const burgerHeader = document.getElementById('js_header');



function menuBurgerChangelabel() {
    let texteNouveau = burgerBtn.dataset.label;
    let texteActuel = burgerBtn.getAttribute('aria-label');
    burgerBtn.setAttribute('aria-label', texteNouveau);
    burgerBtn.setAttribute('data-label', texteActuel);
}



function displayMenuBurger() {
    
    if (burgerNav.classList.contains('hide-for-small')) {

        burgerMain.classList.add('hide-for-small');
        burgerFooter.classList.add('hide-for-small');
        burgerNav.classList.remove('hide-for-small');
        burgerNavIllus.classList.remove('hide-for-small');
        burgerBtn.classList.add('v_actif');
        burgerHeader.classList.add('v_burger-actif');
        menuBurgerChangelabel();
        burgerBtn.setAttribute('aria-expanded', true);


    } else {

        burgerMain.classList.remove('hide-for-small');
        burgerFooter.classList.remove('hide-for-small');
        burgerNav.classList.add('hide-for-small');
        burgerNavIllus.classList.add('hide-for-small');
        burgerBtn.classList.remove('v_actif');
        burgerHeader.classList.remove('v_burger-actif');
        menuBurgerChangelabel();
        burgerBtn.setAttribute('aria-expanded', false);

    }

}

if (burgerBtn) {
    burgerBtn.addEventListener('click', displayMenuBurger);
}