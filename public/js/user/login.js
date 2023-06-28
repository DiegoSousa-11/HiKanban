const USER_COOKIE_DURATION = 15; //User session duration in days
const form = document.forms[0];

form.addEventListener('submit', (event) => {
	event.preventDefault();
	login();
});

async function login() {
	const { email, password } = form;

	const valuesAreValid = inputsAreValid(email.value, password.value);

	if(valuesAreValid) {
		const login = {
			email: email.value,
			password: password.value
		};

		const response = await fetch('/user/authenticate', {
			method: 'POST',
			body: JSON.stringify(login),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if(response.status === 404) {
			return displayToast('Email e/ou senha incorretos!');
		}

		const data = await response.json();
		const user = data[0];

		setUserDataCookie(user);

		window.location.assign('../Workspace');
	}
}

function inputsAreValid(email, password) {
	if(!email || !password) {
		displayToast('Preencha todos os campos!');
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

function setUserDataCookie(user) {
	const encodedData = encodeURIComponent(JSON.stringify(user));
	const expirationDate = new Date();
  	expirationDate.setDate(expirationDate.getDate() + USER_COOKIE_DURATION);

	document.cookie = `user=${encodedData}; expires=${expirationDate.toUTCString()}; path=/`;
}
