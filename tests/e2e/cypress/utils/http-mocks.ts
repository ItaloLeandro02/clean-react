import { faker } from '@faker-js/faker'
import { Method, RouteMatcher } from 'cypress/types/net-stubbing'

export const mockServerError = (method: Method, url: RouteMatcher, alias: string = 'request'): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.arrayElement([400, 404, 500]),
    body: {
      error: faker.lorem.words()
    },
    delay: 500
  }).as(alias)
}

export const mockUnauthorizedError = (method: Method, url: RouteMatcher, alias: string = 'request'): void => {
  cy.intercept(method, url, {
    statusCode: 401,
    body: {
      error: faker.lorem.words()
    },
    delay: 500
  }).as(alias)
}

export const mockForbiddenError = (method: Method, url: RouteMatcher, alias: string = 'request'): void => {
  cy.intercept(method, url, {
    statusCode: 403,
    body: {
      error: faker.lorem.words()
    },
    delay: 500
  }).as(alias)
}

export const mockOk = (method: Method, url: RouteMatcher, bodyResponse: object, alias: string = 'request'): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: bodyResponse,
    delay: 500
  }).as(alias)
}
