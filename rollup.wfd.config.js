/* eslint-env node */
import { getConfig } from '@shgysk8zer0/js-utils/rollup';
import { rollupImport } from '@shgysk8zer0/rollup-import/import';
import { rollupImportMeta } from '@shgysk8zer0/rollup-import/meta';
import { readJSONFile } from '@shgysk8zer0/npm-utils/json';

const { name, version } = await readJSONFile('./package.json');
const url = new URL(`./${name}@${version}/`, 'https://unpkg.com').href;

export default getConfig('./wfd/events.js', {
	plugins: [
		rollupImport('./importmap.json'),
		rollupImportMeta({ baseURL: url }),
	],
	minify: true,
	sourcemap: true,
	format: 'iife',
});
