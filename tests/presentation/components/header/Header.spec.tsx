import React from 'react'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { disableFetchMocks } from 'jest-fetch-mock'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

describe('Header Component', () => {
  beforeEach(() => {
    disableFetchMocks()
  })

  test('Should call setCurrentAccount with undefined', () => {
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
          setCurrentAccount: setCurrentAccountMock
        }}
      >
        <RouterProvider router={router} />
      </ApiContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(router.state.location.pathname).toBe('/login')
    expect(router.state.historyAction).toBe('REPLACE')
  })
})
