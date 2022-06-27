const burgerBtn = document.getElementById('js_burger');
const burgernav = document.getElementById('js_nav');
const burgerMain = document.getElementById('js_main');
const burgerFooter = document.getElementById('js_footer');



function menuBurgerChangelabel() {
    let texteNouveau = burgerBtn.dataset.label;
    let texteActuel = burgerBtn.getAttribute('aria-label');
    burgerBtn.setAttribute('aria-label', texteNouveau);
    burgerBtn.setAttribute('data-label', texteActuel);
}



function displayMenuBurger() {
    
    if (burgernav.classList.contains('hide-for-small')) {

        burgerMain.classList.add('hide');
        burgerFooter.classList.add('hide');
        burgernav.classList.remove('hide-for-small');
        burgerBtn.classList.add('v_actif');
        menuBurgerChangelabel();
        burgerBtn.setAttribute('aria-expanded', true);


    } else {

        burgerMain.classList.remove('hide');
        burgerFooter.classList.remove('hide');
        burgernav.classList.add('hide-for-small');
        burgerBtn.classList.remove('v_actif');
        menuBurgerChangelabel();
        burgerBtn.setAttribute('aria-expanded', false);

    }

}

if (burgerBtn) {
    burgerBtn.addEventListener('click', displayMenuBurger);
}