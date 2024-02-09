import { faker } from '@faker-js/faker'
import * as FormHelper from '../utils/form-helper'
import * as Helper from '../utils/helper'
import * as Http from '../utils/http-mocks'

const path = '/api/login'
const mockUnexpectedError = (): void => { Http.mockServerError('POST', path) }
const mockInvalidCredentialsError = (): void => { Http.mockUnauthorizedError('POST', path) }
const mockSuccess = (): void => {
  cy.fixture('account').then((account) => {
    Http.mockOk('POST', path, account, 'loginRequest')
    cy.fixture('survey-list').then((surveys) => {
      Http.mockOk('GET', 'api/surveys', surveys)
    })
  })
}
const populateFields = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.lorem.word(5))
}
const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('signup-link').click()
    cy.getByTestId('login-link').click()
    FormHelper.testInputStatus('email', 'Campo obrigatório')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.lorem.word())
    FormHelper.testInputStatus('email', 'Campo email inválido!')
    cy.getByTestId('password').type(faker.lorem.word(4))
    FormHelper.testInputStatus('password', 'Campo password inválido!')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFields()
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present UnexpectedError on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong. Try again')
    Helper.testUrl('/login')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Invalid credentials')
    Helper.testUrl('/login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should prevent to call submit multiple times', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@loginRequest')
    cy.get('@loginRequest.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email').type(`${faker.internet.email()}{enter}`)
    cy.get('@loginRequest.all').should('have.length', 0)
  })
})
