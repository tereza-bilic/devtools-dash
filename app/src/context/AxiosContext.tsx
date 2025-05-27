import OpenAPIClientAxios from "openapi-client-axios";
import type { Server } from "openapi-client-axios";
import type { Client as DevtoolsDashApi } from "src/types/openapi.d.ts";
import { createContext, useContext, useEffect, useState } from "react";

const server: Server = {
  url: "/",
  description: "Devtools Dash API",
}

const api = new OpenAPIClientAxios({
  definition: '/openapi.json',
  withServer: server,
});
const axiosClientPromise = () => api.getClient<DevtoolsDashApi>();

const AxiosClientContext = createContext<DevtoolsDashApi | null>(null);
export const useAxiosClientWhileLoading = () => {
  const context = useContext(AxiosClientContext);
  return context;
}
export const useAxiosClient = () => {
  const context = useContext(AxiosClientContext);
  if (!context) {
    throw new Error("useAxiosClientWhileLoading must be used within an AxiosClientProvider and behind AxiosLoadedGuard");
  }
  return context;
};
export const AxiosClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [axiosClient, setAxiosClient] = useState<DevtoolsDashApi | null>(null);
  useEffect(() => {
    axiosClientPromise().then((client) => {
      setAxiosClient(()=>client);
    }).catch(error => {
      console.error("Failed to create Axios client:", error);
    });
  }, [axiosClientPromise]);
  return (
    <AxiosClientContext.Provider value={axiosClient}>
      {children}
    </AxiosClientContext.Provider>
  );
}
