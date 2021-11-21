<script context="module" lang="ts">
	import '../app.scss';
	// components
	import Header from '$lib/components/common/Header';
	import Footer from '$lib/components/common/Footer';
	// type
	import type { LoadInput } from '@sveltejs/kit';
	// utils
	import { httpGetDetails } from '$lib/utils/http.utils';
	
	export const load = async ({ fetch }: LoadInput) => {
    const props: { details: AppDetails } = await httpGetDetails(fetch);
		return {
			props
		};
  }
</script>

<script lang="ts">
	export let details: AppDetails;
</script>

<Header {details} />
<main>
  <slot />
</main>
<Footer {details} />
