import { base } from '$app/paths';

const routes: Routes = {
  root: base,
  experiences: base + "/experience",
  experience: base + "/experience/:id",
  skill: base + "/skills"
};

export default routes;
