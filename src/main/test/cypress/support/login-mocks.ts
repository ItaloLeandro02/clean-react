import { faker } from '@faker-js/faker'
import * as Mock from './http-mocks'

export const mockUnexpectedError = (): void => { Mock.mockUnexpectedError('POST', '/api/login') }
export const mockInvalidCredentialsError = (): void => { Mock.mockInvalidCredentialsError('POST', '/api/login') }
export const mockOk = (): void => { Mock.mockOk('POST', '/api/login', { accessToken: faker.string.uuid(), name: faker.person.firstName() }) }
export const mockInvalidData = (): void => { Mock.mockOk('POST', '/api/login', { invalid: faker.string.uuid() }) }
