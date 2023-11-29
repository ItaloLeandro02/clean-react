import * as Mock from './http-mocks'

export const mockUnexpectedError = (): void => { Mock.mockUnexpectedError('POST', '/api/signup') }
