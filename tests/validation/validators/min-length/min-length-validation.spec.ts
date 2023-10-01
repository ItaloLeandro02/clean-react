import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word(4))
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word(5))
    expect(error).toBeFalsy()
  })
})
