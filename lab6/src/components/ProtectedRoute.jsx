import { Navigate, Outlet, useLocation } from 'react-router'
import { getUser } from '../auth.js'

export default function ProtectedRoute() {
  const location = useLocation()

  if (!getUser()) return <Navigate to="/login" replace state={{ from: location.pathname }} />

  return <Outlet />
}
