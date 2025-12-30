import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header"
import HeroSection from './components/HeroSection'
import Analytics from './components/Analytics'

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<HeroSection/>}></Route>
        <Route path='/analytics' element={<Analytics/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
