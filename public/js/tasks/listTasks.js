const TO_DO_COLUMN = document.getElementById('TO_DO').querySelector('.tasksContainer');
const IN_PROGRESS_COLUMN = document.getElementById('IN_PROGRESS').querySelector('.tasksContainer');
const FINISHED_COLUMN = document.getElementById('FINISHED').querySelector('.tasksContainer');

const fkBlock = window.location.search.replace('?idBlock:', '');
let tasks;

window.addEventListener('load', () => listAllTasksByBlockId());

async function listAllTasksByBlockId() {
	const response = await fetch(`/block/${fkBlock}/listAllTasks`);
	const data = await response.json();
	tasks = data;

	displayAllTasks();
}

function displayAllTasks() {
	resetColumns();

	tasks.forEach((task) => {
		if(task.status === 'TO_DO')
			TO_DO_COLUMN.innerHTML += `
				<div id=${task.idTask} draggable="true">
					<h4>${task.name}</h4>
				</div>	
			`;
		else if(task.status === 'IN_PROGRESS')
			IN_PROGRESS_COLUMN.innerHTML += `
				<div id=${task.idTask} draggable="true">
					<h4>${task.name}</h4>
				</div>	
			`;
		else 
			FINISHED_COLUMN.innerHTML += `
				<div id=${task.idTask} draggable="true">
					<h4>${task.name}</h4>
				</div>	
			`;
	});

	generateDragAndDrop();
}

function resetColumns() {
	TO_DO_COLUMN.innerHTML = '';
	IN_PROGRESS_COLUMN.innerHTML = '';
	FINISHED_COLUMN.innerHTML = '';
}
