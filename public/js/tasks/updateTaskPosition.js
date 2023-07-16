async function updateTasksOrder(targetTaskId, newPosition) {
	const response = await fetch(`/task/updateTasksOrder?targetTaskId=${targetTaskId}&newPosition=${newPosition}`, {
		method: 'PATCH',
	});

	if(!response.ok) {
		showErrorToast('Não foi possível reposicionar a tarefa!');
	}
}

async function updateTaskColumn(targetTaskId, positionInNewColumn, newColumn) {
	const response = await fetch(`/task/updateTaskColumn?targetTaskId=${targetTaskId}&positionInNewColumn=${positionInNewColumn}&newStatus=${newColumn}`, {
		method: 'PATCH',
	});

	if(!response.ok) {
		showErrorToast('Não foi possível reposicionar a tarefa!');
	}
}
