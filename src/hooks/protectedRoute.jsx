import { Navigate, Outlet } from "react-router-dom"

export const protectedRoute = ({ session, redirectTo, children }) => {
    if (session === null) return <Navigate replace to={redirectTo} />
    return children ? children : <Outlet />
}

export default protectedRoute