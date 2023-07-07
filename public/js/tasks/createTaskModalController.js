const addTaskButton = document.getElementById('addTaskButton');
const createTaskModal = document.getElementById('createTaskModal');
const closeModalButton = document.getElementById('closeModalButton');

function openModal(column) {
	createTaskModal.style.display = 'flex';
	
	if(column == 'TO_DO')
		createTaskModal.querySelector('h1').innerHTML = 'Adicionar tarefa a ser feita';
	else if(column == 'IN_PROGRESS')
		createTaskModal.querySelector('h1').innerHTML = 'Adicionar tarefa em andamento';
	else 
		createTaskModal.querySelector('h1').innerHTML = 'Adicionar tarefa já finalizada';

	createTaskModal.querySelector('button').addEventListener('click', () => createTask(column));
}

function closeModal() {
	createTaskModal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);
