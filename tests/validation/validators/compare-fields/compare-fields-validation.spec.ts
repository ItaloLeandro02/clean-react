import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate(faker.database.column())
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })
})
