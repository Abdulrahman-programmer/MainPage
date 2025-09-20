import { useState } from 'react'
import Menu from './components/Menu'
import './App.css'
import Header from './components/Header'
import OverViewBox from './components/OverViewBox'
import Greeting from './components/Greeting'
import MaxSales from './components/MaxSales'
import BestSellers from './components/BestSellers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Menu />
      <Greeting name={"Shruti"} />
      <OverViewBox />
      <div className='flex flex-col  lg:ml-70 lg:flex-row'>
        <BestSellers />
        <MaxSales />
      </div>


    </div>
  )
}

export default App
