import { useState } from 'react'
import './App.css'
import After_logIn from './Pages/Afterlogin'
import Before_logIn from './Pages/BeforelogIn'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Before_logIn />} />
        <Route path='/afterlogin' element={<After_logIn />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
