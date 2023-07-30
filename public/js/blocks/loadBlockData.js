const idBlock = getQueryParams('idBlock');
const blockHeader = document.getElementById('blockHeader');

window.addEventListener('load', () => getBlockData(idBlock));

async function getBlockData() {
	const response = await fetch(`/block/${idBlock}`);
	const data = await response.json();

	displayBlockData(data[0]);
	listAllTasksByBlockId();
}

function displayBlockData(block) {
	const isFavorite = Boolean(block.isFavorite.data[0]);

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
