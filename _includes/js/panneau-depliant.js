//********************************************//
//  $$ ACCESSIBILITÉ - PANNEAUX DÉPLIANTS
/*
L’attribut aria-expanded doit être appliqué sur le bouton qui contrôle le panneau dépliant. Sa valeur doit être renseignée dynamiquement en fonction de l’état du panneau dépliant associé :
aria-expanded="true" lorsque le panneau est déplié.
aria-expanded="false" lorsque le panneau est plié.
Interactions au clavier : "Entrée" et "Espace"
 */
//********************************************//
document.addEventListener('DOMContentLoaded', function () {

    var panneauDepliant = document.querySelectorAll(".js_panneau-depliant");

    function basculeAriaExpanded(e) {
        if ( e.getAttribute("aria-expanded") === "false" ) {
            e.setAttribute('aria-expanded', true);
        } else {
            e.setAttribute('aria-expanded', false);
        }
    }

    for (var i = 0; i < panneauDepliant.length; i++) {

        // Valeur par défaut de la propriété "aria-expanded"
        if ( panneauDepliant[i].tagName === "INPUT" ) {
            if ( panneauDepliant[i].checked ) {
                panneauDepliant[i].setAttribute('aria-expanded', true);
            } else {
                panneauDepliant[i].setAttribute('aria-expanded', false);
            }
        } else {
            panneauDepliant[i].setAttribute('aria-expanded', false);
        }

        // L'interaction au clavier doit fonctionner avec la touche "espace" (par défaut) et "entrée"
        panneauDepliant[i].addEventListener("keydown", function(event) {
            if ( this.tagName === "INPUT") {
                if (event.code === "Enter") {
                    this.click();
                }
            }
        });

        // Bascule de la valeur de la propriété "aria-expanded" en true/false
        panneauDepliant[i].addEventListener("click", function(event) {

            if ( this.tagName === "INPUT" && this.getAttribute("type") === "radio" ) {
                // cas input radio multiple
                var nameInput = this.getAttribute("name");
                var autreRadios = document.querySelectorAll('input[type="radio"][name="'+ nameInput +'"]');
                for (var i = 0; i < autreRadios.length; i++) {
                    autreRadios[i].setAttribute('aria-expanded', false);
                }
                basculeAriaExpanded(this);
            } else {
                // autre cas
                basculeAriaExpanded(this);
            }


        });
    }

});