import { createElement } from '@shgysk8zer0/kazoo/elements.js';
import { konami } from '@shgysk8zer0/konami';
import { getJSON } from '@shgysk8zer0/kazoo/http.js';
import { description as setDescription } from '@shgysk8zer0/kazoo/meta.js';
import './components.js';

getJSON(import.meta.resolve('../../package.json')).then(({ name, version, description }) => {
	document.title = `${name} v${version}`;
	setDescription(description);
});

Promise.all([
	customElements.whenDefined('youtube-player'),
	konami(),
]).then(([YouTubePlayer]) => {
	const dialog = createElement('dialog', {
		events: { close: ({ target }) => target.remove() },
		children: [
			new YouTubePlayer('dQw4w9WgXcQ', { controls: true }),
			document.createElement('hr'),
			createElement('button', {
				type: 'button',
				classList: ['btn', 'btn-reject'],
				text: 'Close',
				events: { click: ({ target }) => target.closest('dialog').close() },
			})
		]
	});

	document.body.append(dialog);
	dialog.showModal();
});
