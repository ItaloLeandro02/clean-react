import { faker } from '@faker-js/faker'
import { InvalidFieldValidation } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators'
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
    const field = faker.database.column()
    const error = sut.validate({ [field]: faker.word.adjective() })
    expect(error).toEqual(new InvalidFieldValidation(sut.field))
  })

  test('Should return falsy if email is valid', () => {
    const { sut } = makeSut()
    const field = faker.database.column()
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const { sut } = makeSut()
    const field = faker.database.column()
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
