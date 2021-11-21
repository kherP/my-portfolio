<script context="module" lang="ts">
	import ExperienceSection from "$lib/components/ExperienceSection";
	import { endpoints } from "$lib/constants/apiIndex";
	import { httpGet } from "$lib/utils/http.utils";
	import type { LoadInput } from "@sveltejs/kit";

  export const load = async ({ fetch }: LoadInput) => {
    const experiences: ExperienceItem[] = await httpGet(fetch, endpoints.experiences);
		return {
			props: {
				experiences: experiences || [],
			}
		};
  }
</script>

<script lang="ts">
	export let experiences: ExperienceItem[] = [];
</script>

<ExperienceSection data={experiences} />
