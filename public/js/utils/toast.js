window.addEventListener('load', () => document.head.innerHTML += '<link rel="stylesheet" href="css/toastStyle.css">')

function createToast(text, icon, color) {
	if(document.getElementById('toast'))
        return;

    progress = 0;

	let toast = `
		<div id='toast' class='toast' style='color: ${color};'>
			<div class='content'>
				<span style='color: ${color}; background-color: ${color}40;' class="iconify" data-icon="${icon}"></span>
				<strong>${text}</strong>
			</div>

			<div class='progressBar'>
				<div style='background-color: ${color};' id='toastProgressBar'></div>
			</div>
		</div>
	`;

	document.body.insertAdjacentHTML('afterbegin', toast);

	interval = setInterval(() => increaseProgress(), 60);
}

function increaseProgress() {
    if(progress === 100) {
		return removeToast();
    }

    const toastProgressBar = document.getElementById('toastProgressBar');
	
    progress++;

    toastProgressBar.style.width = progress + '%';
}

function removeToast() {
	document.body.querySelector('#toast').remove();
    clearInterval(interval);
    progress = 0;
}
