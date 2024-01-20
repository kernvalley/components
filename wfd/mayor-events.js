import { getJSON } from '@shgysk8zer0/kazoo/http.js';
import { createElement, createSlot } from '@shgysk8zer0/kazoo/elements.js';
import { light, dark } from '@shgysk8zer0/jss/palette/gnome.js';
import { whenIntersecting } from '@shgysk8zer0/kazoo/intersect.js';
import { getString, setString } from '@shgysk8zer0/kazoo/attrs.js';
import {
	createCalendarIcon, createLinkExternalIcon, createMarkLocationIcon,
	createPersonIcon,
} from '@shgysk8zer0/kazoo/icons.js';

const DATETIME_FORMAT = {
	year: 'numeric',
	month: 'short',
	weekday: 'short',
	day: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
};

const STYLES = `
	:host {
		display: block;
		line-height: 1.5;
		font-family: system-ui;
		color-scheme: light dark;
		overflow: auto;
		background-color: ${light[0]};
		color: ${dark[3]};
	}

	:host([theme="light"]) {
		color-scheme: light;
	}

	:host([theme="dark"]) {
		color-scheme: dark;
		background-color: ${dark[3]};
		color: ${light[1]};
	}

	:host(:not([showdescription])) .event-description {
		display: none;
	}

	:host(:not([showaddress])) .event-address {
		display: none;
	}

	.heading {
		font-size: 1.8em;
		font-weight: bolder;
	}

	.center {
		text-align: center;
	}

	.container {
		margin-top: 1.2em;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 430px));
		gap: 13px;
	}

	.event-container {
		margin-top: 0.8em;
		padding: 1.2em;
		border: 1px solid ${light[3]};
		background-color: ${light[1]};
		color: ${dark[3]};
		border-radius: 12px;
	}

	:host([theme="dark"]) .event-container {
		border: 1px solid ${dark[1]};
		background-color: ${dark[2]};
		color: ${light[1]};
	}

	.event-link {
		color: inherit;
		text-decoration: none;
	}

	.event-name {
		font-weight: bold;
		font-size: 1.3em;
		text-wrap: balance;
	}

	.mayor-name {
		font-weight: bold;
		font-size: 1.1em;
		text-wrap: balance;
		text-decoration: underline;
	}

	.event-location {
		font-weight: bold;
		font-size: 1.1em;
	}

	.icon {
		height: 1em;
		width: auto;
		margin-right: 13px;
		vertical-align: baseline;
	}
`;

const DARK_STYLES = `
	:host(:not([theme="light"])){
		background-color: ${dark[3]};
		color: ${light[1]};
	}

	:host(:not([theme="light"])) .event-container {
		border: 1px solid ${dark[1]};
		background-color: ${dark[2]};
		color: ${light[1]};
	}
`;

const slugify = str => str.toString().toLowerCase().replaceAll(/\W+/g, '-');

const isString = thing => typeof thing === 'string' && thing.length !== 0;

customElements.define('wfd-mayor-events', class HTMLWFDMayorEvents extends HTMLElement {
	#internals;
	#shadow;

	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: 'closed' });
		this.#internals = this.attachInternals();
		this.#internals.role = 'document';

		this.#shadow.append(
			createElement('header', {
				part: ['header', 'text'],
				classList: ['header'],
				children: [
					createElement('div', {
						part: ['heading'],
						classList: ['heading', 'center'],
						children: [
							createSlot('heading', {
								text: 'Whiskey Flat Mayor Events',
							}),
						],
					}),
				],
			}),
			createElement('section', {
				id: 'container',
				classList: ['container'],
				part: ['container'],
			}),
		);

		Promise.all([
			new CSSStyleSheet().replace(STYLES),
			new CSSStyleSheet({ media: '(prefers-color-scheme: dark)' }).replace(DARK_STYLES),
		]).then(sheets => this.#shadow.adoptedStyleSheets = sheets);
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	async render({ signal } = {}) {
		this.#internals.ariaBusy = 'true';

		if (this.loading === 'lazy') {
			await whenIntersecting(this);
		}

		const events = await HTMLWFDMayorEvents.getEvents({ mayor: this.mayor, signal });
		const formatter = new Intl.DateTimeFormat(navigator.language, DATETIME_FORMAT);
		const now = Date.now();
		const children = events
			.map(({ startDate, ...event }) => ({ ...event, startDate: new Date(startDate) }))
			.filter(({ startDate }) => startDate.getTime() > now)
			.map(({ name, description, startDate, performer, location, url }) => {
				const start = new Date(startDate);
				const mayorSlug = slugify(performer.name);
				const event = createElement('div', {
					'@type': 'Event',
					part: ['event', `${mayorSlug}-event`],
					classList: ['event-container', `${mayorSlug}-event`],
					dataset: { mayor: performer.name },
					children: [
						createElement('a', {
							href: url,
							itemprop: 'url',
							target: '_blank',
							ariaLabel: `Open ${name} in new tab.`,
							part: ['event-link'],
							classList: ['event-link'],
							children: [
								createElement('div', {
									part: ['event-name'],
									classList: ['event-name'],
									children: [
										createLinkExternalIcon({
											size: 18,
											fill: 'currentColor',
											part: ['icon', 'link-icon'],
											classList: ['icon'],
										}),
										createElement('span', {
											itemprop: 'name',
											part: ['text'],
											text: name,
										}),
									],
								}),
								createElement('div', {
									'@type': performer['@type'] ?? 'Person',
									itemprop: 'performer organizer',
									classList: ['mayor-name'],
									part: ['mayor-name'],
									children: [
										createPersonIcon({
											size: 18,
											fill: 'currentColor',
											part: ['icon', 'mayor-icon'],
											classList: ['icon', 'mayor-icon'],
										}),
										createElement('span', {
											itemprop: 'name',
											part: ['text'],
											text: performer.name,
										}),
									]
								}),
							],
						}),
						createElement('div', {
							children: [
								createCalendarIcon({
									size: 18,
									fill: 'currentColor',
									ariaLabel: 'When',
									part: ['icon', 'date-icon'],
									classList: ['icon'],
								}),
								createElement('time', {
									itemprop: 'startDate',
									part: ['text'],
									datetime: start.toISOString(),
									text: formatter.format(start),
								}),
							],
						}),
						createElement('p', {
							itemprop: 'description',
							part: ['event-description', 'text'],
							classList: ['event-description'],
							text: description,
						}),
						createElement('address', {
							'@type': location['@type'],
							itemprop: 'location',
							children: [
								createElement('div', {
									classList: ['event-location'],
									children: [
										createMarkLocationIcon({
											size: 18,
											ariaLabel: 'Where',
											fill: 'currentColor',
											part: ['icon','location-icon'],
											classList: ['icon'],
										}),
										createElement('span', {
											itemprop: 'name',
											text: location.name,
											part: ['event-location-name', 'text'],
											hidden: ! isString(location.name),
										}),
									],
								}),
								createElement('div', {
									'@type': 'PostalAddress',
									itemprop: 'address',
									part: ['event-address'],
									classList: ['event-address'],
									children: [
										createElement('div', {
											itemprop: 'streetAddress',
											part: ['text'],
											text: location.address.streetAddress,
										}),
										createElement('div',{
											children: [
												createElement('span', {
													itemprop: 'addressLocality',
													part: ['text'],
													text: location.address.addressLocality,
												}),
												createElement('span', { text: ', '}),
												createElement('span', {
													itemprop: 'addressRegion',
													part: ['text'],
													text: location.address.addressRegion,
												}),
											],
										}),
									],
								}),
							],
						}),
					],
				});

				return event;
			});

		this.#shadow.getElementById('container').replaceChildren(...children);
		this.#internals.ariaBusy = 'false';
	}

	get loading() {
		return this.getAttribute('loading') ?? 'auto';
	}

	set loading(val) {
		if (isString(val)) {
			this.setAttribute('loading', val);
		} else {
			this.removeAttribute('loading');
		}
	}

	get mayor() {
		return getString(this, 'mayor');
	}

	set mayor(val) {
		setString(this, 'mayor', val);
	}

	get showAddress() {
		return this.hasAttribute('showaddress');
	}

	set showAddress(val) {
		this.toggleAttribute('showaddress', val);
	}

	get showDescription() {
		return this.hasAttribute('showdescription');
	}

	set showDescription(val) {
		this.toggleAttribute('showdescription', val);
	}

	get theme() {
		return getString(this, 'theme', { fallback: 'auto' });
	}

	set theme(val) {
		setString(this, 'theme', val);
	}

	static async getEvents({ mayor, signal } = {}) {
		if (signal instanceof AbortSignal && signal.aborted) {
			return Promise.reject(signal.reason);
		} else {
			const events = await getJSON('https://whiskeyflatdays.com/mayors/events.json', { signal });

			if (isString(mayor)) {
				const mayorSlug = slugify(mayor);
				return events.filter(event => slugify(event.performer.name) === mayorSlug);
			} else {
				return events;
			}
		}
	}

	static get observedAttributes() {
		return ['mayor'];
	}
});
