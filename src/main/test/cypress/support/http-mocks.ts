import { faker } from '@faker-js/faker'
import { type Method, type RouteMatcher } from 'cypress/types/net-stubbing'

export const mockUnexpectedError = (method: Method, url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.arrayElement([400, 404, 500]),
    body: {
      error: faker.lorem.words()
    },
    delay: 500
  }).as('request')
}

export const mockInvalidCredentialsError = (method: Method, url: RouteMatcher): void => {
  cy.intercept(method, url, {
    statusCode: 401,
    body: {
      error: faker.lorem.words()
    },
    delay: 500
  }).as('request')
}

export const mockOk = (method: Method, url: RouteMatcher, bodyResponse: object): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: bodyResponse,
    delay: 500
  }).as('request')
}
