<script context="module" lang="ts">
	import SkillSection from "$lib/components/SkillSection";
	import { endpoints } from "$lib/constants/apiIndex";
	import { httpGet } from "$lib/utils/http.utils";
	import type { LoadInput } from "@sveltejs/kit";

  export const load = async ({ fetch }: LoadInput) => {
    const skills: SkillItem[] = await httpGet(fetch, endpoints.skills);
		return {
			props: {
				skills: skills || []
			}
		};
  }
</script>

<script lang="ts">
	export let skills: SkillItem[] = [];
</script>

<SkillSection data={skills} />
