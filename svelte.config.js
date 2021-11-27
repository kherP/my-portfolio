import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
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
			pages: [
        "*",
        "/experience/Occupational%20pension%20portal",
        "/experience/Private%20pension%20portal",
        "/experience/User%20roles%20and%20management%20portal",
        "/experience/Customer%20service%20platform",
        "/experience/React%20components%20library",
        "/experience/Class%20Management%20and%20Enrolment%20Portal"
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
