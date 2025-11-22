import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Hero from './Hero'
import Username from './Username'
import Router from './Router'
import Home from './Home'
import Post from './Post'

function App() {
  return (   <div className="font-[Satoshi] h-screen flex justify-center items-center relative">
    <BrowserRouter>
    <Routes>
      <Route path = '/' element={<Router />} />
      <Route path = '/hero' element={<Hero />} />
      <Route path = '/home' element = {<Home />} />

      <Route path='/username' element={<Username />} />
      <Route path='post' element={<Post />} />
    </Routes>
    
    </BrowserRouter>
  </div> )
}

export default App
