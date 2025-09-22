import { Routes, Route, Navigate } from 'react-router-dom'

import Styles from './main.module.css'
import Nuevos from '../nuevos'
import Consultas from '../consultas'
import ProtectedRoute from '../../hooks/protectedRoute'

function Main(session) {

  return (
    <div className={Styles.container}>
      <Routes>
        <Route element={<ProtectedRoute session={session} redirectTo="/login" />}>
          <Route path='/' element={<Navigate to={'../nuevos'} />} />
          <Route path='*' element={<Navigate to={'../nuevos'} />} />
          <Route path='/nuevos' element={<Nuevos />} />
          <Route path='/consultas' element={<Consultas />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Main
