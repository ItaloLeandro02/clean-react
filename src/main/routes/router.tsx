import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login'
import { makeSignUp } from '@/main/factories/pages/signup'
import { SurveyList } from '@/presentation/pages'

const router = createBrowserRouter([
  {
    path: '/login',
    Component: makeLogin
  },
  {
    path: '/signup',
    Component: makeSignUp
  },
  {
    path: '/',
    Component: SurveyList
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
