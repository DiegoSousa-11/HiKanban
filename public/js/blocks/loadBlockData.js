const fkBlock = getQueryParams('idBlock');
const blockHeader = document.getElementById('blockHeader');

window.addEventListener('load', () => getBlockData(fkBlock));

async function getBlockData() {
	const response = await fetch(`/block/${fkBlock}`);
	const data = await response.json();

	displayBlockData(data[0]);
	listAllTasksByBlockId();
}

function displayBlockData(block) {
	blockHeader.innerHTML = `
		${block.name}
		${block.isFavorite ? '<span class="iconify" data-icon="ic:round-star">' : '<span class="iconify" data-icon="ic:round-star-border">'}
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
