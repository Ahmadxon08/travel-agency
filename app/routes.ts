import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NNaF5cWWNCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpedXRXRmJZVEZ2X0tWYUA="
);

export default [
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
  ]),
] satisfies RouteConfig;
