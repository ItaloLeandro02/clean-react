import { faker } from '@faker-js/faker'
import { CompositeValidation } from '@/validation/validators/validation-composite/validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const sut = new CompositeValidation()
    const error = sut.validate(faker.database.column(), faker.word.adjective())
    expect(error).toBe('First error message')
  })

  test('Should return first error if more validations fails', () => {
    const sut = new CompositeValidation()
    const error = sut.validate(faker.database.column(), faker.word.adjective())
    expect(error).toBe('First error message')
  })
})
