import { faker } from '@faker-js/faker'
import * as Http from './http-mocks'

export const mockUnexpectedError = (): void => { Http.mockServerError('POST', '/api/login') }
export const mockInvalidCredentialsError = (): void => { Http.mockUnauthorizedError('POST', '/api/login') }
export const mockOk = (): void => { Http.mockOk('POST', '/api/login', { accessToken: faker.string.uuid(), name: faker.person.firstName() }) }
