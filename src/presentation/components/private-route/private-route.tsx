import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

const PrivateRouter: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
