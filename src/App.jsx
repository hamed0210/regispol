import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './App.css'
import Login from './componentes/login'
import Header from './componentes/header'
import Main from './componentes/main'
import { UserAuth } from './context/AuthContext'

function App() {
  const sessionUser = UserAuth()
  const navigate = useNavigate()
  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {
    if (sessionUser) {
      setLoadingState(true)
      navigate('/')
    } else {
      setLoadingState(false)
      navigate('/login')
    }
  }, [sessionUser])


  return (
    <>
      {
        loadingState
          ? <>
            <Header />
            <Main />
          </>
          : <Routes><Route path='/login' element={<Login />} /></Routes>
      }
    </>

  )
}

export default App
