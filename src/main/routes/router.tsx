import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login'
import { makeSignUp } from '@/main/factories/pages/signup'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import { PrivateRoute } from '@/presentation/components'

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
    Component: PrivateRoute,
    children: [
      {
        path: 'survey-list',
        Component: SurveyList
      }
    ]
  }
])

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ApiContext.Provider>
  )
}

export default Router
