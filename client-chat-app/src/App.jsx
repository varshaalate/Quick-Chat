import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfileFile from './pages/ProfileFile'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfileFile />} />
        
      </Routes>
    </div>
  )
}

export default App
