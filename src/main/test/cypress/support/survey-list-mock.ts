import * as Http from './http-mocks'

export const mockUnexpectedError = (): void => { Http.mockServerError('GET', 'api/surveys') }
export const mockAccessDeniedError = (): void => { Http.mockForbiddenError('GET', 'api/surveys') }
