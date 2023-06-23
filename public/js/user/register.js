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
		createToast('Preencha todos os campos!', 'typcn:warning', '#E7584F');
		return false;
	}
	else if (password !== confirmPassword) {
		createToast('As senhas não coincidem!', 'typcn:warning', '#E7584F');
		return false;
	}
	else if (password.length < 8) {
		createToast('Sua senha deve ter pelo menos 8 caracteres!', 'typcn:warning', '#E7584F');
		return false;
	}
	else 
		return true;
}
