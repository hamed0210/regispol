import { Routes, Route, Navigate } from 'react-router-dom'

import Styles from './main.module.css'
import Nuevos from '../nuevos'

function App() {

  return (
    <div className={Styles.container}>
      <Routes>
        <Route path='/' element={<Navigate to={'../nuevos'} />} />
        <Route path='/nuevos' element={<Nuevos />} />
      </Routes>
    </div>
  )
}

export default App
