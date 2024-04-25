import { text, attr, when } from '@shgysk8zer0/kazoo/dom.js';
import { getEvents as getAllEvents } from '@shgysk8zer0/kazoo/krv/events.js';
import { registerCustomElement } from '@shgysk8zer0/kazoo/custom-elements.js';
import { hasGa, send } from '@shgysk8zer0/kazoo/google-analytics.js';
import { callOnce, setUTMParams } from '@shgysk8zer0/kazoo/utility.js';
import { whenIntersecting } from '@shgysk8zer0/kazoo/intersect.js';
import { getString, setString, getInt, setInt } from '@shgysk8zer0/kazoo/attrs.js';
import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';
import template from './events.html.js';
import styles from './events.css.js';

const dateFormat = {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	timeZone: 'America/Los_Angeles',
	weekday: 'short',
	hour: 'numeric',
	minute: '2-digit',
};

const timeFormat = {
	timeStyle: 'short',
};

const getEvents = callOnce(() => getAllEvents());
const protectedData = new WeakMap();

function utm(url, { campaign, content = 'krv-events-el', medium, source, term }) {
	return setUTMParams(url, { campaign, content, medium, source, term }).href;
}

registerCustomElement('krv-events', class HTMLKRVEventsElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'closed' });
		const internals = this.attachInternals();
		protectedData.set(this, { shadow, internals });
		internals.role = 'document';
		internals.ariaLabel = 'Kern Valley Events Calendar';
	}

	get ready() {
		if (! protectedData.has(this)) {
			return when(this, 'ready');
		} else {
			return Promise.resolve();
		}
	}

	get whenConnected() {
		if (this.isConnected) {
			return Promise.resolve();
		} else {
			return when(this, 'connected');
		}
	}

	async connectedCallback() {
		this.dispatchEvent(new Event('connected'));

		if (this.loading === 'lazy') {
			await whenIntersecting(this);
		}

		const { shadow } = protectedData.get(this);

		shadow.adoptedStyleSheets = await Promise.all([
			new CSSStyleSheet().replace(styles),
		]);

		shadow.setHTML(template, sanitizer);
		const link = shadow.querySelector('.app-link');
		link.target = this.target;

		if (this.hasAttribute('source')) {
			link.href = utm(link.href, this);
		}

		this.dispatchEvent(new Event('ready'));

		this.render();
	}

	async render() {
		const now = new Date().toISOString();
		const [data] = await Promise.all([
			getEvents(),
			this.ready,
		]);

		const tmp = protectedData.get(this).shadow.getElementById('event-template').content;
		const { campaign, content, medium, source, term, target, tags } = this;

		const filter = tags.length !== 0
			? ({ endDate, keywords = [] }) => endDate > now && tags.some(tag => keywords.includes(tag))
			: ({ endDate }) => endDate > now;

		const events = data.filter(filter)
			.splice(0, this.count)
			.map(({ name, url, description, startDate, endDate, location }) => {
				const base = tmp.cloneNode(true);
				const container = document.createElement('div');
				const start = new Date(startDate);
				const end = new Date(endDate);
				const controller = new AbortController();

				function handler() {
					if (hasGa()) {
						send({
							hitType: 'event',
							eventCategory: 'krv-event',
							eventLabel: this.querySelector('.event-name').textContent,
							eventAction: 'open',
							transport: 'beacon',
						});
					} else {
						controller.abort();
					}
				}

				container.classList.add('event');

				attr('.event-url', { href: utm(url, { campaign, content, medium, source, term}), target }, { base }).forEach(a => {
					a.addEventListener('click', handler, { signal: controller.signal });
				});

				text('.event-name', name, { base });
				text('.event-description', description, { base });
				text('.event-start-time', start.toLocaleString(navigator.language, dateFormat), { base });
				attr('.event-start-time', { datetime: start.toISOString() }, { base });
				text('.event-end-time', end.toLocaleString(navigator.language,
					start.getDay() === end.getDay() ? timeFormat : dateFormat
				), { base });
				attr('.event-end-time', { datetime: end.toISOString() }, { base });

				if (typeof location !== 'undefined') {
					text('.event-location', location.name || location.address.addressLocality, { base });
				}

				container.append(base);
				return container;
			});

		if (events.length !== 0) {
			protectedData.get(this).shadow.getElementById('events-list').replaceChildren(...events);
		}
	}

	get count() {
		return getInt(this, 'count', { fallback: 5 });
	}

	set count(val) {
		setInt(this, 'count', val);
	}

	get content() {
		return getString(this, 'content', { fallback: 'krv-events' });
	}

	set content(val) {
		setString(this, 'content', val);
	}

	get loading() {
		return getString(this,'loading', { fallback: 'eager' });
	}

	set loading(val) {
		setString(this, 'loading', val);
	}

	get medium() {
		return getString(this, 'medium', { fallback: 'referral' });
	}

	set medium(val) {
		setString(this, 'medium',val);
	}

	get source() {
		return getString(this, 'source');
	}

	set source(val) {
		setString(this, 'source', val);
	}

	get target() {
		return getString(this, 'target', { fallback: '_self' });
	}

	get tags() {
		const tags = getString(this, 'tags');

		return typeof tags === 'string' && tags.length !== 0
			? tags.split(',').map(tag =>  tag.trim())
			: [];
	}

	set tags(val) {
		if (Array.isArray(val)){
			setString(this, 'tags', val.join(', '));
		} else {
			setString(this, 'tags',  val);
		}
	}

	set target(val) {
		setString(this, 'target', val);
	}

	get theme() {
		return getString(this, 'theme', { fallback: 'auto' });
	}

	set theme(val) {
		setString(this, 'theme', val);
	}

	get term() {
		return getString(this, 'term');
	}

	set term(val) {
		setString(this, 'term', val);
	}

	attributeChangedCallback(name/*, oldVal, newVal*/) {
		switch(name) {
			case 'count':
				this.render().catch(console.error);
				break;

			default:
				console.error(`Unhandled attribute changed: ${name}`);
		}
	}

	static get observedAttributes() {
		return ['count'];
	}
});
