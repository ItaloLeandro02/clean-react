import * as Mock from './http-mocks'

export const mockUnexpectedError = (): void => { Mock.mockUnexpectedError('POST', '/api/signup') }
export const mockEmailInUseError = (): void => { Mock.mockEmailInUseError('POST', '/api/signup') }
