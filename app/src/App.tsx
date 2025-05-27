import './App.css'
import { AppRouter } from './Router';
import AuthProvider from './context/AuthContext';
import { AxiosClientProvider } from './context/AxiosContext';
import { AxiosLoadedGuard } from './guards/AxiosLoadedGuard';

function App() {
  return (
    <AxiosClientProvider>
      <AxiosLoadedGuard>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AxiosLoadedGuard>
    </AxiosClientProvider>
  )
}

export default App
