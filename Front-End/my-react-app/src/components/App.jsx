import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './landingpage/landingpage'
import Homepage from './Homepage/Homepage'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/profile/*' element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
