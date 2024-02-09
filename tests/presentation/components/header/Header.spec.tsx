import React from 'react'
import { RouteObject, createMemoryRouter } from 'react-router-dom'
import { fireEvent, screen } from '@testing-library/react'
import { disableFetchMocks } from 'jest-fetch-mock'
import { Header } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { RouterType, renderWithMemoryRouter } from '@/tests/presentation/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'

type Router = ReturnType<typeof createMemoryRouter>
type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
  router: Router
}

const makeRouter = (): RouterType => {
  const routes: RouteObject[] = [{
    path: '/',
    element: <Header />
  }, {
    path: '/login',
    element: <h2>Login</h2>
  }]
  return createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0
  })
}
const makeSut = (account = mockAccountModel()): SutTypes => {
  const router = makeRouter()
  const { setCurrentAccountMock } = renderWithMemoryRouter({ router, account })
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
