import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation'
import { RequiredFieldValidationError } from '@/validation/errors'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldValidationError())
  })
})
