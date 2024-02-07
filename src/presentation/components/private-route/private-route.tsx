import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/presentation/components'

const PrivateRouter: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()?.accessToken ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
