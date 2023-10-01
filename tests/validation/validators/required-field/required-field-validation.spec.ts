import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/validators'
import { RequiredFieldValidationError } from '@/validation/errors'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldValidationError())
  })

  test('Should return false if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.noun())
    expect(error).toBeFalsy()
  })
})
