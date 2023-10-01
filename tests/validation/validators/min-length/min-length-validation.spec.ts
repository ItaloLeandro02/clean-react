import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.slug(4))
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })
})
