import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter: React.FC = () => {
  return <Navigate to="/login" />
}

export default PrivateRouter
