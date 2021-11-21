<script context="module" lang="ts">
	import '../app.scss';
	// components
	import Header from '$lib/components/common/Header';
	import Footer from '$lib/components/common/Footer';
	// type
	import type { LoadInput } from '@sveltejs/kit';
	// utils
	import { httpGetDetails } from '$lib/utils/http.utils';
	import routes from '$lib/constants/routes';
	
	const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

	const formatPageTitle = (path: string, brand: string) => {
		if (path === routes.root) {
			return brand;
		}
		const paths: string[] = path.split("/");
		return `${brand}: ${capitalizeFirstLetter(paths[paths.length - 1])}`;
	};

	export const load = async ({ page, fetch }: LoadInput) => {
    const props: { details: AppDetails } = await httpGetDetails(fetch);
		return {
			props: {
				...props,
				pageTitle: formatPageTitle(page.path, props.details?.brand)
			}
		};
  }
</script>

<script lang="ts">
	export let details: AppDetails;
	export let pageTitle: string;
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>
<Header {details} />
<main>
  <slot />
</main>
<Footer {details} />
