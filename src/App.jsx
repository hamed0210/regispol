import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './App.css'
import Login from './componentes/login'
import Header from './componentes/header'
import Main from './componentes/main'
import { UserAuth } from './context/AuthContext'

import Nuevos from './componentes/nuevos'
import Consultas from './componentes/consultas'
import ProtectedRoute from './hooks/protectedRoute'

function App() {
  const sessionUser = UserAuth()
  const navigate = useNavigate()
  const [loadingState, setLoadingState] = useState(true)

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (sessionUser) {
      setLoadingState(true)
      pathname === '/login' && navigate('/nuevos', { replace: true })
      pathname === '/consultas' && navigate(null)
    } else {
      setLoadingState(false)
      navigate('/login', { replace: true })
    }
  }, [sessionUser])


  return (
    <>
      {
        <>
          {sessionUser && <Header />}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute redirectTo="/login" />}>
              <Route path='/' element={<Navigate to={'/nuevos'} replace />} />
              <Route path='*' element={<Navigate to={'../nuevos'} replace />} />
              <Route path='/nuevos' element={<Nuevos />} />
              <Route path='/consultas' element={<Consultas />} />
            </Route>
          </Routes>
        </>
      }
    </>

  )
}

export default App
