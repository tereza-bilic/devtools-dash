import './App.css'
import { AppRouter } from './Router';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
