import { faker } from '@faker-js/faker'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder as sut
} from '@/validation/validators'
import { EmailValidatorSpy } from '@/validation/test'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName)
    ])
  })

  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const emailValidatorSpy = new EmailValidatorSpy()
    const validations = sut.field(fieldName).email(emailValidatorSpy).build()
    expect(validations).toEqual([
      new EmailValidation(fieldName, emailValidatorSpy)
    ])
  })

  test('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const length = faker.number.int()
    const validations = sut.field(fieldName).min(length).build()
    expect(validations).toEqual([
      new MinLengthValidation(fieldName, length)
    ])
  })

  test('Should return a list of validations', () => {
    const fieldName = faker.database.column()
    const emailValidatorSpy = new EmailValidatorSpy()
    const length = faker.number.int()
    const validations = sut.field(fieldName).required().email(emailValidatorSpy).min(length).build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName, emailValidatorSpy),
      new MinLengthValidation(fieldName, length)
    ])
  })
})
