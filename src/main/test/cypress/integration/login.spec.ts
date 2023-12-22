import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Helper from '../support/helper'
import * as Http from '../support/login-mocks'

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
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong. Try again')
    Helper.testUrl('/login')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Invalid credentials')
    Helper.testUrl('/login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    Http.mockOk()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should prevent to call submit multiple times', () => {
    Http.mockOk()
    populateFields()
    cy.getByTestId('submit').dblclick()
    Helper.testHttpCallsCount(1)
  })

  it('Should not call submit if form ins invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').type(`${faker.internet.email()}{enter}`)
    Helper.testHttpCallsCount(0)
  })
})
