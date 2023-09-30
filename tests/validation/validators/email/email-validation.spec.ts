import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { EmailValidatorSpy } from '@/validation/test'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(faker.database.column(), emailValidatorSpy)

  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const error = sut.validate(faker.word.adjective())
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })

  test('Should return falsy if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})