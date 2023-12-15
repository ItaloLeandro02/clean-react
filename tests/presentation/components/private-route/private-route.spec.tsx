import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { disableFetchMocks } from 'jest-fetch-mock'
import { PrivateRoute } from '@/presentation/components'

type Router = ReturnType<typeof createMemoryRouter>

type SutTypes = {
  router: Router
}

const makeSut = (): SutTypes => {
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

  return { router }
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    disableFetchMocks()
  })
  afterEach(cleanup)

  test('Should redirect to /login if token is empty', () => {
    const { router } = makeSut()
    expect(router.state.location.pathname).toBe('/login')
  })
})
