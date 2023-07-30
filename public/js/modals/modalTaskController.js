const taskModal = document.getElementById('taskModal');
const closeTaskModalButton = document.getElementById('closeTaskModalButton');
const modalContainer = taskModal.querySelector('.modalContainer');
const taskForm = taskModal.querySelector('form');

const textAreaModal = modalContainer.querySelector('textarea');

const taskDateLabel = taskForm.querySelector('#endDate');
const taskDateInput = taskForm.querySelector('input[type="datetime-local"]');

taskDateLabel.addEventListener('click', () => {
    taskDateInput.showPicker();
});

taskForm.addEventListener('submit', (event) => event.preventDefault());

closeTaskModalButton.addEventListener('click', () => closeTaskModal());

taskDateInput.addEventListener('change', () => updateDateValues(taskDateInput.value));

function openTaskModal(taskId) {
    const task = tasks.find(task => task.idTask === taskId);
    fillTaskData(task);

    taskModal.style.display = 'flex';
}

function closeTaskModal() {
    taskModal.style.display = 'none';
}

function fillTaskData(task) {
    modalContainer.querySelector('h1').innerText = task.name;
    modalContainer.querySelector('.status h4').innerText = `Status: ${getTaskStatus(task)}`;

    updateDateValues(task.endDate);

    textAreaModal.value = task.description;

    modalContainer.querySelector('.trashButton').onclick = () => deleteTask(task.idTask);
    modalContainer.querySelector('.saveButton').onclick = () => updateTaskData(task.idTask);
}

function formatDateToInput(date) {
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();

    const dateString = `${year}-${month}-${day}`;
    const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();

    return `${dateString}T${hours}:${minutes}`;
}

function getTaskStatus(task) {
    switch (task.status) {
        case 'TO_DO':
            return 'À fazer';
        case 'IN_PROGRESS':
            return 'Em andamento';
        case 'FINISHED':
            return 'Finalizado';
    }
}

function updateDateValues(date) {
    const endDate = new Date(date);
    const timeReamingContainer = modalContainer.querySelector('.endDateInformation #timeReaming');
    const { timeReaming, alertColor } = getTimeReamingAndAlertColor(date);

    if(date) {
        modalContainer.querySelector('.endDateInformation label p').innerText = formatDate(endDate);
        taskDateInput.value = formatDateToInput(endDate);
    } else {
        modalContainer.querySelector('.endDateInformation label p').innerText = 'Não definida';
    }

    if(timeReaming) {
        timeReamingContainer.innerText = timeReaming;
        timeReamingContainer.style.display = 'flex';
        timeReamingContainer.style.color = alertColor;
        timeReamingContainer.style.backgroundColor = alertColor + '28';
    } else {
        timeReamingContainer.style.display = 'none';
    }
}

async function deleteTask(idTask) {
    const response = await fetch(`/task/${idTask}`, {
        method: 'DELETE'
    });

    if(response.ok) {
		createToast('Tarefa deletada com sucesso!', 'fe:check', '#006432');

        const deleteTaskIndex = tasks.findIndex((task) => task.idTask === idTask);
        tasks.splice(deleteTaskIndex, 1); 

        displayAllTasks();
    } else {
        showErrorToast('Não foi possível deletar a tarefa!');
    }

    closeTaskModal();
}

function changeTextAreaEditionMode() {
    let textAreaLockIcon = document.getElementById('taskDescriptionLock');
    if(textAreaModal.disabled === true) {
        textAreaLockIcon.setAttribute("data-icon", "material-symbols:lock-open");
        enableEditionTextAreaMode();
    } else {
        textAreaLockIcon.setAttribute("data-icon", "material-symbols:lock");
        disableEditionTextAreaMode(); 
    }
}

function enableEditionTextAreaMode() {
    textAreaModal.disabled = false;
}

function disableEditionTextAreaMode() {
    textAreaModal.disabled = true;
}
