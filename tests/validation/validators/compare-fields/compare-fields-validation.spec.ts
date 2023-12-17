import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.lorem.words(3),
      [fieldToCompare]: faker.string.uuid()
    })
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const value = faker.lorem.word()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
