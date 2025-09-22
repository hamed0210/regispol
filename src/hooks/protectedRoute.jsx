import { Navigate, Outlet } from "react-router-dom"
import { UserAuth } from '../context/AuthContext'
import Main from '../componentes/main'

export const protectedRoute = ({ redirectTo, children }) => {
    const session = UserAuth()
    if (session === null) return <Navigate replace to={redirectTo} />
    return <Main>{children ? children : <Outlet />}</Main>
}

export default protectedRoute