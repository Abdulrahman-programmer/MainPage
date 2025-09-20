import { useState } from 'react'
import Menu from './components/Menu'
import './App.css'
import Header from './components/Header'
import Dashboard from './Pages/Dashboard'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      
      <BrowserRouter>
      <Menu />
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
