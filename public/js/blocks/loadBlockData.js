const idBlock = getQueryParams('idBlock');
const blockHeader = document.getElementById('blockHeader');

window.addEventListener('load', () => getBlockData(idBlock));

async function getBlockData() {
	const idUser = getUserId();
	const response = await fetch(`/block/user/${idUser}/${idBlock}`);
	const data = await response.json();

	if(response.ok) {
		displayBlockData(data[0]);
		listAllTasksByBlockId();
	} else {
		document.querySelector('main h1').innerHTML = 'Erro 404 - Bloco não encontrado!';
		document.querySelector('main div').remove();
	}
}

function displayBlockData(block) {
	const isFavorite = Boolean(block.isFavorite);

	let icon = isFavorite ? 'ic:round-star' : 'ic:round-star-border';

	blockHeader.innerHTML = `
		${block.name}
		<span id="isFavoriteIcon" onclick=switchBlockToFavorite() class="iconify" data-icon="${icon}">
	`;
}

function getQueryParams(param) {
	const params = window.location.search.replace('?', '');
	const paramStartIndex = params.indexOf(param);

	let paramValue = params.slice(paramStartIndex, params.length);

	if(paramValue.indexOf('&') > 0) {
		paramValue = paramValue.slice(0, paramValue.indexOf('&'));
	}

	paramValue = paramValue.replace(`${param}:`, '');

	return paramValue;
}
