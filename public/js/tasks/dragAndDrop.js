var draggedItem;
var draggedItemClone;
var draggedItemPosition = { x: null, y: null };

function generateDragAndDrop() {
	const allTasks = document.querySelectorAll('.tasksContainer div');
	const columns = document.querySelectorAll('.columns section');

	allTasks.forEach((task) => {
		task.addEventListener('dragstart', (event) => {
			event.dataTransfer.setDragImage(new Image(), 0, 0);

			draggedItem = task;
			
			draggedItemClone = task.cloneNode(true);
			task.parentNode.appendChild(draggedItemClone);
			draggedItemClone.style.position = 'absolute';
			draggedItemClone.style.width = `${task.clientWidth}px`;

			task.classList.add('draggable');
			
			draggedItemPosition.x = task.offsetLeft;
			draggedItemPosition.y = columns[0].offsetTop + 50;

			let x = event.clientX - draggedItemPosition.x;
			let y = event.clientY - draggedItemPosition.y;

			draggedItemClone.style.transform = `translate(${x}px, ${y}px)`;
		});
		
		task.addEventListener('drag', (event) => {
			let x = event.clientX - draggedItemPosition.x;
			let y = event.clientY - draggedItemPosition.y;
			
			draggedItemClone.style.transform = `translate(${x}px, ${y}px)`;
		});

		task.addEventListener('dragend', (event) => {
			task.classList.remove('draggable');
			draggedItemClone.remove();

			draggedItemPosition = { x: null, y: null };
			draggedItemClone = null;
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
}
