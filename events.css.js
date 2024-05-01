import { gray } from '@shgysk8zer0/jss/palette/bootstrap.js';

export default `:host {
	display: block;
	text-align: initial;
	background-color: ${gray[0]};
	color: ${gray[8]};
	line-height: 1.3;
	border-width: 1px;
	border-style: solid;
	border-color: ${gray[2]};
	border-radius: 6px;
	max-width: 100%;
	box-sizing: border-box;
	overflow: auto;
	padding: 4px 12px;
	color-scheme: light dark;
}

:host([theme="light"]) {
	color-scheme: light;
}

:host([theme="dark"]) {
	color-scheme: dark;
}

* {
	box-sizing: border-box;
}

.event {
	padding-bottom: 0.7em;
	line-height: 1.5;
}

.event:not(:last-of-type) {
	border-width: 0 0 1px 0;
	border-style: solid;
	border-color: ${gray[3]};
	margin-bottom: 1.1em;
}

.event-heading, .title {
	margin-block: 0.3em;
}

.event-section {
	font-family: system-ui;
}

.event-section:not(:last-of-type) {
	margin-bottom: 6px;
}

.event-name {
	text-align: center;
	text-decoration: underline;
	padding: 0;
	margin: 0.2em;
}

.event-url {
	color: inherit;
	display: block;
	cursor: pointer;
	text-decoration: none;
}

.event-description {
	display: inline-block;
	max-width: calc(100% - 1.8em);
	margin: 0 0 0 0.3em;
	line-height: 1.2;
}

.center {
	text-align: center;
}

.icon {
	width: auto;
	height: 1em;
}

.event-section .icon {
	margin: 0.1em 0.4em 0 0;
}

.float-left {
	float: left;
}

.app-link {
	color: inherit;
	text-decoration: none;
	display: block;
}

.clearfix::after {
	content: "";
	display: block;
	clear: both;
}

:host([theme="dark"]) {
	background-color: ${gray[8]};
	color: #fefefe;
}

@media (prefers-color-scheme: dark) {
	:host(:not([theme="light"])) {
		background-color: ${gray[8]};
		color: #fefefe;
		border-color: ${gray[6]};
	}

	.event:not(:last-of-type) {
		border-color: ${gray[6]};
	}
}`;
