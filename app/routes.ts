import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes as remixFlatRoutes } from "remix-flat-routes";

export default remixRoutesOptionAdapter((defineRoutes) => {
	return remixFlatRoutes("routes", defineRoutes);
}) satisfies RouteConfig;
