import routes from "./routes";

export const menus: MenuItem[] = [
  { label: "Home", route: routes.root },
  { label: "Experience", route: routes.experiences },
  { label: "What I do", route: routes.skill },
  { label: "Contact me", route: routes.contactMe },
];
