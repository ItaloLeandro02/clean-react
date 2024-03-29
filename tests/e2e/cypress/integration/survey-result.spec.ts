import * as Helper from '../utils/helper'
import * as Http from '../utils/http-mocks'

const path = 'api/surveys/**'
const mockLoadSuccess = (): void => {
  cy.fixture('load-survey-result').then((result) => {
    Http.mockOk('GET', path, result)
  })
}

describe('SurveyResult', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => { Http.mockServerError('GET', path) }
    const mockAccessDeniedError = (): void => { Http.mockForbiddenError('GET', path) }

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

    it('Should reload on button click', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again')
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helper.testUrl('/login')
    })

    it('Should present survey result', () => {
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question 1')
      cy.getByTestId('day').should('have.text', '02')
      cy.getByTestId('month').should('have.text', 'nov')
      cy.getByTestId('year').should('have.text', '2020')
      cy.get('li:nth-child(1)').then((li) => {
        assert.equal(li.find('[data-testid=image]').attr('src'), 'any_image')
        assert.equal(li.find('[data-testid=answer]').text(), 'any_answer')
        assert.equal(li.find('[data-testid=percent]').text(), '70%')
      })
      cy.get('li:nth-child(2)').then((li) => {
        assert.notExists(li.find('[data-testid=image]'))
        assert.equal(li.find('[data-testid=answer]').text(), 'any_answer_2')
        assert.equal(li.find('[data-testid=percent]').text(), '30%')
      })
    })

    it('Should go to SurveyList on back button click', () => {
      cy.visit('')
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })

  describe('save', () => {
    const mockUnexpectedError = (): void => { Http.mockServerError('PUT', path) }
    const mockAccessDeniedError = (): void => { Http.mockForbiddenError('PUT', path) }
    const mockSaveSuccess = (): void => {
      cy.fixture('save-survey-result').then((result) => {
        Http.mockOk('PUT', path, result)
      })
    }

    beforeEach(() => {
      cy.fixture('account').then((account) => {
        Helper.setLocalStorageItem('account', account)
      })
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      Helper.testUrl('/login')
    })

    it('Should present survey result', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'Question 2')
      cy.getByTestId('day').should('have.text', '29')
      cy.getByTestId('month').should('have.text', 'dez')
      cy.getByTestId('year').should('have.text', '2022')
      cy.get('li:nth-child(1)').then((li) => {
        assert.notExists(li.find('[data-testid=image]'))
        assert.equal(li.find('[data-testid=answer]').text(), 'other_answer')
        assert.equal(li.find('[data-testid=percent]').text(), '33%')
      })
      cy.get('li:nth-child(2)').then((li) => {
        assert.equal(li.find('[data-testid=image]').attr('src'), 'other_image')
        assert.equal(li.find('[data-testid=answer]').text(), 'other_answer_2')
        assert.equal(li.find('[data-testid=percent]').text(), '67%')
      })
    })
  })
})
