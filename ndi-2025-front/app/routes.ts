import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("elderly", "routes/elderly.tsx"),
  route("women", "routes/women.tsx"),
  route("chatbot", "routes/chatbot.tsx"),
  route("reconditioning", "routes/reconditioning.tsx"),
] satisfies RouteConfig;
