import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const { endpoints } = require(`./${pkg.config.dynamicEndpointsIndexPath}`);
const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		paths: {
			base: dev ? '' : `/${pkg.name}`
		},
		prerender: {
			crawl: true,
			enabled: true,
			entries: [
        "*",
				...endpoints
      ],
			onError: 'fail'
		},
		adapter: adapter({
			// default options are shown
			pages: pkg.config.outputFolder,
			assets: pkg.config.outputFolder,
			fallback: null
	}),
	}
};

export default config;
