import { createContext, useContext, useEffect, useState } from 'react';
import { TokenData } from 'src/types/openapi';
import { axiosClient } from 'src/util/axiosClient';

type AuthContextType = {
  user: TokenData | null | undefined;
  refresh: () => void;
};
const AuthContext = createContext<AuthContextType>({ user: undefined, refresh: () => {} });

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<TokenData | null | undefined>(undefined);
  const [refresh, setRefresh] = useState<Date>(new Date());

  useEffect(() => {
    axiosClient.get_me_api_user_me_get().then((res) => {
      setMe(res.data)
    }).catch(() => {
      setMe(null)
    })
  }, [refresh])

  return (
    <AuthContext.Provider value={{user: me, refresh: () => setRefresh(new Date())}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
