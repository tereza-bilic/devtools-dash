import OpenAPIClientAxios from "openapi-client-axios";
import type { Server } from "openapi-client-axios";
import type { Client as DevtoolsDashApi } from "src/types/openapi.d.ts";

const server: Server = {
  url: "http://localhost:5173",
  description: "Devtools Dash API",
}

const api = new OpenAPIClientAxios({
  definition: 'http://localhost:5173/openapi.json',
  withServer: server,
});
export const axiosClient = await api.getClient<DevtoolsDashApi>();
