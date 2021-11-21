import routes from "./routes";

export const menus: MenuItem[] = [
  { label: "Home", route: routes.root },
  { label: "Experience", route: routes.experiences },
  { label: "Skills", route: routes.skill },
  { label: "Contact me", route: "mailto:someone@example.com" },
];
