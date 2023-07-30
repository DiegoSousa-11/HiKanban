const newTaskName = document.getElementById('nameTaskModal');

async function updateTaskData(taskId) {
    const taskIndex = tasks.findIndex((task) => task.idTask === taskId);
    const editedData = getEditedData(taskIndex);
    
    if(Object.keys(editedData).length === 0) {
        return showErrorToast('Você não editou nenhum dado!');
    }

    const response = await fetch(`/task/${taskId}/updateTaskData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedData)
    });

    if(response.ok) {
		createToast('Tarefa atualizada com sucesso!', 'fe:check', '#006432');
        updateTaskList(editedData, taskIndex);
    } else {
        showErrorToast('Não foi possível atualizar a tarefa!');
    }
}

function getEditedData(taskIndex) {
    let editedData = {};

    const nameIsBeingEditing = newTaskName.innerText !== tasks[taskIndex].name;
    const endDateIsBeingEditing = new Date(taskDateInput.value).toISOString() !== tasks[taskIndex].endDate;
    const descriptionIsBeingEditing = textAreaModal.value !== tasks[taskIndex].description;

    if(nameIsBeingEditing) {
        editedData.name = newTaskName.innerText;
    }

    if(endDateIsBeingEditing) {
        editedData.endDate = taskDateInput.value;
    }

    if(descriptionIsBeingEditing) {
        editedData.description = textAreaModal.value;
    }

    return editedData;
}

function updateTaskList(editedData, taskIndex) {
    editedData.name && (tasks[taskIndex].name = editedData.name);
    editedData.endDate && (tasks[taskIndex].endDate = editedData.endDate);
    editedData.description && (tasks[taskIndex].description = editedData.description);

    displayAllTasks();
}
