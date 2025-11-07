import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './landingpage/landingpage'
import Homepage from './Homepage/Homepage'

function App() {
  const [count, setCount] = useState("j")

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/profile' element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
