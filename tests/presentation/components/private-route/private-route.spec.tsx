import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { disableFetchMocks } from 'jest-fetch-mock'
import { PrivateRoute } from '@/presentation/components'

describe('PrivateRoute', () => {
  beforeEach(() => {
    disableFetchMocks()
  })
  afterEach(cleanup)

  test('Should redirect to /login if token is empty', () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <PrivateRoute />
      },
      {
        path: '/login',
        element: <h2>Login</h2>
      }
    ]
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0
    })
    render(
      <RouterProvider router={router} />
    )
    expect(router.state.location.pathname).toBe('/login')
  })
})
