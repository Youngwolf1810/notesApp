const noteText = document.querySelector('textarea');
const noteTitle = document.querySelector('input[type="text"]');
const add = document.querySelector('#add');
const notes = document.querySelector('#notes');

const popup = document.querySelector('#popup-1');
const content = document.querySelector('.content');

let date;

// fn. for adding a note
const addNote = () => {
	add.addEventListener('click', () => {
		let value = noteText.value;
		let key = noteTitle.value.replace(/\s/g, '_');

		if (value == '' || key == '') return;

		let dateTime = timeStamp();

		noteText.value = '';
		noteTitle.value = '';

		let obj = {
			value: value,
			time: dateTime
		};

		let flag = 0;

		if (localStorage.getItem(key) != null) flag = 1;

		localStorage.setItem(key, JSON.stringify(obj));

		display(key, flag);
	});
};

// fn. for deleting a node

const deleteNote = function() {
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('delete')) {
			let key = e.target.dataset.value;

			confirm(key);
		}
	});
};

// fn. for editing a particular note
const editNote = () => {
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('edit')) {
			let key = e.target.dataset.value;

			let value = JSON.parse(localStorage.getItem(key)).value;

			noteTitle.value = key;

			noteText.value = value;
		}
	});
};

// fn. for displaying newly created note
const display = (key, flag) => {
	let item = JSON.parse(localStorage.getItem(key));

	let val = item.value;
	let time = item.time;

	if (flag == 0) {
		let div = document.createElement('div');

		viewNote(div, key, val, time);

		div.classList.add('card');

		notes.appendChild(div);
	} else {
		const temp = document.querySelector(`[data-value="${key}"]`);

		viewNote(temp.parentNode, key, val, time);
	}
};

// fn. for displaying previously created notes
const init = () => {
	notes.innerHTML = '';
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);

		let item = JSON.parse(localStorage.getItem(key));

		let val = item.value;
		let time = item.time;

		let div = document.createElement('div');

		viewNote(div, key, val, time);

		div.classList.add('card');

		notes.appendChild(div);
	}
};

// html for a particular note
const viewNote = (root, key, val, time) => {
	root.innerHTML = `<h4>${key}</h4><h5>${time}</h5><p>${val}</p>
	<button data-value=${key} class='delete'>delete</button>
	<button data-value=${key} class='edit'>edit</button>`;
};

// fn. for getting current timestamp
const timeStamp = () => {
	date = new Date().toLocaleString('en-us', {
		month: 'long',
		year: 'numeric',
		day: '2-digit',
		weekday: 'long',
		hour: '2-digit',
		minute: '2-digit'
	});
	return date;
};

// displaying quickstart popup
window.onload = () => {
	let h3 = document.createElement('h1');
	let start = document.createElement('button');

	start.innerText = 'Get Started';
	start.addEventListener('click', togglePopup);

	h3.innerText = 'Welcome to notesApp!! Take notes on the go!!!!!!!!';

	content.append(h3, start);

	togglePopup();
};

// fn. for confirming user's actions
const confirm = (key) => {
	content.innerHTML = '';

	let h3 = document.createElement('h1');
	let yes = document.createElement('button');
	let no = document.createElement('button');

	yes.innerText = 'Yes';
	no.innerText = 'No';

	yes.addEventListener('click', () => {
		togglePopup();
		localStorage.removeItem(key);
		init();
	});

	no.addEventListener('click', togglePopup);

	h3.innerText = 'Are you sure you want to delete?';

	content.append(h3, yes, no);

	togglePopup();
};

const togglePopup = () => {
	popup.classList.toggle('active');
};

init();

addNote();

deleteNote();

editNote();
