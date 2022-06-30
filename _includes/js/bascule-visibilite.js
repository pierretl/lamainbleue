//********************************************//
//  $$ BASCULE VISIBITE
/*
S'appuie sur "panneau-depliant.js" pour les intéractions
*/
//********************************************//
document.addEventListener('DOMContentLoaded', function () {

    var btnBascule = document.querySelectorAll(".js_bascule-visibilite__btn");

    for (var i = 0; i < btnBascule.length; i++) {

        btnBascule[i].addEventListener("click", function(event) {

            var textePassif = this.querySelector('.js_bascule-visibilite__passif');
            var texteActif = this.querySelector('.js_bascule-visibilite__actif');
            var classeCssActifBtn = this.dataset.classeActif;
            if (this.querySelector('svg')) {
                var classeCssActifSvg = this.querySelector('svg').dataset.classeActif;
            }
            var zone = document.querySelector("[data-zone='" + this.dataset.zone + "'].js_bascule-visibilite__zone");

            if (this.getAttribute("aria-expanded") === "false") {
                //passif
                if(textePassif){
                    textePassif.classList.remove('hide');
                }
                if (texteActif) {
                    texteActif.classList.add('hide');
                }
                this.classList.remove(classeCssActifBtn);
                if (classeCssActifSvg) {
                    this.querySelector('svg').classList.remove(classeCssActifSvg);
                }
                zone.classList.add('hide');
            } else {
                //actif
                if(textePassif) {
                    textePassif.classList.add('hide');
                }
                if (texteActif) {
                    texteActif.classList.remove('hide');
                }
                this.classList.add(classeCssActifBtn);
                if (classeCssActifSvg) {
                    this.querySelector('svg').classList.add(classeCssActifSvg);
                }
                zone.classList.remove('hide');

            }
        });
    }

});