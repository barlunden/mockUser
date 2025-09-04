import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/messages", "routes/messages.tsx"),
  route("/add-entry", "routes/addEntry.tsx"),
  route("/entries", "routes/entryList.tsx"),
  route("/users", "routes/users.tsx"),
] satisfies RouteConfig;
