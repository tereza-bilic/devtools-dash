import { useState } from 'react'
import './App.css'
import Categories from './components/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelGrid from './components/LevelGrid';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Categories />}
          />
          <Route path="/categories/:category" element={<LevelGrid />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
