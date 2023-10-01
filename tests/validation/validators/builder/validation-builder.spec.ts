import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { ValidationBuilder as sut } from '@/validation/validators/builder/validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName)
    ])
  })
})
