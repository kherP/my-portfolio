<script context="module" lang="ts">
  import ContactMe from "$lib/components/ContactMe";
  import { endpoints } from "$lib/constants/apiIndex";
	import { httpGet } from "$lib/utils/http.utils";
	import type { LoadInput } from "@sveltejs/kit";

  export const load = async ({ fetch }: LoadInput) => {
    const contacts: ContactDetailsItem[] = await httpGet(fetch, endpoints.contacts);
		return {
			props: {
				contacts: contacts || []
			}
		};
  }
</script>

<script lang="ts">
	export let contacts: ContactDetailsItem[] = [];
</script>

<ContactMe data={contacts} />