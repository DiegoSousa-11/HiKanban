const form = document.forms[0];
const createBlockButton = document.getElementById('createBlockButton');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	createBlock();
})

async function createBlock() {
	const { name, colorPicker, isFavorite } = form;

	const nameIsValid = checkBlockName(name.value);

	if(nameIsValid) {
		const block = {
			name: name.value,
			color: colorPicker.value,
			isFavorite: isFavorite.checked,
			fkUser: getUserId()
		}

		const response = await fetch('/block', {
			method: 'POST',
			body: JSON.stringify(block),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		console.log(response);

		if(response.ok)
			createToast('Bloco cadastrado com sucesso!', 'fe:check', '#006432');
		else 
			showErrorToast('Não foi possível efetuar o cadastro do bloco!');
	}
}

function checkBlockName(value) {
	if(!value) {
		showErrorToast('Preencha o nome do bloco!');
		return false;
	}

	if(value.length > 45) {
		showErrorToast('O nome do bloco é muito grande!');
		return false;
	}

	return true;
}
