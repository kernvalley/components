# `@kernvalley/components`
A collection of web components / custom elements from KernValley.US

- - -
[![CodeQL](https://github.com/kernvalley/components/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/kernvalley/components/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/kernvalley/components/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/kernvalley/components/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/kernvalley/components.svg)](https://github.com/kernvalley/components/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/kernvalley/components.svg)](https://github.com/kernvalley/components/commits/master)
[![GitHub release](https://img.shields.io/github/release/kernvalley/components?logo=github)](https://github.com/kernvalley/components/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@kernvalley/components)](https://www.npmjs.com/package/@kernvalley/components)
![node-current](https://img.shields.io/node/v/@kernvalley/components)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40kernvalley%2Fcomponents)
[![npm](https://img.shields.io/npm/dw/@kernvalley/components?logo=npm)](https://www.npmjs.com/package/@kernvalley/components)

[![GitHub followers](https://img.shields.io/github/followers/kernvalley.svg?style=social)](https://github.com/kernvalley)
![GitHub forks](https://img.shields.io/github/forks/kernvalley/components.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/kernvalley/components.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/kern_valley.svg?style=social)](https://twitter.com/kern_valley)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## Recommended

To ensure compatibility, please install `@shgysk8zer0/polyfills` or use `https://unpkg.com/@shgysk8zer0/polyfills/all.min.js`.

## Installation

You don't have to install anything, but you can.

```bash
npm i @kernvalley/components
```

You can also just load everything from `https://unpkg.com/@kernvalley/components/`.

## Examples
### Kern Valley Events
#### JavaScript

```js
import '@kernvalley/components/events.js';

customElements.whenDefined('krv-events').then(KRVEvents => {
  const cal = new KRVEvents();
  document.querySelector('.container').append(cal);
});
```

#### HTML
```html
<script type="module" src="https://unpkg.com/@kernvalley/components/events.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<krv-events></krv-events>
```

### Whiskey Flat Days Events
#### JavaScript

```js
import '@kernvalley/components/wfd/events.js';

customElements.whenDefined('wfd-events').then(WFDEvents => {
  const cal = new WFDEvents();
  document.querySelector('.container').append(cal);
});
```

#### HTML
```html
<script type="module" src="https://unpkg.com/@kernvalley/components/wfd/events.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<wfd-events></wfd-events>
```
