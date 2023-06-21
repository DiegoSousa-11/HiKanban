const carouselContainer = document.getElementById('carouselContainer');

window.addEventListener('load', () => loadCarouselItems());

async function loadCarouselItems() {
    const response = await fetch('../../json/carouselItems.json');
    const data = await response.json();

    fillCarousel(data);
}

function fillCarousel(data) {
    data.forEach(item => {
        carouselContainer.innerHTML += `
            <div style='background-image: url(${item.imageURL})' class="carouselItem">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `;
    });

    loadControllers(data.length);
}
