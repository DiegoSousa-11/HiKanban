const addBlockButton = document.getElementById('addBlockButton');
const createBlockModal = document.getElementById('createBlockModal');
const closeModalButton = document.getElementById('closeModalButton');

function openModal() {
	createBlockModal.style.display = 'flex';
}

function closeModal() {
	createBlockModal.style.display = 'none';
}

addBlockButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
