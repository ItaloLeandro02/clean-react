import * as Helper from '../utils/helper'
import * as Http from '../utils/http-mocks'

const path = 'api/surveys'
const mockUnexpectedError = (): void => { Http.mockServerError('GET', path) }
const mockAccessDeniedError = (): void => { Http.mockForbiddenError('GET', path) }
const mockSuccess = (): void => {
  cy.fixture('survey-list').then((surveys) => {
    Http.mockOk('GET', path, surveys)
  })
}

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })

  it('Should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid=day]').text(), '02')
      assert.equal(li.find('[data-testid=month]').text(), 'nov')
      assert.equal(li.find('[data-testid=year]').text(), '2020')
      assert.equal(li.find('[data-testid=question]').text(), 'Question 1')
      cy.fixture('icons').then((icons) => {
        assert.equal(li.find('[data-testid=icon]').attr('src'), icons.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid=day]').text(), '16')
      assert.equal(li.find('[data-testid=month]').text(), 'mai')
      assert.equal(li.find('[data-testid=year]').text(), '2022')
      assert.equal(li.find('[data-testid=question]').text(), 'Question 2')
      cy.fixture('icons').then((icons) => {
        assert.equal(li.find('[data-testid=icon]').attr('src'), icons.thumbDown)
      })
    })
  })
})
