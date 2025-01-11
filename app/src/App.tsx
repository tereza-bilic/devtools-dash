import { useEffect, useState } from 'react'
import './App.css'
import Categories from './components/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelGrid from './components/LevelGrid';
import { axiosClient } from './util/axiosClient';
import { TokenData } from './types/openapi';

function App() {
  const [count, setCount] = useState(0)

  const [me, setMe] = useState<TokenData>({ user_nickname: '', user_id: 0 })
  useEffect(() => {
    const form = new FormData()
    form.append('grant_type', 'password')
    form.append('username', 'tere')
    form.append('password', 'tere123')
    axiosClient.login_for_access_token_api_user_login_post(null, form as never).then(() => {
      axiosClient.get_me_api_user_me_get({}).then((res) => {
        setMe(res.data)
      })
    })
  }, [])

  return (
    <>
    {me.user_nickname} {me.user_id}
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
