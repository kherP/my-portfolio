
import { appConfig } from '$lib/constants/appConfig';
import { DetailsStore } from '$lib/stores/details.store';
import { ExperiencesStore } from '$lib/stores/experiences.store';
import { SkillsStore } from '$lib/stores/skills.store';
import type { EndpointOutput, Request } from '@sveltejs/kit';

const getStore = (key: string) => {
	switch (key) {
		case 'experiences': return ExperiencesStore;
		case 'skills': return SkillsStore;
		case 'details': return DetailsStore;
	}
};

const setDataToStores = (endpoints: FileItem[], responses: Response[]) => {
	endpoints.forEach(async ({ store }: FileItem, index: number) => {
		const data = await responses[index].json();
		store.set(data.result);
	});
};

const loadFiles = (gistResponse: GistResponse) => {
  const filesEndpoints: FileItem[] = Object.keys(gistResponse.files).map((key: string) => ({
    store: getStore(key.split(".")[0]),
    request: fetch(gistResponse.files[key].raw_url)
  }));
  Promise.all(filesEndpoints.map(({ request }: FileItem) => request))
    .then((response: Response[]) => setDataToStores(filesEndpoints, response));
};

const getFilesDetails = async () => {
	const res = await fetch(appConfig.rootURL, { headers: appConfig.header });
  const data = await res.json();
  loadFiles(data);
	return {
		data: { success: true },
		error: false
	};
};

export const get = async (): Promise<EndpointOutput> => {
	const data: any = await getFilesDetails();
  return {
    body: data,
  };
  // console.log(data)
	// if (data) {
	// 	return {
	// 		body: {
	// 			data: { test: "hello"}
	// 		}
	// 	};
	// } else {
	// 	return {
	// 		body: {
	// 			data: null,
	// 			error
	// 		}
	// 	};
	// }
};