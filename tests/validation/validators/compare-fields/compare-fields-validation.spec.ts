import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.lorem.word())
    const error = sut.validate(faker.lorem.word())
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })

  test('Should return falsy if compare is valid', () => {
    const valueToCompare = faker.lorem.word()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
