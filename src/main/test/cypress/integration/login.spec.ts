import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('have.text', '🟢')
    cy.getByTestId('password').type(faker.lorem.word(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('have.text', '🟢')
    cy.getByTestId('submit')
      .should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap')
      .should('not.have.descendants')
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('/api/login', {
      statusCode: 400,
      body: {
        message: faker.lorem.words()
      },
      delay: 500
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.lorem.word(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Something went wrong. Try again')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('/api/login', {
      statusCode: 401,
      body: {
        message: faker.lorem.words()
      },
      delay: 500
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.lorem.word(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Invalid credentials')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      },
      delay: 500
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.lorem.word(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
