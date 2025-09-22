import { Routes, Route, Navigate } from 'react-router-dom'

import Styles from './main.module.css'
import Nuevos from '../nuevos'
import Consultas from '../consultas'
import ProtectedRoute from '../../hooks/protectedRoute'

function Main({ children }) {

  return (
    <div className={Styles.container}>
      {children}
      {/* <Routes>
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path='/' element={<Navigate to={'/nuevos'} replace />} />
          <Route path='*' element={<Navigate to={'../nuevos'} replace />} />
          <Route path='/nuevos' element={<Nuevos />} />
          <Route path='/consultas' element={<Consultas />} />
        </Route>
      </Routes> */}
    </div>
  )
}

export default Main
