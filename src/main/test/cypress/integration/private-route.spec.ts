import * as Helper from '../utils/helper'

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
