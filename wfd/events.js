import { getEvents as getAllEvents } from '@shgysk8zer0/kazoo/krv/wfd.js';
// import { createElement, createImage } from '@shgysk8zer0/kazoo/elements.js';
import { createElement} from '@shgysk8zer0/kazoo/elements.js';
import { registerCustomElement } from '@shgysk8zer0/kazoo/custom-elements.js';
import { whenIntersecting } from '@shgysk8zer0/kazoo/intersect.js';
import { text, attr } from '@shgysk8zer0/kazoo/dom.js';
import { setUTMParams, callOnce } from '@shgysk8zer0/kazoo/utility.js';
import { createDeprecatedPolicy } from '@shgysk8zer0/components/trust.js';
import { getString, setString, getBool, setBool } from '@shgysk8zer0/kazoo/attrs.js';
import { light, dark } from '@shgysk8zer0/jss/palette/gnome.js';
import template from './events.html.js';
// import {
// 	createCalendarIcon, createLinkExternalIcon, createMarkLocationIcon,
// } from '@shgysk8zer0/kazoo/icons.js';


const protectedData = new WeakMap();
createDeprecatedPolicy('wfd-events#html');
const WFD = 'https://whiskeyflatdays.com/';
const medium = 'referral';
const content = 'wfd-events';
const getTemplate = (() => template.cloneNode(true));
const getEvents = callOnce(() => getAllEvents());

const DATETIME_FORMAT = {
	year: 'numeric',
	month: 'short',
	weekday: 'short',
	day: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
};

function getWFDLink(path, params) {
	return setUTMParams(new URL(path, WFD), params);
}

const STYLES = `
	:host {
		display: block;
		width: 100%;
		height: 350px;
		padding: 4px;
		contain: strict;
		color-scheme: light dark;
		background-color: ${light[0]};
		color: ${dark[3]};
		border-radius: 7px;
		overflow-x: hidden;
		overflow-y: auto;
		box-sizing: border-box;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
		line-height: 1.8;
		font-family: system-ui;
	}

	* {
		box-sizing: border-box;
	}

	:host([theme="light"]) {
		color-scheme: light;
	}

	:host([theme="dark"]) {
		color-scheme: dark;
		background-color: ${dark[3]};
		color: ${light[1]};
	}

	:host(:not([images])) [part~="image"] {
		display: none;
	}

	[part~="list"] {
		margin-top: 1.2em;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 430px));
		justify-content: center;
		gap: 13px;
	}

	[part~="event"] {
		padding: 0.1rem 0.8rem;
		margin-bottom: 10px;
		border: 1px solid ${light[3]};
		background-color: ${light[1]};
		border-radius: 12px;
	}

	:host([theme="dark"]) [part~="event"] {
		border: 1px solid ${dark[1]};
		background-color: ${dark[2]};
		color: ${light[1]};
	}

	img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	summary {
		cursor: pointer;
	}

	a {
		color: inherit;
	}

	h1, h2, h3 {
		text-align: center;
	}

	[part~="name"] {
		margin: 6px;
	}

	[part~="location"] h5 {
		margin: 0.2em;
	}

	[part~="icon"] {
		width: 1em;
		height: 1em;
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}
`;

const DARK_STYLES = `
	:host(:not([theme="light"])){
		background-color: ${dark[3]};
		color: ${light[1]};
	}

	:host(:not([theme="light"])) [part~="event"] {
		border: 1px solid ${dark[1]};
		background-color: ${dark[2]};
		color: ${light[1]};
	}
`;

registerCustomElement('wfd-events', class HTMLWFDEventsElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'closed' });

		Promise.all([
			new CSSStyleSheet().replace(STYLES),
			new CSSStyleSheet({ media: '(prefers-color-scheme: dark)' }).replace(DARK_STYLES),
		]).then(sheets => shadow.adoptedStyleSheets = sheets);

		shadow.append(
			createElement('a', {
				href: getWFDLink('', { source: this.source, medium, content }),
				target: '_blank',
				rel: 'noopener noreferrer external',
				part: ['text', 'link'],
				children: [
					createElement('slot', {
						name: 'label',
						children: [createElement('h2', { text: 'Whiskey Flat Days Events' })],
					}),
				]
			}),
			createElement('div', { part: ['list'] }),
		);

		protectedData.set(this, { shadow });
	}

	async connectedCallback() {
		await whenIntersecting(this);
		const { shadow } = protectedData.get(this);
		const [events, tmp] = await Promise.all([
			getEvents(),
			getTemplate(),
		]);

		const source = this.source;
		const utm = { source, medium, content };
		const startformatter = new Intl.DateTimeFormat(navigator.language, DATETIME_FORMAT);
		const endFormatter = new Intl.DateTimeFormat(navigator.language, { timeStyle: 'short' });

		shadow.querySelector('[part~="list"]').replaceChildren(...events.map(({
			'@identifier': identifier,
			'@type': type,
			'@context': context,
			name,
			description,
			image = '/img/markers/activity.svg',
			url,
			startDate,
			endDate,
			location: {
				'name': placeName,
				'@type': placeType,
				'geo': {
					latitude,
					longitude,
				}
			}
		}) => {
			const start = new Date(startDate);
			const end = new Date(endDate);
			const base = tmp.cloneNode(true);

			attr('[part~="event"]', { itemtype: new URL(type, context) }, { base });
			attr('[part~="link"]', { href: getWFDLink(url, utm) }, { base });
			attr('[itemprop="image"]', { src: image }, { base });
			attr('[itemprop="startDate"]', { datetime: start },{ base });
			attr('[itemprop="endDate"]', { datetime: end }, { base });
			attr('[itemprop="longitude"]', { content: longitude }, { base });
			attr('[itemprop="latitude"]', { content: latitude }, { base });
			attr('[itemprop="location"]', { itemtype: new URL(placeType, 'https://schema.org/') }, { base });
			attr('[itemprop="location"] [itemprop="url"]', { href: getWFDLink(`/map/#${identifier}`, utm )}, { base });

			text('[itemprop="startDate"]', startformatter.format(start), { base });
			text('[itemprop="endDate"]', endFormatter.format(end), { base });
			text('[part~="name"]', name, { base });
			text('[itemprop="location"] [itemprop="name"]', placeName.length === 0 ? 'Kernville' : placeName, { base });

			if (typeof description === 'string') {
				try {
					base.querySelector('[itemprop="description"]').setHTML(description);
				} catch(e) {
					console.error(e);
				}
			}

			return base;
		}));
	}

	get images() {
		return getBool(this, 'images');
	}

	set images(val) {
		setBool(this, 'images', val);
	}

	get source() {
		return getString(this, 'source');
	}

	set source(val) {
		setString(this, 'source', val);
	}

	get theme() {
		return getString(this, 'theme', { fallback: 'auto' });
	}

	set theme(val) {
		setString(this, 'theme', val);
	}
});
