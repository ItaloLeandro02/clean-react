import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { disableFetchMocks } from 'jest-fetch-mock'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type Router = ReturnType<typeof createMemoryRouter>

type SutTypes = {
  router: Router
}

const makeSut = (account = mockAccountModel()): SutTypes => {
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
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )

  return { router }
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    disableFetchMocks()
  })
  afterEach(cleanup)

  test('Should redirect to /login if token is empty', () => {
    const { router } = makeSut(null)
    expect(router.state.location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    const { router } = makeSut()
    expect(router.state.location.pathname).toBe('/')
  })
})
