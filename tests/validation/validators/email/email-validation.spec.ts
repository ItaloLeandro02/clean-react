import { faker } from '@faker-js/faker'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldValidation } from '@/validation/errors'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.adjective())
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })
})
