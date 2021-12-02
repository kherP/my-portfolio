import { formatRoute } from "$lib/utils/route.utils";

const routes: Routes = {
  root: formatRoute("/"),
  experiences: formatRoute("/experience"),
  experience: formatRoute("/experience/:id"),
  skill: formatRoute("/skills"),
  contactMe: formatRoute("/contact-me"),
};

export default routes;
