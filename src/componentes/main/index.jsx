import { Routes, Route } from 'react-router-dom'

import Styles from './main.module.css'
import Home from '../home'

function App() {

  return (
    <div className={Styles.container}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
