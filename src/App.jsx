import { Routes, Route } from 'react-router-dom'
import './App.css'
import './assets/scss/main.scss'
import Home from './pages/Home'
import Card from './pages/Card'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Card />} />
      </Routes>
    </>
  )
}

export default App
