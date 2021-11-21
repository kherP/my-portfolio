import { base } from '$app/paths';
import { appConfig } from './appConfig';

const formatRoute = (route: string) => appConfig.isDevelopment ? route : `${base}${route}`;

const routes: Routes = {
  root: formatRoute("/"),
  experiences: formatRoute("/experience"),
  experience: formatRoute("/experience/:id"),
  skill: formatRoute("/skills")
};

export default routes;
