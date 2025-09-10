import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.css'
import Login from './componentes/login'

function App() {
  const [loadingState, setLoadingState] = useState(false)

  return (
    <>
      {loadingState ? (
        <>
          {/* <Header />
            <Main /> */}
          <h1>Home</h1>
        </>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      )}
    </>
  )
}

export default App
