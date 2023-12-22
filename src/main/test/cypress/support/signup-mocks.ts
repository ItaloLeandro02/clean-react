import { faker } from '@faker-js/faker'
import * as Http from './http-mocks'

export const mockUnexpectedError = (): void => { Http.mockServerError('POST', '/api/signup') }
export const mockEmailInUseError = (): void => { Http.mockForbiddenError('POST', '/api/signup') }
export const mockOk = (): void => { Http.mockOk('POST', '/api/signup', { accessToken: faker.string.uuid(), name: faker.person.firstName() }) }
