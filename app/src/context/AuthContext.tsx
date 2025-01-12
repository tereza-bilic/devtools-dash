import { createContext, useContext, useEffect, useState } from 'react';
import { TokenData } from '../types/openapi';
import { axiosClient } from '../util/axiosClient';

const AuthContext = createContext<TokenData | null | undefined>(null);

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<TokenData | null | undefined>(undefined);

  useEffect(() => {
    axiosClient.get_me_api_user_me_get({}).then((res) => {
      setMe(res.data)
    }).catch(() => {
      setMe(null)
    })
  }, []);

  return (
    <AuthContext.Provider value={me}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
