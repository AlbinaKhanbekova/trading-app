import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components'
import { Favorites } from './pages/Favorites'
import { Home } from './pages/Home'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
