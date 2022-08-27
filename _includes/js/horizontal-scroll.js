let scrollX = document.querySelectorAll('.js_scroll-x');
const mouseWheelEvt = function (event) {
    this.scrollLeft += event.deltaY;

    //Arrêter le défilement vertical par défaut jusqu'à ce que l'horizontal soit terminé
    if ( this.scrollWidth - this.clientWidth != this.scrollLeft){
        if(this.scrollLeft > 0) {
            event.preventDefault();
        }
    }
}

const addClass = function() {
    this.classList.add('sst-u');
}

const removeClass = function() {
    this.classList.remove('sst-u');
}

scrollX = Array.prototype.slice.call(scrollX);

scrollX.forEach(function(element) {
    element.addEventListener("wheel", mouseWheelEvt);
    element.addEventListener("mouseover", addClass);
    element.addEventListener("mouseout", removeClass);
})