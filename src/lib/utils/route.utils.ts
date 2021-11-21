import { base } from "$app/paths";
import { appConfig } from "$lib/constants/appConfig";

export const formatRoute = (route: string) => appConfig.isDevelopment ? route : `${base}${route}`;
