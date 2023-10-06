import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login'

const router = createBrowserRouter([
  {
    path: '/login',
    Component: makeLogin
  }
])

const Router: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default Router
