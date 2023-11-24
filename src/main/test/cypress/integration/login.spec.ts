import { faker } from '@faker-js/faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')
    cy.getByTestId('submit')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap')
      .should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.lorem.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo email inválido!')
      .should('have.text', '🔴')
    cy.getByTestId('password').type(faker.lorem.word(4))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo password inválido!')
      .should('have.text', '🔴')
    cy.getByTestId('submit')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap')
      .should('not.have.descendants')
  })
})
