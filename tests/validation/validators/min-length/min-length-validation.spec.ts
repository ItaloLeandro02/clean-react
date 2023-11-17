import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'

const makeSut = (fieldName: string): MinLengthValidation => new MinLengthValidation(fieldName, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.lorem.word(4) })
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })

  test('Should return falsy if value is valid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.lorem.word(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.lorem.word(5) })
    expect(error).toBeFalsy()
  })
})
