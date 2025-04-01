import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Guard from './utils/Auth'

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Login/>} />
        <Route path='/dashboard' element={<Guard><Dashboard /></Guard>} />
        <Route path='*' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App