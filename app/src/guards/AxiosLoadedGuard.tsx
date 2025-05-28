import { useAxiosClientWhileLoading } from "@devtools-dash/context/AxiosContext";

export const AxiosLoadedGuard  = ({ children }: { children: React.ReactNode }) => {
  const client = useAxiosClientWhileLoading();

  return client ? <>{children}</> : <div>Loading...</div>
}

