import React from 'react'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { disableFetchMocks } from 'jest-fetch-mock'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type Router = ReturnType<typeof createMemoryRouter>

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
  router: Router
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [{
    path: '/',
    element: <Header />
  }, {
    path: '/login',
    element: <h2>Login</h2>
  }]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  })
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account
      }}
    >
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )

  return {
    setCurrentAccountMock,
    router
  }
}

describe('Header Component', () => {
  beforeEach(() => {
    disableFetchMocks()
  })

  test('Should call setCurrentAccount with undefined', () => {
    const { router, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(router.state.location.pathname).toBe('/login')
    expect(router.state.historyAction).toBe('REPLACE')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
