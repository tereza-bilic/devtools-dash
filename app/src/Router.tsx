import Categories from './components/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelGrid from './components/LevelGrid';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Layout from './Layout';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Categories />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/categories/:category" element={<LevelGrid />} />
        </Route>
      </Routes>
    </Router>
  );
}
