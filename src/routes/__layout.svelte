<script context="module" lang="ts">
	import '../app.scss';
	// components
	import Header from '$lib/components/common/Header';
	import Footer from '$lib/components/common/Footer';
	import Matrix from '$lib/components/common/Matrix';
	// type
	import type { LoadInput } from '@sveltejs/kit';
	// utils
	import { httpGetDetails } from '$lib/utils/http.utils';
	import { formatRoute } from "$lib/utils/route.utils";
	import { capitalizeFirstLetter } from '$lib/utils/string.utils';

	const formatPageTitle = (path: string, brand: string) => {
		if (path === "/") {
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
	<link rel="icon" href={formatRoute("/favicon.png")} />
	<title>{pageTitle}</title>
</svelte:head>
<Matrix />
<a class="skip" href="#main">Skip to content</a>
<Header {details} />
<main id="main" class="page">
	<div class="inner">
		<slot />
	</div>
</main>
<Footer {details} />

<style>
	.skip {
		position: absolute;
		left: 16px;
		top: -48px;
		z-index: 60;
		background: var(--green);
		color: var(--void);
		padding: 8px 14px;
	}
	.skip:focus {
		top: 12px;
	}
</style>
