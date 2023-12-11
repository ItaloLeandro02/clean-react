import React from 'react'
import { type RouteObject, createMemoryRouter, RouterProvider } from 'react-router-dom'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock'
import { SignUp } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'
import { type AccountModel } from '@/domain/models'

type Router = ReturnType<typeof createMemoryRouter>

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
  router: Router
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <h2>Initial page</h2>
    },
    {
      path: '/signup',
      element:
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
    },
    {
      path: '/login',
      element: <h2>Login page</h2>
    }
  ]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/signup'],
    initialIndex: 0
  })
  const sut = render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock
      }}
    >
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )

  return {
    sut,
    addAccountSpy,
    setCurrentAccountMock,
    router
  }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.person.firstName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  beforeEach(() => {
    disableFetchMocks()
  })
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.person.firstName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await Promise.all([
      simulateValidSubmit(sut),
      simulateValidSubmit(sut)
    ])
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.word.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, router, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(router.state.location.pathname).toBe('/')
    expect(router.state.historyAction).toBe('REPLACE')
  })

  test('Should go to login page', () => {
    enableFetchMocks()
    const { sut, router } = makeSut()
    expect(router.state.location.pathname).toBe('/signup')
    fireEvent.click(sut.getByTestId('login-link'))
    expect(router.state.location.pathname).toBe('/login')
    expect(router.state.historyAction).toBe('REPLACE')
  })
})
