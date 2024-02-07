import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { currentAccountState, PrivateRoute } from '@/presentation/components'

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
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => { set(currentAccountState, state) }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </RecoilRoot>
  )
}

export default Router
