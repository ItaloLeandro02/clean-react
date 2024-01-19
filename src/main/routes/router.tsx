import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { ApiContext } from '@/presentation/contexts'
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
        path: '',
        Component: makeSurveyList
      },
      {
        path: 'surveys/:id',
        Component: makeSurveyResult
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
