import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("senior-page", "routes/senior-page.tsx"),
  route("senior-form", "routes/senior-form.tsx"),
] satisfies RouteConfig;
