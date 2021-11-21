<script context="module" lang="ts">
  import ExperienceDetails from "$lib/components/ExperienceDetails";
	import { endpoints } from "$lib/constants/apiIndex";
	import { httpGet } from "$lib/utils/http.utils";
	import type { LoadInput } from "@sveltejs/kit";

  export const load = async ({ page, fetch }: LoadInput) => {
    const expDetails: ExperienceDetailsProps = await httpGet(fetch, endpoints[page.params.slug]);
		return {
			props: {
				expDetails: expDetails || {},
			}
		};
  }
</script>

<script lang="ts">
	export let expDetails: ExperienceDetailsProps;
</script>

<ExperienceDetails data={expDetails} />
