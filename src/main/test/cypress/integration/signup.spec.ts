import { faker } from '@faker-js/faker'
import * as FormHelper from '../utils/form-helper'
import * as Helper from '../utils/helper'
import * as Http from '../utils/http-mocks'

const path = '/api/signup'
const mockUnexpectedError = (): void => { Http.mockServerError('POST', path) }
const mockEmailInUseError = (): void => { Http.mockForbiddenError('POST', path) }
const mockSuccess = (): void => {
  cy.fixture('account').then((account) => {
    Http.mockOk('POST', path, account, 'signUpRequest')
  })
}
const populateFields = (): void => {
  cy.getByTestId('name').type(faker.person.fullName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.string.alphanumeric(7)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
}
const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('login-link').click()
    cy.getByTestId('signup-link').click()
    FormHelper.testInputStatus('email', 'Campo obrigatório')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.lorem.word(4))
    FormHelper.testInputStatus('name', 'Campo name inválido!')
    cy.getByTestId('email').type(faker.lorem.word())
    FormHelper.testInputStatus('email', 'Campo email inválido!')
    cy.getByTestId('password').type(faker.lorem.word(4))
    FormHelper.testInputStatus('password', 'Campo password inválido!')
    cy.getByTestId('passwordConfirmation').type(faker.lorem.word(3))
    FormHelper.testInputStatus('password', 'Campo password inválido!')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFields()
    FormHelper.testInputStatus('name')
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('password')
    FormHelper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present UnexpectedError on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something went wrong. Try again')
    Helper.testUrl('/signup')
  })

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('The email is already in use')
    Helper.testUrl('/signup')
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
    cy.wait('@signUpRequest')
    cy.get('@signUpRequest.all').should('have.length', 1)
  })

  it('Should not call submit if form ins invalid', () => {
    mockSuccess()
    cy.getByTestId('email').type(`${faker.internet.email()}{enter}`)
    cy.get('@signUpRequest.all').should('have.length', 0)
  })
})
