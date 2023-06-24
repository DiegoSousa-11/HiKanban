const form = document.forms[0];

form.addEventListener('submit', (event) => event.preventDefault());

async function registerUser() {
	const { name, email, password, confirmPassword } = form;

	const valuesAreValid = inputsAreValid(name.value, email.value, password.value, confirmPassword.value);

	if(valuesAreValid) {
		alert('Valido!');
	}
}

function inputsAreValid(name, email, password, confirmPassword) {
	if(!name || !email || !password || !confirmPassword) {
		displayToast('Preencha todos os campos!');
		return false;
	}

	if (password !== confirmPassword) {
		displayToast('As senhas não coincidem!');
		return false;
	}
	
	if (password.length < 8) {
		displayToast('Sua senha deve ter pelo menos 8 caracteres!');
		return false;
	}
	
	return true;
}

function displayToast(message) {
	createToast(message, 'typcn:warning', '#E7584F');
}
