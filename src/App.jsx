import { useState } from 'react'
import Menu from './components/Menu'
import './App.css'
import Header from './components/Header'
import OverViewBox from './components/OverViewBox'
import Greeting from './components/Greeting'
import MaxSales from './components/MaxSales'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Header />
     <Menu />
     <Greeting name={"Shruti"}/>
     <OverViewBox />
     <MaxSales/>

   </div>
  )
}

export default App
