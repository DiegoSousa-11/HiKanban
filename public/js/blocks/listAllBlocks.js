const blocksContainer = document.getElementById('blocksContainer');

window.addEventListener('load', () => {
	const pageName = window.location.pathname.replaceAll('/', '');
	const onlyFavorites = pageName === 'Favorites';

	getUserBlocks(onlyFavorites);
});

async function getUserBlocks(onlyFavorites) {
	const userId = getUserId();

	const url = onlyFavorites ? `/block/listFavoriteBlocks/${userId}` : `/block/listAllBlocks/${userId}`;
	const response = await fetch(url);
	const data = await response.json();

	if(data.length > 0) {
		displayAllUserBlocks(data);
	} 
}

function displayAllUserBlocks(data) {
	blocksContainer.innerHTML = '';

	data.forEach(block => {
		blocksContainer.innerHTML += `
			<div onclick='openBlock(${block.idBlock})' style='background-color: ${block.color}' class="block">
				<div>
					<h3>${block.name}</h3>
				</div>
			</div>
		`;
	});
}

function openBlock(blockId) {
	window.location.assign(`/Workspace/Blocks?idBlock:${blockId}`)
}
