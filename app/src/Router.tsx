import Categories from 'src/components/CategoriesList/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelGrid from 'src/components/levelGrid/LevelGrid';
import Login from 'src/pages/login/Login';
import Signup from 'src/pages/signup/Signup';
import Layout from 'src/Layout';
import CompletedLevel from 'src/pages/completed/CompletedLevel';
import Dashboard from 'src/pages/dashboard/Dashboard';
import Leaderboard from './components/Leaderboard/Leaderboard';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Categories />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/completed" element={<CompletedLevel />} />
          <Route path="/categories/:category" element={<LevelGrid/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
