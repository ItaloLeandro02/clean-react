import { faker } from '@faker-js/faker'
import * as Mock from './http-mocks'

export const mockUnexpectedError = (): void => { Mock.mockUnexpectedError('POST', '/api/signup') }
export const mockEmailInUseError = (): void => { Mock.mockEmailInUseError('POST', '/api/signup') }
export const mockOk = (): void => { Mock.mockOk('POST', '/api/signup', { accessToken: faker.string.uuid(), name: faker.person.firstName() }) }
export const mockInvalidData = (): void => { Mock.mockOk('POST', '/api/signup', { invalid: faker.string.uuid() }) }
