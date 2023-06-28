const textUserName = document.getElementById('userName');

window.addEventListener('load', () => authenticateUser());

function authenticateUser() {
	const user = getCookie('user') && JSON.parse(getCookie('user'));

	if(!user) {
		return window.location.assign(window.location.origin + '/Login');
	}

	fillUserName(user);
}

function getCookie(name) {
	let cookies = document.cookie;
	cookies = decodeURIComponent(cookies);
	cookies = cookies.split('=');

	const cookieIndex = cookies.indexOf(name) + 1;

	return cookies[cookieIndex];
}

function fillUserName(user) {
	textUserName.innerHTML = user.name;
}
