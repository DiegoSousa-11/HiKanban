const form = document.forms[0];

form.addEventListener('submit', (event) => {
	event.preventDefault();
	registerUser();
});

async function registerUser() {
	const { name, email, password, confirmPassword } = form;

	const valuesAreValid = inputsAreValid(name.value, email.value, password.value, confirmPassword.value);

	if(valuesAreValid) {
		const user = {
			name: name.value,
			email: email.value,
			password: password.value
		}

		const response = await fetch('/user', { 
			method: 'POST', 
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			},
		});

		const data = await response.json();

		if(response.ok)
			createToast('Usuário cadastrado com sucesso!', 'fe:check', '#006432');
		else if (data.code === 'ER_DUP_ENTRY')
			showErrorToast('Esse email já foi cadastrado no sistema!');
		else 
			showErrorToast('Não foi possível efetuar o cadastro!');
	}
}

function inputsAreValid(name, email, password, confirmPassword) {
	if(!name || !email || !password || !confirmPassword) {
		showErrorToast('Preencha todos os campos!');
		return false;
	}

	if (password !== confirmPassword) {
		showErrorToast('As senhas não coincidem!');
		return false;
	}
	
	if (password.length < 8) {
		showErrorToast('Sua senha deve ter pelo menos 8 caracteres!');
		return false;
	}
	
	return true;
}
