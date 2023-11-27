import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap')
      .should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.lorem.word())
    cy.getByTestId('email').should('have.attr', 'title', 'Campo email inválido!')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').type(faker.lorem.word(4))
    cy.getByTestId('password').should('have.attr', 'title', 'Campo password inválido!')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('submit')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap')
      .should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').type(faker.lorem.word(5))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
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

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('/api/login', {
      statusCode: 200,
      body: {
        invalidProperty: faker.string.uuid()
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

  it('Should prevent to call submit multiple times', () => {
    cy.intercept('/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    })
      .as('request')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.lorem.word(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should no call submit if form ins invalid', () => {
    cy.intercept('/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    }).as('request')
    cy.getByTestId('email').type(`${faker.internet.email()}{enter}`)
    cy.get('@request.all').should('have.length', 0)
  })
})
