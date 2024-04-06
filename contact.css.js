import { css } from '@aegisjsproject/parsers/css.js';
import { red, green, gray } from '@aegisjsproject/styles/palette/bootstrap.js';

export default css`:host {
	display: block;
	color-scheme: light dark;
}

:host([theme="light"]) {
	color-scheme: light;
}

:host([theme="dark"]) {
	color-scheme: dark;
}

.no-border {
	border: none;
}

.flex {
	display: flex;
}

.flex.row {
	flex-direction: row;
}

.flex.space-evenly {
	justify-content: space-evenly;
}

.btn:not([hidden]) {
	display: inline-block;
	padding: var(--button-padding, 0.6em);
	font-family: var(--button-font, inherit);
	border-radius: var(--button-border-radius, 6px);
	box-sizing: border-box;
	cursor: pointer;
}

.btn.btn-accept {
	background-color: var(--button-accept-background, var(--button-primary-background, ${green[4]}));
	border: var(--button-accept-active-border, var(--button-primary-border, ${gray[3]}));
	color: var(--button-accept-color, var(--button-primary-color, ${gray[0]}));
}

.btn.btn-accept:hover {
	background-color: var(--button-accept-hover-background, var(--button-accept-active-background, var(--button-primary-hover-background, var(--button-primary-active-background, ${green[5]}))));
	color: var(--button-accept-hover-color, var(--button-accept-active-color, var(--button-primary-hover-color, var(--button-primary-active-color, var(--button-primary-color, ${gray[0]})))));
	border: var(--button-accept-hover-border, var(--button-accept-active-border, var(--button-primary-hover-border, var(--button-primary-active-border, var(--button-primary-border, ${gray[3]})))));
}

.btn.btn-accept:disabled, .btn.btn-accept.disabled {
	background-color: var(--button-accept-disabled-background, var(--button-accept-background, var(--button-disabled-background, var(--button-background, ${green[7]}))));
	border: var(--button-accept-disabled-border, var(--button-accept-border, var(--button-disabled-border, ${gray[3]})));
	color: var(--button-accept-disabled-color, var(--button--accept-color, var(--button-disabled-color, ${gray[7]})));
}

.btn.btn-accept:active, .btn.btn-accept.active {
	background-color: var(--button-accept-active-background, var(--button-accept-background, ${green[5]}));
	border: var(--button-accept-active-border, var(--button-accept-border, var(--button-primary-active-border, ${gray[3]})));
	color: var(--button-accept-active-color, var(--button--accept-color, var(--button-active-color, ${gray[0]})));
}

.btn.btn-reject {
	background-color: var(--button-reject-background, var(--button-primary-background, ${red[4]}));
	border: var(--button-reject-border, var(--button-primary-border, ${gray[3]}));
	color: var(--button-reject-color, var(--button-primary-color, ${gray[0]}));
}

.btn.btn-reject:hover {
	background-color: var(--button-reject-hover-background, var(--button-reject-active-background, var(--button-primary-hover-background, var(--button-primary-active-background, ${red[5]}))));
	border: var(--button-reject-hover-border, var(--button-reject-active-border, var(--button-primary-hover-border, var(--button-primary-active-border, var(--button-primary-border, ${gray[4]})))));
	color: var(--button-reject-hover-color, var(--button-reject-active-color, var(--button-primary-hover-color, var(--button-primary-active-color, var(--button-primary-color, ${gray[0]})))));
}

.btn.btn-reject:disabled, .btn.btn-reject.disabled, .btn.btn-reject[disabled] {
	background-color: var(--button-reject-disabled-background, var(--button-reject-background, var(--button-disabled-background, var(--button-background, ${red[7]}))));
	border: var(--button-reject-disabled-border, var(--button-reject-border, var(--button-disabled-border, ${gray[4]})));
	color: var(--button-reject-disabled-color, var(--button--reject-color, var(--button-disabled-color, ${gray[0]})));
}

.btn.btn-reject:active, .btn.btn-reject.active {
	background-color: var(--button-reject-active-background, var(--button-reject-background, ${red[5]}));
	border: var(--button-reject-active-border, var(--button-reject-border, var(--button-primary-active-border, ${gray[4]})));
	color: var(--button-reject-active-color, var(--button--reject-color, var(--button-active-color, ${gray[0]})));
}`;
