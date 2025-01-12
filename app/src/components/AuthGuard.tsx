import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// guard component that shows loading while waiting on get me response then redirects or shows private route

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const me = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(me)
    if (me === null) {
      navigate('/login')
    }
  }, [me, navigate]);

  if (me === undefined) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

