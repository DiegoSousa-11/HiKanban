const carouselControllers = document.getElementById('carouselControllers');

function loadControllers(quantityItems) {
    for(let i = 0; i < quantityItems; i++) {
        carouselControllers.innerHTML += `${i === 0 ? `<div onclick="changeCarouselPage(${i})" class="currentPage"></div>` : `<div onclick="changeCarouselPage(${i})"></div>`}`;
    }
}

function changeCarouselPage(newPage) {
    carouselContainer.style.marginLeft = -(newPage * 47.5) + 'vw';
}
