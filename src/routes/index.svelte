<script context="module" lang="ts">
	import IntroductionSection from "$lib/components/IntroductionSection";
	import ExperienceSection from "$lib/components/ExperienceSection";
	import SkillSection from "$lib/components/SkillSection";
	import { endpoints } from "$lib/constants/apiIndex";
	import { httpGet, httpGetDetails } from "$lib/utils/http.utils";
	import type { LoadInput } from "@sveltejs/kit";

  export const load = async ({ fetch }: LoadInput) => {
    const experiences: ExperienceItem[] = await httpGet(fetch, endpoints.experiences);
    const skills: SkillItem[] = await httpGet(fetch, endpoints.skills);
		const detailsProps = await httpGetDetails(fetch);
		return {
			props: {
				...detailsProps,
				experiences: experiences || [],
				skills: skills || []
			}
		};
  }
</script>

<script lang="ts">
	export let details: AppDetails;
	export let experiences: ExperienceItem[] = [];
	export let skills: SkillItem[] = [];
</script>

<IntroductionSection {details} />
<ExperienceSection showMore data={experiences} />
<SkillSection showMore data={skills} />
