import Categories from './components/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelGrid from './components/LevelGrid';
import Login from './components/Login';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Categories />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/categories/:category" element={<LevelGrid />} />
      </Routes>
    </Router>
  );
}
