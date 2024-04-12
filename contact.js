import { registerCustomElement } from '@shgysk8zer0/kazoo/custom-elements.js';
import { on } from '@shgysk8zer0/kazoo/dom.js';
import { send } from '@shgysk8zer0/kazoo/slack.js';
import { whenIntersecting } from '@shgysk8zer0/kazoo/intersect.js';
import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';
import { formStyles } from './styles/forms.js';
import template from './contact.html.js';
import styles from './contact.css.js';
const ENDPOINT = 'https://contact.kernvalley.us/api/slack';

const symbols = {
	shadow: Symbol('shadow'),
	internals: Symbol('internals'),
};

registerCustomElement('krv-contact', class HTMLKRVContactElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'closed' });
		this[symbols.shadow] = shadow;

		if (HTMLElement.prototype.attachInternals instanceof Function) {
			this[symbols.internals] = this.attachInternals();
			this[symbols.internals].states.add('--loading');
		}

		this.addEventListener('error', console.error);

	}

	async connectedCallback() {
		await whenIntersecting(this);
		const shadow = this[symbols.shadow];

		shadow.adoptedStyleSheets = await Promise.all([
			formStyles,
			new CSSStyleSheet().replace(styles),
		]);

		shadow.setHTML(template, sanitizer);

		on(shadow.querySelector('form'), {
			reset: () => this.dispatchEvent(new Event('reset')),
			submit: async event => {
				event.preventDefault();
				const target = event.target;
				const data = new FormData(target);

				try {
					const resp = await send(ENDPOINT, {
						name: data.get('name'),
						email: data.get('email'),
						phone: data.get('phone'),
						url: data.get('url'),
						subject: data.get('subject'),
						body: data.get('body'),
					});

					if (resp.success) {
						this.dispatchEvent(new Event('sent'));
						if (this.hasOwnProperty(symbols.internals)) {
							this[symbols.internals].states.delete('--error');
							this[symbols.internals].states.add('--sent');
						}
						target.reset();
					} else {
						throw new Error(`<${resp.url}> [${resp.status} ${resp.statusText}]`);
					}
				} catch(error) {
					if (this.hasOwnProperty(symbols.internals)) {
						this[symbols.internals].states.delete('--sent');
						this[symbols.internals].states.add('--error');
					}

					this.dispatchEvent(new ErrorEvent('error', {
						error,
						message: 'Error submitting form',
					}));
				}
			}
		});

		this.dispatchEvent(new Event('ready'));

		if (this.hasOwnProperty(symbols.internals)) {
			this[symbols.internals].states.delete('--loading');
			this[symbols.internals].states.add('--ready');
		}
		this.dispatchEvent(new Event('connected'));
	}

	get ready() {
		if (this[symbols.shadow].childElementCount > 2) {
			return Promise.resolve();
		} else {
			return new Promise(resolve => this.addEventListener('ready', () => resolve(), { once: true }));
		}
	}

	get whenConnected() {
		if (this.isConnected) {
			return Promise.resolve();
		} else {
			return new Promise(resolve => this.addEventListener('connected', () => resolve(), { once: true}));
		}
	}

	set subject(val) {
		this.ready.then(() => this[symbols.shadow].getElementById('krv-contact-subject').value = val);
	}

	set body(val) {
		this.ready.then(() => this[symbols.shadow].getElementById('krv-contact-body').value = val);
	}

	set url(val) {
		this.ready.then(() => this[symbols.shadow].getElementById('krv-contact-url').value = val);
	}

	/**
	 * Based on https://developer.chrome.com/articles/web-share-target/
	 */
	static fromSearchParams({ title = 'title', text = 'text', url = 'url' } = {}) {
		const contactForm = new HTMLKRVContactElement();
		const params = new URLSearchParams(location.search);
		contactForm.subject = params.get(title);
		contactForm.body = params.get(text);
		contactForm.url = params.get(url);
		return contactForm;
	}
});
