import { faker } from '@faker-js/faker'
import { RegexEmailValidator } from '@/infra/email-validator/regex-email-validator/regex-email-validator'

const makeSut = (): RegexEmailValidator => new RegexEmailValidator()

describe('RegexEmailValidator', () => {
  test('Should return falsy if email is invalid', () => {
    const sut = makeSut()
    const result = sut.validate(faker.word.adjective())
    expect(result).toBeFalsy()
  })

  test('Should return truthy if email is valid', () => {
    const sut = makeSut()
    const result = sut.validate(faker.internet.email())
    expect(result).toBeTruthy()
  })
})
