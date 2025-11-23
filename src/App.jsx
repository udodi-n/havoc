import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Hero from './Hero'
import Username from './Username'
import Home from './Home'
import Post from './Post'
import ProtectedRoute from './ProtectedRoute';
import AuthRedirect from './AuthRedirect';

function App() {
  return (
    <div className="font-[Satoshi] h-screen flex justify-center items-center relative">
      <BrowserRouter>
        <Routes>

          {/* Routes for non-logged-in users only */}
          <Route element={<AuthRedirect />}>
            <Route path="/hero" element={<Hero />} />
            <Route path="/username" element={<Username />} />
          </Route>

          {/* Routes for logged-in users only */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
          </Route>

          {/* Default root route */}
          <Route path="/" element={<AuthRedirect />}>
            <Route index element={<Hero />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
