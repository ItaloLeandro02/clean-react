import React from 'react'
import { RouteObject, createMemoryRouter } from 'react-router-dom'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock'
import { SignUp } from '@/presentation/pages'
import { AddAccount } from '@/domain/usecases'
import { EmailInUseError } from '@/domain/errors'
import { Helper, RouterType, ValidationStub, renderWithMemoryRouter } from '@/tests/presentation/mocks'
import { AddAccountSpy } from '@/tests/domain/mocks'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
  router: RouterType
}
type SutParams = {
  validationError: string
}
type MakeRouterParams = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
}

const makeRouter = ({ validationStub, addAccountSpy }: MakeRouterParams): RouterType => {
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
  return createMemoryRouter(routes, {
    initialEntries: ['/signup'],
    initialIndex: 0
  })
}
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const router = makeRouter({ validationStub, addAccountSpy })
  const { setCurrentAccountMock } = renderWithMemoryRouter({ router })
  return {
    addAccountSpy,
    setCurrentAccountMock,
    router
  }
}

const simulateValidSubmit = async (name = faker.person.firstName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  beforeEach(() => {
    disableFetchMocks()
  })

  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.word.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.person.firstName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await Promise.all([
      simulateValidSubmit(),
      simulateValidSubmit()
    ])
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.word.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, router, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(router.state.location.pathname).toBe('/')
    expect(router.state.historyAction).toBe('REPLACE')
  })

  test('Should go to login page', () => {
    enableFetchMocks()
    const { router } = makeSut()
    expect(router.state.location.pathname).toBe('/signup')
    fireEvent.click(screen.getByTestId('login-link'))
    expect(router.state.location.pathname).toBe('/login')
    expect(router.state.historyAction).toBe('REPLACE')
  })
})
