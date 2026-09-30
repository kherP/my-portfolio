<script context="module" lang="ts">
	import IntroductionSection from "$lib/components/IntroductionSection";
	import AiSection from "$lib/components/AiSection";
	import ExperienceSection from "$lib/components/ExperienceSection";
	import SkillSection from "$lib/components/SkillSection";
	import AboutSection from "$lib/components/AboutSection";
	import ContactMe from "$lib/components/ContactMe";
	import { endpoints } from "$lib/constants/apiIndex";
	import { aiWork, capabilities } from "$lib/constants/profile";
	import { httpGet, httpGetDetails } from "$lib/utils/http.utils";
	import type { LoadInput } from "@sveltejs/kit";

  export const load = async ({ fetch }: LoadInput) => {
    const [experiences, contacts, detailsProps] = await Promise.all([
      httpGet<ExperienceItem[]>(fetch, endpoints.experiences),
      httpGet<ContactDetailsItem[]>(fetch, endpoints.contacts),
      httpGetDetails(fetch)
    ]);
		return {
			props: {
				...detailsProps,
				experiences: experiences || [],
				contacts: contacts || []
			}
		};
  }
</script>

<script lang="ts">
	export let details: AppDetails;
	export let experiences: ExperienceItem[] = [];
	export let contacts: ContactDetailsItem[] = [];
</script>

<IntroductionSection {details} />
<AiSection data={aiWork} />
<ExperienceSection showMore data={experiences} />
<SkillSection showMore title="What I do" data={capabilities} />
<AboutSection {details} />
<ContactMe nested data={contacts} />
