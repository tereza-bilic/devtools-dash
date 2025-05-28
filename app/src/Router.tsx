import Categories from '@devtools-dash/components_temp/CategoriesList/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelGrid from '@devtools-dash/components_temp/levelGrid/LevelGrid';
import Login from '@devtools-dash/pages/login/Login';
import Signup from '@devtools-dash/pages/signup/Signup';
import Layout from '@devtools-dash/Layout';
import CompletedLevel from '@devtools-dash/pages/completed/CompletedLevel';
import Dashboard from '@devtools-dash/pages/dashboard/Dashboard';
import Leaderboard from '@devtools-dash/components_temp/Leaderboard/Leaderboard';

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
