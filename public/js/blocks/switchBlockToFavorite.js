async function switchBlockToFavorite() {
    const isFavoriteIcon = document.getElementById('isFavoriteIcon');
    let isFavorite = isFavoriteIcon.getAttribute('data-icon') === 'ic:round-star';

    const response = await fetch(`/block/${idBlock}/switchBlockToFavorite`, {
        method: 'PATCH',
    });

    if(response.ok) {
        isFavorite = !isFavorite;
        const message = isFavorite ? 'Bloco adicionado aos favoritos' : 'Bloco removido dos favoritos';
		createToast(message, 'fe:check', '#006432');

        isFavoriteIcon.setAttribute('data-icon', isFavorite ? 'ic:round-star' : 'ic:round-star-border');     
    }
}
