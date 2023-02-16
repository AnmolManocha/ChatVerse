import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
