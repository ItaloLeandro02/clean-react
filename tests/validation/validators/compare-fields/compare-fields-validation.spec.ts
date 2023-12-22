import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldValue = faker.lorem.words(3)
    const fieldToCompare = faker.database.column()
    const fieldToCompareValue = faker.string.uuid()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: fieldValue,
      [fieldToCompare]: fieldToCompareValue
    })
    console.log({
      [field]: fieldValue,
      [fieldToCompare]: fieldToCompareValue
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
