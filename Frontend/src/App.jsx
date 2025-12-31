import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import HeroSection from './components/HeroSection'
import Analytics from './components/Analytics'
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<HeroSection/>}></Route>
        <Route path='/analytics' element={<Analytics/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
