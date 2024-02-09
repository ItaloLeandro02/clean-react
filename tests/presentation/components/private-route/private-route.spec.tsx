import React from 'react'
import { cleanup } from '@testing-library/react'
import { RouteObject, createMemoryRouter } from 'react-router-dom'
import { disableFetchMocks } from 'jest-fetch-mock'
import { PrivateRoute } from '@/presentation/components'
import { RouterType, renderWithMemoryRouter } from '@/tests/presentation/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'

type SutTypes = {
  router: RouterType
}

const makeRouter = (): RouterType => {
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
  return createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  })
}
const makeSut = (account = mockAccountModel()): SutTypes => {
  const router = makeRouter()
  renderWithMemoryRouter({ router, account })
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
