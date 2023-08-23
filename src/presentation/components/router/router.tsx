import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
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
