const allTasks = document.querySelectorAll('.tasksContainer div');
const columns = document.querySelectorAll('.columns section');

var draggedItem;

allTasks.forEach((task) => {
    task.addEventListener('dragstart', (event) => {
        event.dataTransfer.setDragImage(new Image(), 0, 0);

        draggedItem = task;
    });
    
    task.addEventListener('drag', (event) => {
        let x = event.layerX;
        let y = event.layerY;

        draggedItem.style.transform = `translate(${x}px, ${y}px)`;
    });

    task.addEventListener('dragend', (event) => {
        draggedItem.style.transform = '';
        draggedItem = null;
    });

    task.addEventListener('dragover', (event) => {
        event.preventDefault();

        if (task !== draggedItem) {
            const rect = task.getBoundingClientRect();
            const taskCenterY = rect.top + rect.height / 2;

            if (event.clientY < taskCenterY) {
                task.insertAdjacentElement('beforebegin', draggedItem);
            } else {
                task.parentElement.insertBefore(draggedItem, task.nextSibling);
            }
        }
    });
});

columns.forEach((item) => {
    item.addEventListener('dragover', (event) => {
        event.preventDefault();

        const draggedItemContainer = draggedItem.parentElement;
        const currentContainer = item.querySelector('.tasksContainer');

        if(draggedItemContainer != currentContainer) {
            event.preventDefault();

            item.querySelector('.tasksContainer').appendChild(draggedItem);
        }
    });
});
