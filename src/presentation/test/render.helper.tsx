import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export type RouterType = ReturnType<typeof createMemoryRouter>

type Params = {
  router: RouterType
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithMemoryRouter = ({ router, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }
  render(
    <RecoilRoot initializeState={({ set }) => { set(currentAccountState, mockedState) }}>
      <RouterProvider router={router} />
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}
