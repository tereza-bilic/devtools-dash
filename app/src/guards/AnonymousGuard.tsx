import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@devtools-dash/context/AuthContext';

// guard component that shows loading while waiting on get me response then redirects or shows private route

export const AnonymousGuard = ({ children }: { children: React.ReactNode }) => {
  const {user: me} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      navigate('/')
    }
  }, [me, navigate]);

  if (me === undefined) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

