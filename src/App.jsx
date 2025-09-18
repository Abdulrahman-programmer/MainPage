import { useState } from 'react'
import Menu from './components/Menu'
import './App.css'
import Header from './components/Header'
import OverViewBox from './components/OverViewBox'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Header />
     <Menu />
     <OverViewBox />
   </div>
  )
}

export default App
