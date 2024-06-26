import { css } from '@aegisjsproject/parsers/css.js';

export default css`:host {
	display: inline-block;
	border: none;
	color-scheme: light dark;
}

:host([theme="light"]) {
	color-scheme: light;
}

:host([theme="dark"]) {
	color-scheme: dark;
}

:host([url]) {
	cursor: pointer;
}

:host(:not([url^="tel:"])) [part~="call-icon"] {
	display: none;
}

:host(:not([url^="mailto:"])) [part~="email-icon"] {
	display: none;
}

:host(:not([url^="geo:"])) [part~="geo-icon"] {
	display: none;
}

:host(:not([url^="https://"])) [part~="link-icon"] {
	display: none;
}

:host([url]) #call-to-action {
	color: var(--ad-link-color, #0F5CE8);
	text-decoration: underline;
}

[part~="icon"] svg {
	vertical-align: middle;
	height: 1em;
	width: auto;
}

#container {
	text-align: left;
	box-sizing: border-box;
	font-size: 14px;
	display: grid;
	column-gap: 12px;
	row-gap: 6px;
	max-width: 100%;
	max-height: 100%;
	padding: 8px;
	background-color: var(--ad-background, #fafafa);
	color: var(--ad-color, #242424);
	border-width: var(--ad-border-width, 1px);
	border-style: solid;
	border-color: var(--ad-border, #dadada);
	border-radius: 6px;
	contain: strict;
	content-visibility: auto;
	text-decoration: none;
}

:host([dir="rtl"]) {
	text-align: right;
}

:host([layout="card"]) #container,
:host(:not([layout])) #container {
	grid-template-areas: "image label" "image description" "image cta" "branding branding";
	grid-template-columns: 2fr 3fr;
	grid-template-rows: 30px 1fr auto auto;
	height: var(--ad-block-height, 200px);
	width: var(--ad-block-width, 380px);
}

:host([layout="stack"]) #container {
	grid-template-areas: "label label label" ". image ." ". description ." ". cta cta" ". branding branding";
	grid-template-rows: 30px 180px 1fr auto auto;
	grid-template-columns: 10px 1fr 10px;
	width: var(--ad-block-stack-width, 280px);
	height: var(--ad-block-stack-height, 380px);
}

:host([layout="text"]) #container {
	grid-template-areas: "label label label"  "description description description" ". cta cta" ". branding branding";
	grid-template-rows: 30px 1fr auto;
	grid-template-columns: 10px 1fr 10px;
	width: var(--ad-block-text-width, 280px);
	height: var(--ad-block-text-height, 150px);
}

:host([layout="text"]) #image, :host([layout="text"]) slot[name="image"] svg {
	display: none;
}

:host([layout="image"]) #container {
	grid-template-areas: "image image" ". branding";
	grid-template-rows: 1fr auto;
	grid-template-columns: 1fr auto;
	width: var(--ad-block-image-width, 280px);
	height: var(--ad-block-image-height, 210px);
}

:host([layout="image"]) #label,
:host([layout="image"]) #description,
:host([layout="image"]) #call-to-action {
	display: none;
}

:host([layout="full-width"]) {
	grid-column: 1 / -1;
}

:host([layout="full-width"]) #container {
	width: 100vw;
	max-width: 100%;
	height: var(--ad-block-full-width-height, 250px);
	grid-template-areas: "image label label" "image description description" "image cta branding";
	column-gap: 20px;
	grid-template-rows: auto 1fr auto;
	grid-template-columns: minmax(auto, 4fr) 5fr 150px;
}

@media(max-width: 650px) {
	:host([layout="full-width"]) #container {
		height: 300px;
		grid-template-areas: "label label" "image description" "cta branding";
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr 1fr;
		column-gap: 12px;
	}
}

:host([theme="dark"]) #container {
	background-color: var(--ad-background, #212121);
	color: var(--ad-color, #fefefe);
	border-color: var(--ad-border, #cacaca);
}

:host([theme="inherit"]) #container {
	background-color: var(--ad-background, inherit);
	color: var(--ad-color, inherit);
	border-color: var(--ad-border, inherit);
}

#label {
	grid-area: label;
	text-align: center;
	overflow: auto;
	margin: 0;
}

:host([layout="card"]) #label,
:host(:not([layout])) #label {
	margin: 4px;
}

#description {
	grid-area: description;
	overflow: auto;
}

#image {
	grid-area: image;
	overflow: hidden;
}

#call-to-action {
	grid-area: cta;
	overflow: auto;
}

#call-to-action [part~="icon"], #branding [part~="icon"] {
	margin: 0 6px;
}

#branding {
	grid-area: branding;
	color: var(--ad-link-color, #0F5CE8);
}

#branding svg {
	vertical-align: middle;
}

::slotted([slot="image"]), slot[name="image"] > svg {
	width: 100%;
	height: 100% !important;
	max-width: 100%;
	max-height: 100%;
}

::slotted([slot="description"]) {
	overflow-wrap: break-word;
	white-space: break-spaces;
	display: block;
}

slot[name="image"] > svg {
	object-fit: contain;
	object-position: center;
	width: 100%;
	height: 100%;
}

:host([imagefit="fill"]) ::slotted([slot="image"]) {
	object-fit: fill;
}

:host([imagefit="cover"]) ::slotted([slot="image"]) {
	object-fit: cover;
}

:host([imagefit="contain"]) ::slotted([slot="image"]) {
	object-fit: contain;
}

:host([imagefit="scale-down"]) ::slotted([slot="image"]) {
	object-fit: scale-down;
}

:host([imageposition="top"]) ::slotted([slot="image"]) {
	object-position: center top;
}

:host([imageposition="bottom"]) ::slotted([slot="image"]) {
	object-position: center bottom;
}

:host([imageposition="right"]) ::slotted([slot="image"]) {
	object-position: right center;
}

:host([imageposition="left"]) ::slotted([slot="image"]) {
	object-position: left center;
}

:host([imageposition="top-left"]) ::slotted([slot="image"]) {
	object-position: left top;
}

:host([imageposition="bottom-left"]) ::slotted([slot="image"]) {
	object-position: left bottom;
}

:host([imageposition="top-right"]) ::slotted([slot="image"]) {
	object-position: right top;
}

:host([imageposition="bottom-right"]) ::slotted([slot="image"]) {
	object-position: bottom top;
}

:host([imageposition="top-right"]) ::slotted([slot="image"]) {
	object-position: right top;
}

:host([url][theme="dark"]) #call-to-action,
:host([theme="dark"]) #branding {
	color: var(--ad-link-color, #91B4F4);
}

@media (prefers-color-scheme: dark) {
	:host(:not([theme="light"])) #container {
		background-color: var(--ad-background, #212121);
		color: var(--ad-color, #fefefe);
		border-color: var(--ad-border, #cacaca);
	}

	:host([url]:not([theme="light"])) #call-to-action,
	:host(:not([theme="light"])) #branding {
		color: var(--ad-link-color, #91B4F4);
	}
}`;
