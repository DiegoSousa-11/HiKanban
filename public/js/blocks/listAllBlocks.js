const blocksContainer = document.getElementById('blocksContainer');

window.addEventListener('load', () => {
	getUserBlocks();
});

async function getUserBlocks() {
	const userId = getUserId();

	const response = await fetch(`/block/listAllBlocks/${userId}`);
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
