import * as Helper from '../utils/helper'
import * as Http from '../utils/http-mocks'

const path = 'api/surveys/**'
const mockUnexpectedError = (): void => { Http.mockServerError('GET', path) }

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again')
  })
})
