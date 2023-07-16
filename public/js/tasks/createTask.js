const form = document.forms[0];

form.addEventListener('submit', (event) => event.preventDefault());

async function createTask(column) {
	const { name, description, endDate } = form;

	const nameIsValid = checkTaskName(name.value);

	if(nameIsValid) {
		const task = {
			name: name.value,
			description: description.value,
			endDate: endDate.value,
			fkUser: getUserId(),
			status: column
		}

		const response = await fetch(`/block/${fkBlock}/createTask`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		});

		if(response.ok) {
			closeModal();
			createToast('Tarefa criada com sucesso!', 'fe:check', '#006432');
			listAllTasksByBlockId();
			clearFormData();
		} else {
			showErrorToast('Não foi possível criar a tarefa!')
		}

	}
}

function clearFormData() {
	const fields = form.querySelectorAll('input');

	fields.forEach((field) => {
		field.value = '';
	});
}

function checkTaskName(name) {
	if(!name.trim()) {
		showErrorToast('Preencha o nome da tarefa!');
		return false;
	}
	
	return true;
}
