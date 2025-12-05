import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("elderly", "routes/senior-page.tsx"),
    route("elderly_form", "routes/senior-form.tsx"),
    route("women", "routes/women.tsx"),
    route("chatbot", "routes/chatbot.tsx"),
    route("reconditioning", "routes/reconditioning.tsx"),
    route("reconditioning/credits", "pages/Credits.tsx"),
    route("nird", "routes/nird.tsx"),
] satisfies RouteConfig;
