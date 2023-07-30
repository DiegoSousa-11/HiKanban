const TO_DO_COLUMN = document.getElementById('TO_DO').querySelector('.tasksContainer');
const IN_PROGRESS_COLUMN = document.getElementById('IN_PROGRESS').querySelector('.tasksContainer');
const FINISHED_COLUMN = document.getElementById('FINISHED').querySelector('.tasksContainer');

let tasks = [];

async function listAllTasksByBlockId() {
	const response = await fetch(`/block/${idBlock}/listAllTasks`);
	const data = await response.json();

	tasks = data;

	displayAllTasks(data);
}

function displayAllTasks() {
	resetColumns();

	tasks.forEach((task) => {
		const { timeReaming, alertColor } = getTimeReamingAndAlertColor(task.endDate);

		let taskDateSection = `
			<div style='color: ${alertColor}' class='taskDate'>
				<span class="iconify" data-icon="icon-park-outline:time"></span>
				<p>${formatDate(new Date(task.endDate))} - ${timeReaming}</p>
			</div>
		`; 

		let textToDisplay = `
			<div onclick='openTaskModal(${task.idTask})' id=${task.idTask} draggable="true">
				<h4>${task.name}</h4>
				${task.endDate ? taskDateSection : ''}
			</div>
		`;

		if(task.status === 'TO_DO')
			TO_DO_COLUMN.innerHTML += textToDisplay;
		else if(task.status === 'IN_PROGRESS')
			IN_PROGRESS_COLUMN.innerHTML += textToDisplay;
		else 
			FINISHED_COLUMN.innerHTML += textToDisplay;
	});

	generateDragAndDrop();
}

function resetColumns() {
	TO_DO_COLUMN.innerHTML = '';
	IN_PROGRESS_COLUMN.innerHTML = '';
	FINISHED_COLUMN.innerHTML = '';
}

function formatDate(date) {
	const months = [
		"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
	];
	
	const day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
	const month = months[date.getMonth()];

	return `${day} de ${month}`;
}

function getTimeReamingAndAlertColor(date) {
	if(!date) 
		return false;

	const now = new Date();
	const timeDiffInMiliseconds = new Date(date) - now;

	const milisecondsPerDay = 1000 * 60 * 60 * 24;
	const differenceInDays = Math.floor(timeDiffInMiliseconds / milisecondsPerDay);

	let alertColor = '#666666';

	if(differenceInDays < 7) {
		alertColor = '#EC2E2E';
	} else if (differenceInDays < 15) {
		alertColor = '#E1D405';
	}
	
	let timeReaming;

	if(differenceInDays < 31) {
		if(differenceInDays < 0) {
			if(differenceInDays > -31) {
				timeReaming = `Atrasada ${Math.abs(differenceInDays)} dias`;
			} else {
				timeReaming = `Atrasada + de 1 mês`;
			}
		} else {
			timeReaming = `Faltam ${differenceInDays} dias`;
		}
	}

	return { timeReaming, alertColor };
}
