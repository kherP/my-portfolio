import { endpoints } from "$lib/constants/apiIndex";

type FetchFn = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

export const httpGet = async <T extends any>(fetchFn: FetchFn, url: string) => {
  const res: Response = await fetchFn(url);
  const data: APIResponse<T> = await res.json();
  return data.result;
}

export const httpGetDetails = async (fetchFn: FetchFn) => {
  const details: AppDetails = await httpGet(fetchFn, endpoints.details);
  return { details };
}
