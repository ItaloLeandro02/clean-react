import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/validators'
import { RequiredFieldValidationError } from '@/validation/errors'

const makeSut = (fieldName: string): RequiredFieldValidation => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldValidationError())
  })

  test('Should return false if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toBeFalsy()
  })
})
