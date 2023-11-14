import React from 'react'
import { type RenderResult, render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { type RouteObject, createMemoryRouter, RouterProvider } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'
import { Login } from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type Router = ReturnType<typeof createMemoryRouter>

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
  router: Router
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <h2>Initial page</h2>
    },
    {
      path: '/login',
      element:
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
          saveAccessToken={saveAccessTokenMock}
        />
    },
    {
      path: '/signup',
      element: <h2>Signup page</h2>
    }
  ]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
    initialIndex: 0
  })
  const sut = render(<RouterProvider router={router} />)

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
    router
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.change(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.change(passwordInput, { target: { value: password } })
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    disableFetchMocks()
  })

  test('Should start with initial state', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.word.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await Promise.all([
      simulateValidSubmit(sut),
      simulateValidSubmit(sut)
    ])
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.word.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, router, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(router.state.location.pathname).toBe('/')
    expect(router.state.historyAction).toBe('REPLACE')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should go to signup page', () => {
    enableFetchMocks()
    const { sut, router } = makeSut()
    expect(router.state.location.pathname).toBe('/login')
    fireEvent.click(sut.getByTestId('signup'))
    expect(router.state.location.pathname).toBe('/signup')
    expect(router.state.historyAction).toBe('PUSH')
  })
})
